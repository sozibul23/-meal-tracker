/**
 * Mess Manager Application Logic
 * Minimalist Design + Admin Mode + User Management (Add / Delete)
 */

const INITIAL_DATA = {
  month: 'October 2026',
  members: ['Sadhin', 'Tanzid', 'Akhirul', 'Imam'],
  adminPin: '1234',
  deposits: {
    Sadhin: 1397,
    Tanzid: 1599,
    Akhirul: 1281,
    Imam: 0
  },
  bazar: [
    { id: 1, shopper: 'Tanzid', item: 'Murgi + vendi', amount: 290, date: '1 October' },
    { id: 2, shopper: 'Tanzid', item: 'Tel, alu, peyaj, morich, polithin', amount: 205, date: '2 October' },
    { id: 3, shopper: 'Sadhin', item: 'Dim', amount: 52, date: '3 October' },
    { id: 4, shopper: 'Tanzid', item: 'Chal 330, morich 10, vendi 20', amount: 360, date: '4 October' },
    { id: 5, shopper: 'Sadhin', item: 'Dim 50, alu, peyaj, ada, rosun 100', amount: 150, date: '5 October' },
    { id: 6, shopper: 'Tanzid', item: 'Murgi 330', amount: 330, date: '6 October' },
    { id: 7, shopper: 'Tanzid', item: 'Tel 204', amount: 204, date: '7 October' },
    { id: 8, shopper: 'Sadhin', item: 'Gorur mangso 400', amount: 400, date: '8 October' },
    { id: 9, shopper: 'Tanzid', item: 'Mosla 100', amount: 100, date: '9 October' },
    { id: 10, shopper: 'Akhirul', item: 'Mach 750', amount: 750, date: '10 October' },
    { id: 11, shopper: 'Sadhin', item: 'Sobji 10', amount: 10, date: '11 October' },
    { id: 12, shopper: 'Tanzid', item: 'Potol 20', amount: 20, date: '12 October' },
    { id: 13, shopper: 'Sadhin', item: 'Peyaj 50 + morich 10', amount: 60, date: '13 October' },
    { id: 14, shopper: 'Tanzid', item: 'Kumra 40', amount: 40, date: '14 October' },
    { id: 15, shopper: 'Sadhin', item: 'Murgi 350, sak 15', amount: 365, date: '15 October' },
    { id: 16, shopper: 'Akhirul', item: 'Chal 341, mosla 30, vim 20', amount: 391, date: '16 October' },
    { id: 17, shopper: 'Akhirul', item: 'Polar chal 80, mosla 60', amount: 140, date: '17 October' },
    { id: 18, shopper: 'Tanzid', item: 'Dim 50', amount: 50, date: '18 October' },
    { id: 19, shopper: 'Sadhin', item: 'Murgi 340, dheros 20', amount: 360, date: '18 October' }
  ],
  meals: {
    1: { Sadhin: 1, Tanzid: 1, Akhirul: 1, Imam: 0 },
    2: { Sadhin: 1, Tanzid: 1, Akhirul: 1, Imam: 0 },
    3: { Sadhin: 2, Tanzid: 1, Akhirul: 2, Imam: 0 },
    4: { Sadhin: 1, Tanzid: 1, Akhirul: 1, Imam: 0 },
    5: { Sadhin: 2, Tanzid: 2, Akhirul: 2, Imam: 0 },
    6: { Sadhin: 1, Tanzid: 1, Akhirul: 1, Imam: 0 },
    7: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    8: { Sadhin: 1, Tanzid: 1, Akhirul: 1, Imam: 0 },
    9: { Sadhin: 1, Tanzid: 2, Akhirul: 1, Imam: 0 },
    10: { Sadhin: 2, Tanzid: 3, Akhirul: 2, Imam: 0 },
    11: { Sadhin: 1, Tanzid: 1, Akhirul: 1, Imam: 0 },
    12: { Sadhin: 2, Tanzid: 1, Akhirul: 2, Imam: 0 },
    13: { Sadhin: 2, Tanzid: 1, Akhirul: 2, Imam: 0 },
    14: { Sadhin: 2, Tanzid: 1, Akhirul: 2, Imam: 0 },
    15: { Sadhin: 2, Tanzid: 1, Akhirul: 2, Imam: 0 },
    16: { Sadhin: 2, Tanzid: 2, Akhirul: 2, Imam: 0 },
    17: { Sadhin: 2, Tanzid: 1, Akhirul: 2, Imam: 0 },
    18: { Sadhin: 2, Tanzid: 1, Akhirul: 2, Imam: 0 },
    19: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    20: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    21: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    22: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    23: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    24: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    25: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    26: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    27: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    28: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    29: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    30: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 },
    31: { Sadhin: 0, Tanzid: 0, Akhirul: 0, Imam: 0 }
  },
  fixedBills: [
    { id: 1, title: 'House Rent (বাসা ভাড়া)', amount: 16000, splitCount: 4, status: 'Paid', note: '৪ জনের সমান ভাগ' },
    { id: 2, title: 'Wifi Bill (ইন্টারনেট)', amount: 690, splitCount: 4, status: 'Paid', note: '৪ জনের সমান ভাগ' },
    { id: 3, title: 'Bua Bill (খালা বিল)', amount: 700, splitCount: 3, status: 'Paid', note: '৩ জনের ভাগ (Sadhin, Tanzid, Akhirul)' }
  ],
  sharedItems: [
    { id: 1, name: 'Harpic + Handwash', price: 270, buyer: 'Sadhin' },
    { id: 2, name: 'Tul (টুল)', price: 350, buyer: 'Tanzid' }
  ]
};

const STORAGE_KEY = 'MESS_MINIMAL_DATA_V2';
const THEME_KEY = 'MESS_THEME';
const ADMIN_SESSION_KEY = 'MESS_ADMIN_LOGGED_IN';

