/**
 * Meal Tracker - Google Apps Script Two-Way Sync Receiver
 * --------------------------------------------------------
 * এই স্ক্রিপ্টটি আপনার Google Sheet-এ বসালে অ্যাপ থেকে যেকোনো মিল, বাজার,
 * মেস সামগ্রী, ডিপোজিট বা বিল আপডেট করলেই সরাসরি শিটেও আপডেট হয়ে যাবে
 * (শিটের কোনো ফর্মুলা নষ্ট না করেই)।
 *
 * সেটআপ করার নিয়ম:
 * 1. আপনার Google Sheet খুলুন -> Extensions -> Apps Script
 * 2. আগের সব কোড মুছে এই পুরো কোডটি পেস্ট করুন এবং Save (Ctrl+S) করুন
 * 3. উপরে Deploy -> New deployment ক্লিক করুন
 * 4. Select type: "Web app" সিলেক্ট করুন
 * 5. Execute as: "Me", Who has access: "Anyone" সিলেক্ট করে Deploy করুন
 * 6. অনুমোদন (Authorize) দিয়ে পাওয়া Web App URL-টি কপি করে অ্যাপের
 *    "⚙️ শিট সেটিংস" মডালে "Apps Script Webhook URL" ঘরে পেস্ট করে Save করুন।
 */

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, service: 'Meal Tracker Sheet Sync', status: 'ready' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(15000);

  try {
    var rawBody = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var payload = JSON.parse(rawBody);

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = findTargetSheet_(ss, payload.gid, payload.sheetName);
    if (!sheet) {
      return jsonResponse_({ ok: false, error: 'Target sheet tab not found' });
    }

    var lastRow = sheet.getLastRow();
    var lastCol = Math.max(sheet.getLastColumn(), 23);
    if (lastRow < 2) {
      return jsonResponse_({ ok: false, error: 'Sheet appears empty' });
    }

    var values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
    var headers = values[0] || [];

    // Locate key columns dynamically from Row 1
    var dateCol = findHeaderCol_(headers, /^date$/i, 0);
    var typeCol = findHeaderCol_(headers, /item\s*type/i, 1);
    var nameCol = findHeaderCol_(headers, /^name$/i, 2);
    var mealExpCol = findHeaderCol_(headers, /meal\s*expend/i, 3);
    var otherExpCol = findHeaderCol_(headers, /other\s*expend/i, 4);
    var otherPaidCol = findHeaderCol_(headers, /other\s*paid\s*by/i, 5);
    var depositCol = findHeaderCol_(headers, /^deposit$/i, 17);

    var depositNameCol = Math.max(0, depositCol - 2);
    for (var c = Math.max(0, depositCol - 3); c < depositCol; c++) {
      var v1 = String(values[1] ? values[1][c] : '').trim();
      if (v1 && !/^\d/.test(v1)) {
        depositNameCol = c;
        break;
      }
    }

    // Locate Meal Date column (e.g. "1October")
    var mealDateCol = 8;
    for (var mc = otherPaidCol + 1; mc < depositNameCol; mc++) {
      var cellVal = String(values[1] ? values[1][mc] : '').trim();
      if (/^\d+\s*[a-zA-Z]+/.test(cellVal)) {
        mealDateCol = mc;
        break;
      }
    }

    var members = Array.isArray(payload.members) ? payload.members : [];

    // 1. Update Deposits (Only raw deposit column, never Total/Cost/Remain formulas)
    if (payload.deposits && typeof payload.deposits === 'object') {
      for (var r = 1; r < values.length; r++) {
        var mNameRaw = String(values[r][depositNameCol] || '').trim();
        var mLower = mNameRaw.toLowerCase();
        if (mLower === 'meal rate' || mLower === 'cash' || mLower === 'others cost' || mLower === 'item' || mLower === 'total') {
          break;
        }
        if (!mNameRaw) continue;
        var matchedDepMember = matchMember_(mNameRaw, Object.keys(payload.deposits));
        if (matchedDepMember) {
          var depVal = Number(payload.deposits[matchedDepMember]) || 0;
          sheet.getRange(r + 1, depositCol + 1).setValue(depVal);
        }
      }
    }

    // 2. Update Daily Meals (Only raw member meal cells, skipping spacer & Total rows)
    if (payload.meals && typeof payload.meals === 'object') {
      var mealColMappings = [];
      for (var col = mealDateCol + 1; col < depositNameCol; col++) {
        var rawH = String(headers[col] || '').trim();
        if (!rawH) continue;
        var matchedM = matchMember_(rawH, members);
        if (!matchedM) {
          matchedM = rawH.replace(/meal\s*-\s*cost\s*\d*/ig, '').trim();
        }
        if (matchedM) {
          mealColMappings.push({ colIndex: col, memberName: matchedM });
        }
      }

      var mealDayIdx = 0;
      var maxDays = Number(payload.daysInMonth) || 31;
      for (var mr = 1; mr < values.length; mr++) {
        var mDateStr = String(values[mr][mealDateCol] || '').trim();
        if (!mDateStr) continue;
        mealDayIdx++;
        if (mealDayIdx > maxDays) break;

        var dayMeals = payload.meals[String(mealDayIdx)] || payload.meals[mealDayIdx] || {};
        for (var k = 0; k < mealColMappings.length; k++) {
          var map = mealColMappings[k];
          var mealNum = Number(dayMeals[map.memberName]) || 0;
          sheet.getRange(mr + 1, map.colIndex + 1).setValue(mealNum > 0 ? mealNum : '');
        }
      }
    }

    // 3. Update Bazar (Meals) & Shared Items (Others) in Cols B-F by Day 1..31
    if (Array.isArray(payload.bazar) || Array.isArray(payload.sharedItems)) {
      var foodByDay = {};
      var sharedByDay = {};

      (payload.bazar || []).forEach(function(item) {
        var day = extractDay_(item.date);
        if (day < 1 || day > 31) return;
        if (item.category === 'shared' || item.type === 'shared') {
          if (!sharedByDay[day]) sharedByDay[day] = [];
          sharedByDay[day].push({ name: item.item || '', amount: Number(item.amount) || 0, buyer: item.shopper || '' });
        } else {
          if (!foodByDay[day]) foodByDay[day] = [];
          foodByDay[day].push({ name: item.item || '', amount: Number(item.amount) || 0 });
        }
      });

      (payload.sharedItems || []).forEach(function(item) {
        var day = extractDay_(item.date);
        if (day < 1 || day > 31) return;
        if (!sharedByDay[day]) sharedByDay[day] = [];
        sharedByDay[day].push({ name: item.name || '', amount: Number(item.price) || 0, buyer: item.buyer || '' });
      });

      for (var er = 1; er < values.length; er++) {
        var labelCheck = String(values[er][nameCol] || '').toLowerCase();
        if (labelCheck.indexOf('total') !== -1) break;

        var rowDay = parseInt(values[er][dateCol], 10);
        if (!rowDay || rowDay < 1 || rowDay > 31) continue;

        var foods = foodByDay[rowDay] || [];
        var shareds = sharedByDay[rowDay] || [];

        if (foods.length > 0 && shareds.length === 0) {
          var fNames = foods.map(function(x) { return x.name; }).filter(Boolean).join(', ');
          var fTotal = foods.reduce(function(s, x) { return s + x.amount; }, 0);
          sheet.getRange(er + 1, typeCol + 1, 1, 5).setValues([['Meals', fNames, fTotal, '', '']]);
        } else if (shareds.length > 0 && foods.length === 0) {
          var sNames = shareds.map(function(x) { return x.name; }).filter(Boolean).join(', ');
          var sTotal = shareds.reduce(function(s, x) { return s + x.amount; }, 0);
          var sBuyer = shareds[shareds.length - 1].buyer || '';
          sheet.getRange(er + 1, typeCol + 1, 1, 5).setValues([['Others', sNames, '', sTotal, sBuyer]]);
        } else if (foods.length > 0 && shareds.length > 0) {
          var bothNames = foods.map(function(x) { return x.name; }).concat(shareds.map(function(x) { return x.name; })).filter(Boolean).join(', ');
          var bFoodTotal = foods.reduce(function(s, x) { return s + x.amount; }, 0);
          var bSharedTotal = shareds.reduce(function(s, x) { return s + x.amount; }, 0);
          var bBuyer = shareds[shareds.length - 1].buyer || '';
          sheet.getRange(er + 1, typeCol + 1, 1, 5).setValues([['Meals', bothNames, bFoodTotal, bSharedTotal, bBuyer]]);
        } else {
          sheet.getRange(er + 1, typeCol + 1, 1, 5).setValues([['', '', '', '', '']]);
        }
      }
    }

    // 4. Update Others Cost (Bill Amounts & Paid Statuses, never touching per-head or Total formulas)
    if (Array.isArray(payload.fixedBills) || (payload.memberBillStatus && typeof payload.memberBillStatus === 'object')) {
      var itemHeaderRow = -1;
      for (var br = 1; br < values.length; br++) {
        if (String(values[br][depositNameCol] || '').trim().toLowerCase() === 'item') {
          itemHeaderRow = br;
          break;
        }
      }

      if (itemHeaderRow !== -1) {
        var statusCols = [];
        for (var sc = depositNameCol + 3; sc < values[itemHeaderRow].length; sc++) {
          var sMember = String(values[itemHeaderRow][sc] || '').trim();
          if (sMember) {
            statusCols.push({ colIndex: sc, memberName: matchMember_(sMember, members) || sMember });
          }
        }

        for (var brow = itemHeaderRow + 1; brow < values.length; brow++) {
          var billTitle = String(values[brow][depositNameCol] || '').trim();
          if (!billTitle || billTitle.toLowerCase() === 'total') break;

          var matchedBill = findMatchingBill_(billTitle, payload.fixedBills || []);
          if (matchedBill) {
            sheet.getRange(brow + 1, depositNameCol + 2).setValue(Number(matchedBill.amount) || 0);
          }

          if (payload.memberBillStatus) {
            for (var si = 0; si < statusCols.length; si++) {
              var sCol = statusCols[si];
              var isExcluded = matchedBill && Array.isArray(matchedBill.excludedMembers) && matchedBill.excludedMembers.indexOf(sCol.memberName) !== -1;
              if (isExcluded) {
                sheet.getRange(brow + 1, sCol.colIndex + 1).setValue('');
              } else if (payload.memberBillStatus[sCol.memberName]) {
                var stVal = payload.memberBillStatus[sCol.memberName] === 'Paid' ? 'Paid' : '';
                sheet.getRange(brow + 1, sCol.colIndex + 1).setValue(stVal);
              }
            }
          }
        }
      }
    }

    return jsonResponse_({ ok: true, updatedAt: new Date().toISOString() });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function findTargetSheet_(ss, gid, sheetName) {
  var sheets = ss.getSheets();
  if (gid !== undefined && gid !== null && String(gid).trim() !== '') {
    var gidNum = Number(gid);
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getSheetId() === gidNum) return sheets[i];
    }
  }
  if (sheetName) {
    var byName = ss.getSheetByName(String(sheetName));
    if (byName) return byName;
  }
  return ss.getActiveSheet();
}

function findHeaderCol_(headers, regex, fallback) {
  for (var i = 0; i < headers.length; i++) {
    if (regex.test(String(headers[i] || '').trim())) return i;
  }
  return fallback;
}

function matchMember_(raw, list) {
  var clean = String(raw || '').trim().toLowerCase();
  if (!clean) return null;
  for (var i = 0; i < list.length; i++) {
    if (String(list[i]).toLowerCase() === clean) return list[i];
  }
  for (var j = 0; j < list.length; j++) {
    var mLow = String(list[j]).toLowerCase();
    if (clean.indexOf(mLow) !== -1 || mLow.indexOf(clean) !== -1) return list[j];
  }
  return null;
}

function findMatchingBill_(sheetTitle, fixedBills) {
  var sLow = String(sheetTitle || '').trim().toLowerCase();
  for (var i = 0; i < fixedBills.length; i++) {
    var bLow = String(fixedBills[i].title || '').trim().toLowerCase();
    if (bLow === sLow || bLow.indexOf(sLow) !== -1 || sLow.indexOf(bLow.split('(')[0].trim()) !== -1) {
      return fixedBills[i];
    }
  }
  return null;
}

function extractDay_(dateStr) {
  if (!dateStr) return 0;
  var s = String(dateStr).trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) {
    return parseInt(s.split('-')[2], 10) || 0;
  }
  var m = s.match(/\b([1-9]|[12]\d|3[01])\b/);
  return m ? parseInt(m[1], 10) : 0;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