// App State
let state = loadState();
let isAdmin = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.deposits) {
        parsed.deposits = { Sadhin: 1397, Tanzid: 1599, Akhirul: 1281, Imam: 0 };
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load local data', e);
  }
  return JSON.parse(JSON.stringify(INITIAL_DATA));
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    if (typeof pushStateToFirebase === 'function') {
      pushStateToFirebase(state);
    }
  } catch (e) {
    console.error('Failed to save state', e);
  }
  renderAll();
}

// Helpers
function formatBDT(amount, showPlus = false) {
  const num = Number(amount) || 0;
  const prefix = num > 0 && showPlus ? '+' : '';
  return `${prefix}৳${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Calculate Metrics (Fund-based calculation)
function calculateMetrics() {
  const totalBazar = state.bazar.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  if (!state.deposits) state.deposits = {};
  let totalDeposit = 0;
  state.members.forEach(m => {
    if (state.deposits[m] === undefined) state.deposits[m] = 0;
    totalDeposit += Number(state.deposits[m]) || 0;
  });

  // Remaining Cash in Mess Fund
  const remainingFund = totalDeposit - totalBazar;

  const memberMeals = {};
  state.members.forEach(m => memberMeals[m] = 0);
  let totalMeals = 0;

  for (let day = 1; day <= 31; day++) {
    const dayData = state.meals[day] || {};
    state.members.forEach(m => {
      const val = Number(dayData[m]) || 0;
      memberMeals[m] += val;
      totalMeals += val;
    });
  }

  const mealRate = totalMeals > 0 ? totalBazar / totalMeals : 0;

  const memberSummaries = state.members.map(name => {
    const deposit = Number(state.deposits[name]) || 0;
    const meals = memberMeals[name] || 0;
    const mealCost = meals * mealRate;
    const balance = deposit - mealCost;

    return {
      name,
      meals,
      deposit,
      mealCost,
      balance,
      status: balance > 0.01 ? 'positive' : balance < -0.01 ? 'negative' : 'neutral'
    };
  });

  const totalFixed = state.fixedBills.reduce((s, b) => s + (Number(b.amount) || 0), 0);
  const totalShared = state.sharedItems.reduce((s, b) => s + (Number(b.price) || 0), 0);
  const settlementTransfers = computeSettlement(memberSummaries);

  return {
    totalDeposit,
    totalBazar,
    remainingFund,
    totalMeals,
    mealRate,
    memberSummaries,
    totalFixed,
    totalShared,
    settlementTransfers
  };
}

// Settlement Transfers
function computeSettlement(summaries) {
  let debtors = [];
  let creditors = [];

  summaries.forEach(m => {
    const bal = Math.round(m.balance * 100) / 100;
    if (bal < -0.01) {
      debtors.push({ name: m.name, owes: Math.abs(bal) });
    } else if (bal > 0.01) {
      creditors.push({ name: m.name, gets: bal });
    }
  });

  debtors.sort((a, b) => b.owes - a.owes);
  creditors.sort((a, b) => b.gets - a.gets);

  const transfers = [];
  let i = 0, j = 0;

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const amount = Math.min(debtor.owes, creditor.gets);

    if (amount > 0.01) {
      transfers.push({
        from: debtor.name,
        to: creditor.name,
        amount: amount
      });
    }

    debtor.owes -= amount;
    creditor.gets -= amount;

    if (debtor.owes <= 0.01) i++;
    if (creditor.gets <= 0.01) j++;
  }

  return transfers;
}

// Render Top Stats
function renderKPIs(metrics) {
  document.getElementById('kpiTotalDeposit').textContent = formatBDT(metrics.totalDeposit);
  document.getElementById('kpiDepositDesc').textContent = `${state.members.length} জন সদস্যের জমা`;
  document.getElementById('kpiTotalBazar').textContent = formatBDT(metrics.totalBazar);
  document.getElementById('kpiBazarCount').textContent = `${state.bazar.length} টি বাজার এন্ট্রি`;
  
  const remEl = document.getElementById('kpiRemainingFund');
  remEl.textContent = formatBDT(metrics.remainingFund);
  remEl.style.color = metrics.remainingFund < 0 ? 'var(--danger)' : 'var(--text-main)';
  document.getElementById('kpiFundStatus').textContent = metrics.remainingFund >= 0 
    ? 'ক্যাশে জমা উদ্বৃত্ত আছে' 
    : 'ঘাটতি (ফান্ডে অতিরিক্ত টাকা লাগবে)';

  document.getElementById('kpiMealRate').textContent = `৳${metrics.mealRate.toFixed(2)}`;
  document.getElementById('kpiRateFormula').textContent = `মোট ব্যয় ÷ ${metrics.totalMeals} মিল`;
}

// Render Dashboard
function renderDashboard(metrics) {
  const container = document.getElementById('memberCardsGrid');
  container.innerHTML = '';

  metrics.memberSummaries.forEach(m => {
    const card = document.createElement('div');
    card.className = 'member-card';

    const statusBadge = m.balance > 0.01 
      ? `<span class="badge badge-green">পাবেন</span>` 
      : m.balance < -0.01 
        ? `<span class="badge badge-red">দিতে হবে</span>` 
        : `<span class="badge">ব্যালেন্স ০</span>`;

    card.innerHTML = `
      <div class="member-head">
        <div class="member-info">
          <div class="member-avatar">${m.name.charAt(0)}</div>
          <div>
            <div class="member-name">${m.name}</div>
            <div class="member-meals-sub">মোট মিল: <b>${m.meals}</b> টি</div>
          </div>
        </div>
        ${statusBadge}
      </div>

      <div class="member-balance-box">
        <span class="text-sm text-muted">${m.balance >= 0 ? 'পাওনা টাকা (ফান্ড ফেরত)' : 'বকেয়া টাকা (ফান্ডে জমা)'}</span>
        <span class="balance-num ${m.status}">${formatBDT(m.balance, true)}</span>
      </div>

      <div class="member-breakdown">
        <span>ফান্ডে জমা: <b class="mono">${formatBDT(m.deposit)}</b> ${isAdmin ? `<button class="btn btn-sm btn-ghost" style="padding:0 4px;" onclick="openQuickDeposit('${m}')" title="জমা এডিট করুন">✎</button>` : ''}</span>
        <span>খাবার খরচ: <b class="mono">${formatBDT(m.mealCost)}</b></span>
      </div>
    `;
    container.appendChild(card);
  });

  // Recent Bazar List
  const recentTable = document.getElementById('dashboardRecentBazar');
  const recentItems = state.bazar.slice(-5).reverse();
  recentTable.innerHTML = recentItems.map(b => `
    <tr>
      <td class="mono text-muted text-sm">${b.date || '#' + b.id}</td>
      <td><b>${b.shopper}</b></td>
      <td>${b.item}</td>
      <td class="text-right mono"><b>৳${b.amount}</b></td>
    </tr>
  `).join('');

  // Fund Contribution Progress
  const shopperList = document.getElementById('shopperProgressList');
  shopperList.innerHTML = '';
  document.getElementById('bazarTotalBadge').textContent = `মোট জমা ${formatBDT(metrics.totalDeposit)}`;

  state.members.forEach(member => {
    const deposited = Number(state.deposits[member]) || 0;
    const pct = metrics.totalDeposit > 0 ? (deposited / metrics.totalDeposit * 100).toFixed(1) : 0;
    shopperList.innerHTML += `
      <div>
        <div class="shopper-item-meta">
          <span><b>${member}</b>: ${formatBDT(deposited)}</span>
          <span class="mono text-muted text-sm">${pct}%</span>
        </div>
        <div class="track-bar">
          <div class="track-fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  });

  // Snippet
  const snippet = document.getElementById('dashboardSettlementSnippet');
  if (metrics.settlementTransfers.length > 0) {
    snippet.innerHTML = metrics.settlementTransfers.map(t => 
      `• <b style="color:var(--danger)">${t.from}</b> পরিশোধ করবেন <b style="color:var(--success)">${t.to}</b>-কে <b>${formatBDT(t.amount)}</b>`
    ).join('<br>');
  } else {
    snippet.innerHTML = '🎉 সকল মেম্বারের মিলের হিসাব সম্পূর্ণ পরিশোধিত!';
  }
}

// Render Meals Table (Dynamic Members)
function renderMealsTable() {
  const headRow = document.getElementById('mealsHeadRow');
  const tbody = document.getElementById('mealsBody');
  const tfoot = document.getElementById('mealsFoot');

  // Dynamic headers for members
  headRow.innerHTML = `
    <th style="width: 140px;">তারিখ</th>
    ${state.members.map(m => `<th>${m}</th>`).join('')}
    <th class="text-center" style="width: 110px;">দিনের মিল</th>
  `;

  const filterText = (document.getElementById('mealFilterInput').value || '').toLowerCase().trim();
  const totals = {};
  state.members.forEach(m => totals[m] = 0);
  let grandTotal = 0;

  tbody.innerHTML = '';

  for (let day = 1; day <= 31; day++) {
    const dayLabel = `${day} October`;
    if (filterText && !dayLabel.toLowerCase().includes(filterText)) continue;

    const dayMeals = state.meals[day] || {};
    let rowTotal = 0;

    const cellsHtml = state.members.map(m => {
      const val = Number(dayMeals[m]) || 0;
      totals[m] += val;
      rowTotal += val;

      if (isAdmin) {
        return `
          <td>
            <div class="meal-stepper">
              <button class="step-btn" onclick="updateMeal(${day}, '${m}', -1)">-</button>
              <span class="meal-count">${val}</span>
              <button class="step-btn" onclick="updateMeal(${day}, '${m}', 1)">+</button>
            </div>
          </td>
        `;
      } else {
        return `
          <td>
            <span class="mono" style="font-weight:600; padding: 0 8px;">${val}</span>
          </td>
        `;
      }
    }).join('');

    grandTotal += rowTotal;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><b>${dayLabel}</b></td>
      ${cellsHtml}
      <td class="text-center mono"><b>${rowTotal}</b></td>
    `;
    tbody.appendChild(tr);
  }

  tfoot.innerHTML = `
    <tr>
      <th>মোট মিল:</th>
      ${state.members.map(m => `<th class="mono">${totals[m] || 0}</th>`).join('')}
      <th class="text-center mono" style="font-weight: 800; color: var(--accent);">${grandTotal}</th>
    </tr>
  `;
}

window.updateMeal = function(day, member, delta) {
  if (!isAdmin) {
    showToast('মিল পরিবর্তন করতে এডমিন লগইন করুন');
    return;
  }
  if (!state.meals[day]) state.meals[day] = {};
  const current = Number(state.meals[day][member]) || 0;
  state.meals[day][member] = Math.max(0, current + delta);
  saveState();
};

// Render Bazar Table
function renderBazarTable() {
  const tbody = document.getElementById('bazarTableBody');
  const shopperSelect = document.getElementById('bazarShopperFilter');
  const search = (document.getElementById('bazarSearchInput').value || '').toLowerCase().trim();
  const selectedShopper = shopperSelect.value;

  // Update filter dropdown with active members
  const currentVal = shopperSelect.value;
  shopperSelect.innerHTML = `<option value="all">সকল বাজারকারী</option>` +
    state.members.map(m => `<option value="${m}">${m}</option>`).join('');
  shopperSelect.value = currentVal;

  let filtered = state.bazar.filter(b => {
    if (selectedShopper !== 'all' && b.shopper !== selectedShopper) return false;
    if (search && !b.item.toLowerCase().includes(search) && !b.shopper.toLowerCase().includes(search)) return false;
    return true;
  });

  const totalFiltered = filtered.reduce((s, b) => s + (Number(b.amount) || 0), 0);
  document.getElementById('bazarFilteredCount').innerHTML = `ফিল্টারকৃত: <b>${formatBDT(totalFiltered)}</b>`;
  document.getElementById('bazarFooterTotal').textContent = formatBDT(totalFiltered);

  tbody.innerHTML = filtered.map((b, idx) => `
    <tr>
      <td class="mono text-muted">${idx + 1}</td>
      <td><b>${b.shopper}</b></td>
      <td>${b.item} <span class="text-dim text-sm">(${b.date || 'October'})</span></td>
      <td class="text-right mono"><b>${formatBDT(b.amount)}</b></td>
      ${isAdmin ? `
        <td class="text-center">
          <button class="btn btn-sm btn-danger" onclick="deleteBazar(${b.id})" title="মুছুন">✕</button>
        </td>
      ` : ''}
    </tr>
  `).join('');
}

window.deleteBazar = function(id) {
  if (!isAdmin) return;
  if (confirm('আপনি কি এই বাজার এন্ট্রিটি মুছে ফেলতে চান?')) {
    state.bazar = state.bazar.filter(b => b.id !== id);
    saveState();
    showToast('বাজার এন্ট্রি ডিলিট করা হয়েছে');
  }
};

// Render Utilities
function renderUtilities(metrics) {
  const tbody = document.getElementById('fixedBillsBody');
  tbody.innerHTML = state.fixedBills.map(b => {
    const avg = b.amount / (b.splitCount || state.members.length);
    const statusClass = b.status === 'Paid' ? 'badge-green' : 'badge-red';
    const statusText = b.status === 'Paid' ? 'পরিশোধিত' : 'বকেয়া';

    return `
      <tr>
        <td>
          <b>${b.title}</b>
          ${b.note ? `<br><span class="text-muted text-sm">${b.note}</span>` : ''}
        </td>
        <td class="text-right mono">৳${Number(b.amount).toLocaleString()}</td>
        <td class="text-right mono">৳${avg.toFixed(2)}</td>
        <td>
          ${isAdmin ? `
            <button class="badge ${statusClass}" onclick="toggleBillStatus(${b.id})" style="cursor:pointer; border:none;" title="ক্লিক করে স্ট্যাটাস পরিবর্তন করুন">
              ${statusText} ⟳
            </button>
          ` : `
            <span class="badge ${statusClass}">${statusText}</span>
          `}
        </td>
        ${isAdmin ? `
          <td class="text-center">
            <button class="btn btn-sm btn-danger" onclick="deleteBill(${b.id})" title="বিল মুছুন">✕</button>
          </td>
        ` : ''}
      </tr>
    `;
  }).join('');

  document.getElementById('totalFixedFoot').textContent = formatBDT(metrics.totalFixed);
  document.getElementById('avgFixedFoot').textContent = `মাথাপিছু ~৳${(metrics.totalFixed / (state.members.length || 1)).toFixed(2)}`;

  // Shared Items
  const sharedTbody = document.getElementById('sharedItemsBody');
  sharedTbody.innerHTML = state.sharedItems.map(item => `
    <tr>
      <td>${item.name}</td>
      <td class="text-right mono"><b>৳${Number(item.price).toLocaleString()}</b></td>
      <td><span class="badge">${item.buyer}</span></td>
      ${isAdmin ? `
        <td class="text-center">
          <button class="btn btn-sm btn-danger" onclick="deleteSharedItem(${item.id})" title="মুছুন">✕</button>
        </td>
      ` : ''}
    </tr>
  `).join('');
  document.getElementById('sharedItemsTotal').textContent = `মোট: ৳${metrics.totalShared}`;

  // Member Utility Cards (dynamic estimation)
  const memberGrid = document.getElementById('memberUtilityGrid');
  memberGrid.innerHTML = state.members.map(m => {
    // Calculate this member's share across bills
    let myBillTotal = 0;
    const billBreakdowns = state.fixedBills.map(b => {
      // If note mentions 3 persons (and Imam), Imam is excluded
      const isExcluded = (b.note && b.note.includes('৩ জনের') && m === 'Imam') ||
                         (b.splitCount < state.members.length && m === 'Imam');
      const share = isExcluded ? 0 : (b.amount / (b.splitCount || state.members.length));
      myBillTotal += share;
      return `${b.title.split(' ')[0]}: ৳${share.toFixed(0)}`;
    }).join(' • ');

    return `
      <div class="member-card">
        <div class="member-head">
          <b>${m}</b>
          <span class="badge badge-green">হিসাবভুক্ত</span>
        </div>
        <div class="text-sm text-muted" style="line-height: 1.6;">
          ${billBreakdowns}
        </div>
        <div class="member-breakdown" style="margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border-color);">
          <span>তার অংশের মোট বিল:</span>
          <span class="mono" style="font-weight:700;">৳${myBillTotal.toFixed(2)}</span>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleBillStatus = function(id) {
  if (!isAdmin) return;
  const bill = state.fixedBills.find(b => b.id === id);
  if (bill) {
    bill.status = bill.status === 'Paid' ? 'Due' : 'Paid';
    saveState();
    showToast(`স্ট্যাটাস পরিবর্তন হয়েছে: ${bill.status === 'Paid' ? 'পরিশোধিত' : 'বকেয়া'}`);
  }
};

window.deleteBill = function(id) {
  if (!isAdmin) return;
  if (confirm('আপনি কি এই বিলটি মুছে ফেলতে চান?')) {
    state.fixedBills = state.fixedBills.filter(b => b.id !== id);
    saveState();
    showToast('বিল মুছে ফেলা হয়েছে');
  }
};

window.deleteSharedItem = function(id) {
  if (!isAdmin) return;
  if (confirm('আপনি কি এই সামগ্রীর খরচ মুছে ফেলতে চান?')) {
    state.sharedItems = state.sharedItems.filter(item => item.id !== id);
    saveState();
    showToast('মেস সামগ্রী খরচ মুছে ফেলা হয়েছে');
  }
};

// Render Settlement
function renderSettlement(metrics) {
  const container = document.getElementById('settlementTransfersList');
  container.innerHTML = '';

  if (metrics.settlementTransfers.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px;" class="text-muted">🎉 সবার হিসাব সম্পূর্ণ পরিশোধিত ও জিরো ব্যালেন্স!</div>`;
  } else {
    metrics.settlementTransfers.forEach(t => {
      const row = document.createElement('div');
      row.className = 'settle-row';
      row.innerHTML = `
        <div class="settle-party">
          <span class="settle-from">${t.from}</span>
          <span class="text-muted">➔</span>
          <span class="settle-to">${t.to}</span>
        </div>
        <div class="mono" style="font-weight:700; font-size:1.05rem;">${formatBDT(t.amount)}</div>
      `;
      container.appendChild(row);
    });
  }

  // Detail Table
  const tbody = document.getElementById('settlementDetailBody');
  tbody.innerHTML = metrics.memberSummaries.map(m => `
    <tr>
      <td><b>${m.name}</b></td>
      <td class="text-center mono"><b>${m.meals}</b></td>
      <td class="text-right mono">${formatBDT(m.deposit)}</td>
      <td class="text-right mono">${formatBDT(m.mealCost)}</td>
      <td class="text-right mono ${m.status}" style="font-weight:700;">
        ${formatBDT(m.balance, true)}
      </td>
      <td class="text-center">
        ${m.balance > 0.01 
          ? `<span class="badge badge-green">পাবেন</span>` 
          : m.balance < -0.01 
            ? `<span class="badge badge-red">দিতে হবে</span>` 
            : `<span class="badge">ক্লিয়ার</span>`}
      </td>
    </tr>
  `).join('');

  generateWhatsAppSummary(metrics);
}

function generateWhatsAppSummary(metrics) {
  let msg = `📋 *মিল ট্র্যাকার (Meal Tracker) - মিল ও খরচ রিপোর্ট (${state.month})*\n`;
  msg += `────────────────────────\n`;
  msg += `🛒 মোট বাজার: ৳${metrics.totalBazar.toFixed(2)}\n`;
  msg += `🍲 মোট মিল: ${metrics.totalMeals} টি\n`;
  msg += `⚡ মিল রেট: ৳${metrics.mealRate.toFixed(2)}\n\n`;

  msg += `📊 *মেম্বারদের ব্যালেন্স:*\n`;
  metrics.memberSummaries.forEach(m => {
    const statusText = m.balance > 0.01 
      ? `পাবেন +৳${m.balance.toFixed(2)}` 
      : m.balance < -0.01 
        ? `দিতে হবে -৳${Math.abs(m.balance).toFixed(2)}` 
        : `ব্যালেন্স ৳০`;
    msg += `• *${m.name}*: মিল ${m.meals}টি ➔ ${statusText}\n`;
  });

  msg += `\n🤝 *কে কাকে টাকা দেবে:*\n`;
  if (metrics.settlementTransfers.length > 0) {
    metrics.settlementTransfers.forEach(t => {
      msg += `👉 *${t.from}* দিবে *${t.to}*-কে ৳${t.amount.toFixed(2)}\n`;
    });
  } else {
    msg += `সব হিসাব ক্লিয়ার! ✅\n`;
  }
  msg += `────────────────────────\n`;
  msg += `_মিল ট্র্যাকার (Meal Tracker) দ্বারা জেনারেট করা।_`;

  document.getElementById('whatsAppTextPreview').textContent = msg;
  document.getElementById('openWhatsAppLink').href = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
}

// Render User Management Tab
function renderUserManagement() {
  document.getElementById('userCountBadge').textContent = state.members.length;
  const list = document.getElementById('userManagementList');
  list.innerHTML = '';

  state.members.forEach((member, idx) => {
    const item = document.createElement('div');
    item.className = 'user-item';

    const canDelete = isAdmin && state.members.length > 1;

    item.innerHTML = `
      <div class="user-item-info">
        <div class="member-avatar">${member.charAt(0)}</div>
        <div>
          <b>${member}</b>
          <div class="text-sm text-muted">সদস্য #${idx + 1}</div>
        </div>
      </div>
      <div>
        ${canDelete ? `
          <button class="btn btn-sm btn-danger" onclick="deleteMember('${member}')">
            মুছুন
          </button>
        ` : `
          <span class="badge">সক্রিয়</span>
        `}
      </div>
    `;
    list.appendChild(item);
  });

  // Admin lock notice
  const lockNotice = document.getElementById('userAddLockNotice');
  const addBtn = document.getElementById('saveMemberBtn');
  const nameInput = document.getElementById('newMemberName');

  if (isAdmin) {
    lockNotice.style.display = 'none';
    addBtn.disabled = false;
    nameInput.disabled = false;
  } else {
    lockNotice.style.display = 'block';
    addBtn.disabled = true;
    nameInput.disabled = true;
  }

  // Populate Add Bazar modal shopper select
  const modalShopperSelect = document.getElementById('modalShopperSelect');
  modalShopperSelect.innerHTML = state.members.map(m => `<option value="${m}">${m}</option>`).join('');
}

// Add New Member
function addMember(name) {
  const cleanName = name.trim();
  if (!cleanName) return;

  if (state.members.some(m => m.toLowerCase() === cleanName.toLowerCase())) {
    showToast('এই নামের সদস্য ইতিমধ্যে রয়েছে!');
    return;
  }

  state.members.push(cleanName);
  if (!state.deposits) state.deposits = {};
  state.deposits[cleanName] = 0;

  // Initialize meals for all 31 days for the new member
  for (let day = 1; day <= 31; day++) {
    if (!state.meals[day]) state.meals[day] = {};
    state.meals[day][cleanName] = 0;
  }

  saveState();
  showToast(`সদস্য "${cleanName}" যুক্ত করা হয়েছে!`);
}

// Delete Member
window.deleteMember = function(name) {
  if (!isAdmin) {
    showToast('সদস্য মুছতে এডমিন লগইন প্রয়োজন');
    return;
  }

  if (state.members.length <= 1) {
    showToast('মেসে অন্তত ১ জন সদস্য থাকতে হবে!');
    return;
  }

  if (confirm(`আপনি কি নিশ্চিত যে সদস্য "${name}"-কে মেস তালিকা থেকে মুছে ফেলতে চান? তার পূর্বের সকল মিল ও এন্ট্রি মুছে যাবে।`)) {
    state.members = state.members.filter(m => m !== name);
    if (state.deposits && state.deposits[name] !== undefined) {
      delete state.deposits[name];
    }

    // Clean up meals
    for (let day = 1; day <= 31; day++) {
      if (state.meals[day] && state.meals[day][name] !== undefined) {
        delete state.meals[day][name];
      }
    }

    saveState();
    showToast(`সদস্য "${name}" সফলভাবে মুছে ফেলা হয়েছে!`);
  }
};

window.openQuickDeposit = function(memberName) {
  if (!isAdmin) return;
  if (window.openDepositModalGlobal) {
    window.openDepositModalGlobal(memberName);
  }
};

// Admin Mode Update UI
function updateAdminUI() {
  const banner = document.getElementById('adminBanner');
  const statusText = document.getElementById('adminStatusText');
  const mealAdminControls = document.getElementById('mealAdminControls');
  const bazarAdminBtn = document.getElementById('bazarAdminBtn');
  const utilityAdminControls = document.getElementById('utilityAdminControls');
  const mealAdminHint = document.getElementById('mealAdminHint');

  if (isAdmin) {
    banner.style.display = 'block';
    statusText.textContent = 'লগআউট (এডমিন)';
    if (mealAdminControls) mealAdminControls.style.display = 'flex';
    if (bazarAdminBtn) bazarAdminBtn.style.display = 'block';
    if (utilityAdminControls) utilityAdminControls.style.display = 'flex';
    mealAdminHint.textContent = '🔓 এডমিন মোড সক্রিয়: +/- বাটনে ক্লিক করে মিল পরিবর্তন করুন।';
    document.querySelectorAll('.admin-only-cell').forEach(el => el.style.display = 'table-cell');
    document.querySelectorAll('.admin-only-btn').forEach(el => el.style.display = 'inline-flex');
  } else {
    banner.style.display = 'none';
    statusText.textContent = 'এডমিন লগইন';
    if (mealAdminControls) mealAdminControls.style.display = 'none';
    if (bazarAdminBtn) bazarAdminBtn.style.display = 'none';
    if (utilityAdminControls) utilityAdminControls.style.display = 'none';
    mealAdminHint.textContent = '🔒 মিল পরিবর্তন করতে উপরের "এডমিন লগইন" চাপুন।';
    document.querySelectorAll('.admin-only-cell').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.admin-only-btn').forEach(el => el.style.display = 'none');
  }
}

// Master Render
function renderAll() {
  const metrics = calculateMetrics();
  renderKPIs(metrics);
  renderDashboard(metrics);
  renderMealsTable();
  renderBazarTable();
  renderUtilities(metrics);
  renderSettlement(metrics);
  renderUserManagement();
  updateAdminUI();
}

// Tab Switching
window.switchTab = function(tabName) {
  document.querySelectorAll('.nav-list .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab-${tabName}`);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Toast
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.display = 'block';
  setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

// Setup Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  document.getElementById('themeToggleBtn').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    showToast(next === 'dark' ? 'ডার্ক থিম চালু হয়েছে' : 'লাইট থিম চালু হয়েছে');
  });

  // Nav Tab clicks
  document.querySelectorAll('.nav-list .nav-item').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Admin Modal
  const adminModal = document.getElementById('adminLoginModal');
  const openAdminModal = () => {
    if (isAdmin) {
      // Logout
      isAdmin = false;
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'false');
      updateAdminUI();
      renderAll();
      showToast('এডমিন মোড থেকে সফলভাবে লগআউট হয়েছেন');
    } else {
      adminModal.classList.add('open');
      document.getElementById('adminPinInput').value = '';
      document.getElementById('adminPinInput').focus();
    }
  };
  const closeAdminModal = () => adminModal.classList.remove('open');

  document.getElementById('adminToggleBtn').addEventListener('click', openAdminModal);
  document.getElementById('closeAdminModalBtn').addEventListener('click', closeAdminModal);
  document.getElementById('cancelAdminModalBtn').addEventListener('click', closeAdminModal);
  document.getElementById('adminLogoutBtn').addEventListener('click', () => {
    isAdmin = false;
    sessionStorage.setItem(ADMIN_SESSION_KEY, 'false');
    updateAdminUI();
    renderAll();
    showToast('এডমিন মোড থেকে লগআউট করা হয়েছে');
  });

  document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const pin = document.getElementById('adminPinInput').value.trim();
    if (pin === (state.adminPin || '1234')) {
      isAdmin = true;
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      closeAdminModal();
      updateAdminUI();
      renderAll();
      showToast('স্বাগতম! এডমিন মোড সক্রিয় হয়েছে।');
    } else {
      alert('ভুল পিন কোড! সঠিক পিন দিয়ে চেষ্টা করুন।');
    }
  });

  // Add Member Form
  document.getElementById('addUserForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin) {
      showToast('সদস্য যোগ করতে এডমিন লগইন প্রয়োজন');
      return;
    }
    const nameInput = document.getElementById('newMemberName');
    addMember(nameInput.value);
    nameInput.value = '';
  });

  // Bazar Modal
  const bazarModal = document.getElementById('bazarModal');
  const openBazarModal = () => {
    if (!isAdmin) {
      showToast('বাজার যোগ করতে এডমিন লগইন করুন');
      return;
    }
    bazarModal.classList.add('open');
  };
  const closeBazarModal = () => bazarModal.classList.remove('open');

  document.getElementById('openAddBazarBtn').addEventListener('click', openBazarModal);
  document.getElementById('closeBazarModalBtn').addEventListener('click', closeBazarModal);
  document.getElementById('cancelBazarModalBtn').addEventListener('click', closeBazarModal);

  document.getElementById('bazarForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const shopper = document.getElementById('modalShopperSelect').value;
    const item = document.getElementById('modalItemInput').value.trim();
    const amount = Number(document.getElementById('modalAmountInput').value);

    if (!item || !amount) return;

    state.bazar.push({
      id: Date.now(),
      shopper,
      item,
      amount,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
    });

    saveState();
    closeBazarModal();
    document.getElementById('bazarForm').reset();
    showToast('নতুন বাজার খরচ সফলভাবে যোগ হয়েছে!');
  });

  // Deposit Modal
  const depositModal = document.getElementById('depositModal');
  const openDepositModal = (prefillMember = '') => {
    if (!isAdmin) {
      showToast('টাকা জমা এন্ট্রি করতে এডমিন লগইন করুন');
      return;
    }
    const select = document.getElementById('depositMemberSelect');
    select.innerHTML = state.members.map(m => `<option value="${m}">${m}</option>`).join('');
    if (prefillMember && state.members.includes(prefillMember)) {
      select.value = prefillMember;
    }
    document.getElementById('depositAmountInput').value = '';
    depositModal.classList.add('open');
  };
  const closeDepositModal = () => depositModal.classList.remove('open');
  window.openDepositModalGlobal = openDepositModal;

  const openDepositBtn = document.getElementById('openDepositModalBtn');
  if (openDepositBtn) {
    openDepositBtn.addEventListener('click', () => openDepositModal());
  }
  document.getElementById('closeDepositModalBtn').addEventListener('click', closeDepositModal);
  document.getElementById('cancelDepositModalBtn').addEventListener('click', closeDepositModal);

  document.getElementById('depositForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin) return;
    const member = document.getElementById('depositMemberSelect').value;
    const amount = Number(document.getElementById('depositAmountInput').value);
    const type = document.getElementById('depositTypeSelect').value;

    if (!member || isNaN(amount) || amount < 0) return;

    if (!state.deposits) state.deposits = {};
    const current = Number(state.deposits[member]) || 0;
    if (type === 'add') {
      state.deposits[member] = current + amount;
      showToast(`${member}-এর জমার সাথে ৳${amount} যোগ হয়েছে`);
    } else {
      state.deposits[member] = amount;
      showToast(`${member}-এর মোট জমা ৳${amount} নির্ধারণ করা হয়েছে`);
    }

    saveState();
    closeDepositModal();
  });

  // Fixed Bill Modal
  const billModal = document.getElementById('billModal');
  const openBillModal = () => {
    if (!isAdmin) {
      showToast('বিল এন্ট্রি করতে এডমিন লগইন করুন');
      return;
    }
    document.getElementById('billForm').reset();
    document.getElementById('billSplitCount').value = state.members.length;
    billModal.classList.add('open');
  };
  const closeBillModal = () => billModal.classList.remove('open');

  const openBillBtn = document.getElementById('openAddBillBtn');
  if (openBillBtn) openBillBtn.addEventListener('click', openBillModal);
  document.getElementById('closeBillModalBtn').addEventListener('click', closeBillModal);
  document.getElementById('cancelBillModalBtn').addEventListener('click', closeBillModal);

  document.getElementById('billForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const title = document.getElementById('billTitleInput').value.trim();
    const amount = Number(document.getElementById('billAmountInput').value);
    const splitCount = Number(document.getElementById('billSplitCount').value) || state.members.length;
    const status = document.getElementById('billStatusSelect').value;
    const note = document.getElementById('billNoteInput').value.trim();

    if (!title || !amount) return;

    state.fixedBills.push({
      id: Date.now(),
      title,
      amount,
      splitCount,
      status,
      note: note || `${splitCount} জনের ভাগ`
    });

    saveState();
    closeBillModal();
    showToast(`নতুন বিল "${title}" যোগ হয়েছে!`);
  });

  // Shared Supply Item Modal
  const sharedItemModal = document.getElementById('sharedItemModal');
  const openSharedItemModal = () => {
    if (!isAdmin) {
      showToast('সামগ্রী খরচ এন্ট্রি করতে এডমিন লগইন করুন');
      return;
    }
    document.getElementById('sharedItemForm').reset();
    const buyerSelect = document.getElementById('sharedItemBuyerSelect');
    buyerSelect.innerHTML = state.members.map(m => `<option value="${m}">${m}</option>`).join('');
    sharedItemModal.classList.add('open');
  };
  const closeSharedItemModal = () => sharedItemModal.classList.remove('open');

  const openSharedItemBtn = document.getElementById('openAddSharedItemBtn');
  if (openSharedItemBtn) openSharedItemBtn.addEventListener('click', openSharedItemModal);
  document.getElementById('closeSharedItemModalBtn').addEventListener('click', closeSharedItemModal);
  document.getElementById('cancelSharedItemModalBtn').addEventListener('click', closeSharedItemModal);

  document.getElementById('sharedItemForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const name = document.getElementById('sharedItemNameInput').value.trim();
    const price = Number(document.getElementById('sharedItemPriceInput').value);
    const buyer = document.getElementById('sharedItemBuyerSelect').value;

    if (!name || !price || !buyer) return;

    state.sharedItems.push({
      id: Date.now(),
      name,
      price,
      buyer
    });

    saveState();
    closeSharedItemModal();
    showToast(`মেস সামগ্রী "${name}" যুক্ত হয়েছে!`);
  });

  // Search & Filter
  document.getElementById('bazarShopperFilter').addEventListener('change', renderBazarTable);
  document.getElementById('bazarSearchInput').addEventListener('input', renderBazarTable);
  document.getElementById('mealFilterInput').addEventListener('input', renderMealsTable);

  // Bulk Meal Add
  document.getElementById('addAllMealsBtn').addEventListener('click', () => {
    if (!isAdmin) return;
    const day = prompt('কোন তারিখে সবার ১টি করে মিল যোগ করবেন? (১ থেকে ৩১ এর মধ্যে লিখুন):', new Date().getDate());
    const dayNum = parseInt(day, 10);
    if (dayNum >= 1 && dayNum <= 31) {
      if (!state.meals[dayNum]) state.meals[dayNum] = {};
      state.members.forEach(m => {
        state.meals[dayNum][m] = (state.meals[dayNum][m] || 0) + 1;
      });
      saveState();
      showToast(`${dayNum} অক্টোবরে সবার ১টি করে মিল যোগ হয়েছে!`);
    }
  });

  // Copy WhatsApp summaries
  const copyWA = () => {
    const text = document.getElementById('whatsAppTextPreview').textContent;
    navigator.clipboard.writeText(text).then(() => {
      showToast('হোয়াটসঅ্যাপ মেসেজ কপি হয়েছে!');
    });
  };

  document.getElementById('quickWhatsAppBtn').addEventListener('click', () => {
    switchTab('settlement');
    copyWA();
  });
  document.getElementById('copyWhatsAppDetailedBtn').addEventListener('click', copyWA);
  document.getElementById('copyTextBtn').addEventListener('click', copyWA);

  // Print
  document.getElementById('printReportBtn').addEventListener('click', () => window.print());

  // Reset to Google Sheet Default
  document.getElementById('resetDataBtn').addEventListener('click', () => {
    if (!isAdmin) {
      showToast('রিসেট করতে এডমিন লগইন প্রয়োজন');
      return;
    }
    if (confirm('আপনি কি নিশ্চিত যে আসল গুগল শিটের ডাটায় ফিরিয়ে নিতে চান?')) {
      state = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveState();
      showToast('আসল গুগল শিট ডাটায় রিসেট সম্পন্ন হয়েছে!');
    }
  });

  // Export
  document.getElementById('exportJsonBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mess-data-${Date.now()}.json`;
    a.click();
    showToast('JSON ব্যাকআপ ডাউনলোড হয়েছে');
  });

  document.getElementById('exportCsvBtn').addEventListener('click', () => {
    let csv = "ID,Shopper,Item,Amount,Date\n";
    state.bazar.forEach(b => {
      csv += `"${b.id}","${b.shopper}","${b.item.replace(/"/g, '""')}","${b.amount}","${b.date}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mess-bazar-${Date.now()}.csv`;
    a.click();
    showToast('CSV ফাইল ডাউনলোড হয়েছে');
  });

  // PWA Service Worker & Install Prompt Setup
  let deferredPrompt = null;
  const pwaBtn = document.getElementById('pwaInstallBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaBtn) pwaBtn.style.display = 'inline-flex';
  });

  if (pwaBtn) {
    pwaBtn.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          showToast('অ্যাপ সফলভাবে ইনস্টল হচ্ছে!');
        }
        deferredPrompt = null;
        pwaBtn.style.display = 'none';
      } else {
        alert('আপনার ব্রাউজারের থ্রি-ডট (Menu) মেনু থেকে "Install App" বা "Add to Home screen" নির্বাচন করুন।');
      }
    });
  }

  // Register SW if supported
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('SW registration note:', err);
      });
    });
  }

  // Firebase Realtime Sync Setup
  if (typeof initFirebase === 'function') {
    initFirebase((remoteState) => {
      if (remoteState && remoteState.members) {
        state = remoteState;
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {}
        renderAll();
        showToast('🔄 ক্লাউড থেকে সর্বশেষ তথ্য লাইভ সিঙ্ক হয়েছে!');
      }
    });
  }

  // Firebase Config Modal
  const firebaseModal = document.getElementById('firebaseModal');
  const openFirebaseModal = () => {
    if (typeof getStoredFirebaseConfig === 'function') {
      const config = getStoredFirebaseConfig();
      document.getElementById('fbProjectIdInput').value = config.projectId === 'YOUR_PROJECT_ID' ? '' : config.projectId || '';
      document.getElementById('fbApiKeyInput').value = config.apiKey === 'YOUR_API_KEY' ? '' : config.apiKey || '';
      document.getElementById('fbAppIdInput').value = config.appId === 'YOUR_APP_ID' ? '' : config.appId || '';
    }
    firebaseModal.classList.add('open');
  };
  const closeFirebaseModal = () => firebaseModal.classList.remove('open');

  const cloudIndicator = document.getElementById('cloudSyncIndicator');
  if (cloudIndicator) cloudIndicator.addEventListener('click', openFirebaseModal);
  document.getElementById('closeFirebaseModalBtn').addEventListener('click', closeFirebaseModal);
  document.getElementById('cancelFirebaseModalBtn').addEventListener('click', closeFirebaseModal);

  document.getElementById('firebaseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const projectId = document.getElementById('fbProjectIdInput').value.trim();
    const apiKey = document.getElementById('fbApiKeyInput').value.trim();
    const appId = document.getElementById('fbAppIdInput').value.trim();

    if (!projectId || !apiKey) return;

    const newConfig = {
      apiKey,
      authDomain: `${projectId}.firebaseapp.com`,
      projectId,
      storageBucket: `${projectId}.appspot.com`,
      messagingSenderId: "123456789",
      appId
    };

    if (typeof saveFirebaseConfig === 'function') {
      saveFirebaseConfig(newConfig);
    }
  });

  // Initial load
  renderAll();
});
