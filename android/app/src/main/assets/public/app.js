
function copyTextToClipboard(text, successMessage) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage || '📋 ক্লিপবোর্ডে কপি হয়েছে!');
    }).catch(() => fallbackCopy(text, successMessage));
  } else {
    fallbackCopy(text, successMessage);
  }
}

function fallbackCopy(text, successMessage) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast(successMessage || '📋 ক্লিপবোর্ডে কপি হয়েছে!');
  } catch (e) {
    showToast('কপি করতে সমস্যা হয়েছে');
  }
  document.body.removeChild(ta);
}

/**
 * Mess Manager Application Logic
 * Minimalist Design + Admin Mode + User Management (Add / Delete)
 */

const INITIAL_DATA = {
  dataVersion: '2026-10-21_GSHEET_SYNC_V3',
  depositHistory: [
    { id: 'init-1', member: 'Sadhin', amount: 1397, date: '1 October 2026', note: 'মেস ফান্ড জমা' },
    { id: 'init-2', member: 'Tanzid', amount: 1599, date: '1 October 2026', note: 'মেস ফান্ড জমা' },
    { id: 'init-3', member: 'Akhirul', amount: 1556, date: '1 October 2026', note: 'মেস ফান্ড জমা' }
  ],
  month: 'October 2026',
  monthBn: 'অক্টোবর ২০২৬',
  members: ['Sadhin', 'Tanzid', 'Akhirul', 'Imam'],
  adminPin: '1234',
  deposits: {
    Sadhin: 1397,
    Tanzid: 1599,
    Akhirul: 1556,
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
    { id: 19, shopper: 'Sadhin', item: 'Murgi 340, dheros 20', amount: 360, date: '19 October' },
    { id: 20, shopper: 'Akhirul', item: 'Tel, sobji, lighter, dim', amount: 275, date: '20 October' }
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
    19: { Sadhin: 2, Tanzid: 1, Akhirul: 2, Imam: 0 },
    20: { Sadhin: 2, Tanzid: 0, Akhirul: 2, Imam: 0 },
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
    { id: 1, name: 'Harpic + Handwash', price: 270, buyer: 'Sadhin', date: '27 October' },
    { id: 2, name: 'Tul (টুল)', price: 350, buyer: 'Tanzid', date: '28 October' },
    { id: 3, name: 'Rice case', price: 100, buyer: 'Sadhin', date: '29 October' }
  ],
  memberBillStatus: {
    Sadhin: 'Paid',
    Tanzid: 'Paid',
    Akhirul: 'Paid',
    Imam: 'Paid'
  }
};


const MONTH_NAMES_BN = [
  'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
  'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
];
const MONTH_NAMES_EN = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MESS_ACTIVE_MONTH_KEY = 'MESS_ACTIVE_MONTH_ID';
const MESS_ALL_MONTHS_KEY = 'MESS_ALL_MONTHS_LIST';

let currentMonthId = localStorage.getItem(MESS_ACTIVE_MONTH_KEY) || '2026-10';

let allMonths = [
  { id: '2026-10', name: 'October 2026', label: 'অক্টোবর ২০২৬', days: 31 }
];

function loadMonthsList() {
  try {
    const raw = localStorage.getItem(MESS_ALL_MONTHS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        allMonths = parsed;
        if (!allMonths.some(m => m.id === '2026-10')) {
          allMonths.unshift({ id: '2026-10', name: 'October 2026', label: 'অক্টোবর ২০২৬', days: 31 });
        }
      }
    }
  } catch (e) {
    console.warn('Error reading months list', e);
  }
}

function saveMonthsList() {
  try {
    localStorage.setItem(MESS_ALL_MONTHS_KEY, JSON.stringify(allMonths));
    if (typeof syncMonthsMetaToCloud === 'function') {
      syncMonthsMetaToCloud(allMonths);
    }
  } catch (e) {
    console.error('Error saving months list', e);
  }
}

function getDaysInMonthForState(st) {
  if (st && st.daysInMonth) return st.daysInMonth;
  if (st && st.monthId) {
    const parts = st.monthId.split('-');
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    if (y && m) return new Date(y, m, 0).getDate();
  }
  return 31;
}

function getStorageKeyForMonth(monthId) {
  if (monthId === '2026-10') return 'MESS_MINIMAL_DATA_V2';
  return 'MESS_DATA_' + monthId;
}

function createFreshMonthState(monthId, carryOverMembers = true) {
  const parts = monthId.split('-');
  const year = parseInt(parts[0], 10) || 2026;
  const mIndex = (parseInt(parts[1], 10) || 1) - 1;
  const daysInMonth = new Date(year, mIndex + 1, 0).getDate();
  const enName = MONTH_NAMES_EN[mIndex] + ' ' + year;
  const bnName = MONTH_NAMES_BN[mIndex] + ' ' + year;

  // 1. Members: Keep current members
  const membersList = (carryOverMembers && typeof state !== 'undefined' && state && Array.isArray(state.members) && state.members.length > 0)
    ? [...state.members]
    : ['Sadhin', 'Tanzid', 'Akhirul', 'Imam'];

  // 2. Fixed monthly fees (bills): Keep fixed fees, status reset to 'Pending'
  const isNovOrLater = monthId >= '2026-11';
  let defaultBills = [];
  const sourceBills = (typeof state !== 'undefined' && state && Array.isArray(state.fixedBills) && state.fixedBills.length > 0)
    ? state.fixedBills
    : (INITIAL_DATA.fixedBills || [
        { id: 1, title: 'House Rent (বাসা ভাড়া)', amount: 16000, splitCount: 4, status: 'Pending', note: '৪ জনের সমান ভাগ' },
        { id: 2, title: 'Wifi Bill (ইন্টারনেট)', amount: 690, splitCount: 4, status: 'Pending', note: '৪ জনের সমান ভাগ' },
        { id: 3, title: 'Bua Bill (খালা বিল)', amount: (isNovOrLater ? 2000 : 700), splitCount: 3, status: 'Pending', note: '৩ জনের ভাগ (Sadhin, Tanzid, Akhirul)' }
      ]);

  defaultBills = sourceBills.map((b, idx) => {
    const isBua = (b.title && (b.title.includes('বুয়া') || b.title.includes('খালা') || b.title.toLowerCase().includes('bua')));
    let amt = Number(b.amount) || 0;
    // Bua bill is 2000 from November onwards
    if (isBua && isNovOrLater) {
      amt = 2000;
    }
    return {
      id: Date.now() + idx,
      title: b.title,
      amount: amt,
      splitCount: b.splitCount || (isBua ? 3 : membersList.length),
      status: 'Pending',
      note: b.note || (isBua ? '৩ জনের ভাগ (Sadhin, Tanzid, Akhirul)' : '')
    };
  });

  // 3. Reset everything else to 0 / empty:
  // - Meals: 0 for all days & members
  const freshMeals = {};
  for (let d = 1; d <= daysInMonth; d++) {
    freshMeals[d] = {};
    membersList.forEach(m => freshMeals[d][m] = 0);
  }

  // - Deposits: 0 for all members
  const freshDeposits = {};
  membersList.forEach(m => freshDeposits[m] = 0);

  // - Payment statuses: Pending
  const freshMemberBillStatus = {};
  membersList.forEach(m => freshMemberBillStatus[m] = 'Pending');

  const freshMemberSharedStatus = {};
  membersList.forEach(m => freshMemberSharedStatus[m] = 'Pending');

  return {
    month: enName,
    monthBn: bnName,
    monthId: monthId,
    daysInMonth: daysInMonth,
    members: membersList,
    adminPin: (typeof state !== 'undefined' && state && state.adminPin) ? state.adminPin : '1234',
    deposits: freshDeposits,
    depositHistory: [],
    bazar: [],
    meals: freshMeals,
    fixedBills: defaultBills,
    sharedItems: [],
    memberBillStatus: freshMemberBillStatus,
    memberSharedStatus: freshMemberSharedStatus,
    memberCustomBillAdjustments: {}
  };
}

loadMonthsList();

const STORAGE_KEY = 'MESS_MINIMAL_DATA_V2';
const THEME_KEY = 'MESS_THEME';
const ADMIN_SESSION_KEY = 'MESS_ADMIN_LOGGED_IN';
const GSHEET_SYNC_KEY = 'MESS_GSHEET_SYNC_V20261021_V3';

// App State
let state = loadState();
let isAdmin = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';

function loadState(monthId = currentMonthId) {
  const key = getStorageKeyForMonth(monthId);
  try {
    // If October 2026 and not yet synced to latest Google Sheet revision, force reset
    if (monthId === '2026-10') {
      const isSynced = localStorage.getItem(GSHEET_SYNC_KEY);
      if (!isSynced) {
        localStorage.setItem(GSHEET_SYNC_KEY, 'true');
        localStorage.setItem(key, JSON.stringify(INITIAL_DATA));
        return JSON.parse(JSON.stringify(INITIAL_DATA));
      }
    }

    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.deposits) {
        parsed.deposits = {};
        (parsed.members || []).forEach(m => parsed.deposits[m] = 0);
      }
      ensureDepositHistory(parsed);
      // Ensure bua bill is 2000 from November 2026 onwards
      if (monthId >= '2026-11' && Array.isArray(parsed.fixedBills)) {
        parsed.fixedBills.forEach(b => {
          const isBua = b.title && (b.title.includes('বুয়া') || b.title.includes('খালা') || b.title.toLowerCase().includes('bua'));
          if (isBua && (b.amount === 700 || !b.amount)) {
            b.amount = 2000;
          }
        });
      }
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load state for month ' + monthId, e);
  }

  if (monthId === '2026-10') {
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }

  return createFreshMonthState(monthId);
}

function saveState() {
  const key = getStorageKeyForMonth(currentMonthId);
  try {
    localStorage.setItem(key, JSON.stringify(state));
    if (typeof pushStateToFirebase === 'function') {
      pushStateToFirebase(state);
    }
  } catch (e) {
    console.error('Failed to save state', e);
  }
}

function saveStateLocalOnly() {
  const key = getStorageKeyForMonth(currentMonthId);
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {}
}

// Helpers
function formatBDT(amount,
      category, showPlus = false) {
  const num = Number(amount) || 0;
  const prefix = num > 0 && showPlus ? '+' : '';
  return `${prefix}৳${num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// Calculate Metrics (Fund-based calculation)
function calculateMetrics() {
  if (!state.deposits) state.deposits = {};
  let totalCashDeposit = 0;
  state.members.forEach(m => {
    if (state.deposits[m] === undefined) state.deposits[m] = 0;
    totalCashDeposit += Number(state.deposits[m]) || 0;
  });

  // Separate Food Bazar (for Meal Rate) vs Extra/Shared Mess Items (Equal Split)
  let totalFoodBazar = 0;
  let totalSharedBazar = 0;
  const memberSharedPaid = {};
  state.members.forEach(m => memberSharedPaid[m] = 0);

  (state.bazar || []).forEach(item => {
    const amt = Number(item.amount) || 0;
    if (item.category === 'shared' || item.type === 'shared') {
      totalSharedBazar += amt;
      if (item.shopper && memberSharedPaid[item.shopper] !== undefined) {
        memberSharedPaid[item.shopper] += amt;
      }
    } else {
      totalFoodBazar += amt;
    }
  });

  // Also include items from state.sharedItems if any
  (state.sharedItems || []).forEach(item => {
    const amt = Number(item.price) || 0;
    totalSharedBazar += amt;
    if (item.buyer && memberSharedPaid[item.buyer] !== undefined) {
      memberSharedPaid[item.buyer] += amt;
    }
  });

  const totalBazar = totalFoodBazar + totalSharedBazar;
  // Total Combined Deposit = Cash Deposit + Extra Mess Supplies paid by members
  const totalDeposit = totalCashDeposit + totalSharedBazar;
  // Remaining Cash in mess box = Cash Deposit - Food Bazar
  const remainingCash = totalCashDeposit - totalFoodBazar;
  const remainingFund = totalDeposit - totalBazar;

  const memberMeals = {};
  state.members.forEach(m => memberMeals[m] = 0);
  let totalMeals = 0;

  const daysInMonth = getDaysInMonthForState(state);
  for (let day = 1; day <= daysInMonth; day++) {
    const dayData = state.meals[day] || {};
    state.members.forEach(m => {
      const val = Number(dayData[m]) || 0;
      memberMeals[m] += val;
      totalMeals += val;
    });
  }

  // Meal Rate is ONLY based on Food Bazar!
  const mealRate = totalMeals > 0 ? totalFoodBazar / totalMeals : 0;

  // Equal split per member for extra/shared mess items
  const perMemberSharedCost = state.members.length > 0 ? (totalSharedBazar / state.members.length) : 0;

  const memberSummaries = state.members.map(name => {
    const cashDeposit = Number(state.deposits[name]) || 0;
    const meals = memberMeals[name] || 0;
    const mealCost = meals * mealRate;

    const sharedPaid = memberSharedPaid[name] || 0;
    const sharedBalance = sharedPaid - perMemberSharedCost;

    // Total credited into member account = Cash Deposit + Extra Mess Bazar Paid
    const totalDeposit = cashDeposit + sharedPaid;
    // Total mess cost for member = Food Meal Cost + Shared Item Share
    const totalMessCost = mealCost + perMemberSharedCost;

    // Final Net Balance = Total Deposit - Total Mess Cost
    const balance = totalDeposit - totalMessCost;

    // Calculate this member's share across fixed utility bills
    let utilityTotal = 0;
    (state.fixedBills || []).forEach(b => {
      const isExcluded = (b.note && b.note.includes('৩ জনের') && name === 'Imam') ||
                         (b.splitCount < state.members.length && name === 'Imam') ||
                         (b.title && (b.title.includes('বুয়া') || b.title.includes('খালা') || b.title.toLowerCase().includes('bua') || b.title.toLowerCase().includes('cook')) && name === 'Imam');
      const share = isExcluded ? 0 : (Number(b.amount) / (b.splitCount || state.members.length || 1));
      utilityTotal += share;
    });

    return {
      name,
      meals,
      cashDeposit,
      sharedPaid,
      sharedCost: perMemberSharedCost,
      totalDeposit,
      mealCost,
      totalCost: totalMessCost,
      deposit: totalDeposit,
      foodBalance: cashDeposit - mealCost,
      sharedBalance,
      balance,
      utilityTotal,
      status: balance > 0.01 ? 'positive' : balance < -0.01 ? 'negative' : 'neutral'
    };
  });

  const totalFixed = (state.fixedBills || []).reduce((s, b) => s + (Number(b.amount) || 0), 0);
  const totalShared = totalSharedBazar;
  const settlementTransfers = computeSettlement(memberSummaries);

  return {
    totalCashDeposit,
    totalDeposit,
    totalBazar,
    totalFoodBazar,
    totalSharedBazar,
    remainingCash,
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
  const depDescEl = document.getElementById('kpiDepositDesc');
  if (depDescEl) {
    depDescEl.textContent = metrics.totalSharedBazar > 0
      ? `ক্যাশ ${formatBDT(metrics.totalCashDeposit)} + মেস সামগ্রী ${formatBDT(metrics.totalSharedBazar)}`
      : `${state.members.length} জন সদস্যের জমা`;
  }
  document.getElementById('kpiTotalBazar').textContent = formatBDT(metrics.totalBazar);
  document.getElementById('kpiBazarCount').textContent = `খাবার: ${formatBDT(metrics.totalFoodBazar)} • মেস সামগ্রী: ${formatBDT(metrics.totalSharedBazar)}`;
  
  const remEl = document.getElementById('kpiRemainingFund');
  const remCash = metrics.remainingCash !== undefined ? metrics.remainingCash : metrics.remainingFund;
  if (remEl) {
    remEl.textContent = formatBDT(remCash);
    remEl.classList.remove('balance-due', 'balance-surplus');
    if (remCash < 0) {
      remEl.classList.add('balance-due');
      remEl.style.color = '#dc2626';
    } else {
      remEl.classList.add('balance-surplus');
      remEl.style.color = '#0a0d14';
    }
  }
  const fundStatusEl = document.getElementById('kpiFundStatus');
  if (fundStatusEl) {
    fundStatusEl.textContent = remCash >= 0 
      ? 'ক্যাশের জমা থেকে খাবার বাজার সম্পন্ন' 
      : 'ঘাটতি (ফান্ডে অতিরিক্ত ক্যাশ লাগবে)';
  }

  document.getElementById('kpiMealRate').textContent = `৳${metrics.mealRate.toFixed(2)}`;
  document.getElementById('kpiRateFormula').textContent = `মোট ব্যয় ÷ ${metrics.totalMeals} মিল`;
  
  const billBanner = document.getElementById('kpiFixedBillsBannerText');
  if (billBanner) {
    billBanner.textContent = `মোট ${formatBDT(metrics.totalFixed)} →`;
  }
}

// Render Dashboard
function renderDashboard(metrics) {
  const container = document.getElementById('memberCardsGrid');
  container.innerHTML = '';

  metrics.memberSummaries.forEach(m => {
    const card = document.createElement('div');
    card.className = 'member-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('title', `ক্লিক করে ${m.name}-এর বিস্তারিত হিসাব দেখুন`);
    card.onclick = () => window.openMemberDetailsModal(m.name);

    const isPositive = m.balance > 0.01;
    const isNegative = m.balance < -0.01;

    // Overall Member Payment Status: Paid ONLY when EVERYTHING is paid (meals + fixed bills + shared supplies)
    const isMealPaid = m.balance >= -0.01;
    const hasFixedBills = (m.utilityTotal || 0) > 0;
    const isBillPaid = !hasFixedBills || (state.memberBillStatus && state.memberBillStatus[m.name] === 'Paid');
    const isSharedPaid = !state.memberSharedStatus || state.memberSharedStatus[m.name] !== 'Pending';

    // Must be completely paid with zero dues
    const isOverallPaid = isMealPaid && isBillPaid && isSharedPaid;
    const overallClass = isOverallPaid ? 'badge-green' : 'badge-red';
    const overallText = isOverallPaid ? 'Paid' : 'Pending';

    const pendingReasons = [];
    if (!isMealPaid) pendingReasons.push('খাবার ব্যালেন্স বকেয়া');
    if (!isBillPaid) pendingReasons.push('বাসা ভাড়া ও বিল বকেয়া');
    if (!isSharedPaid) pendingReasons.push('মেস সামগ্রী বকেয়া');
    const overallTooltip = isOverallPaid ? 'সকল হিসাব ও বিল পরিশোধিত (Paid)' : `বকেয়া: ${pendingReasons.join(', ')}`;

    const balanceText = isPositive
      ? `+ ৳${Math.round(m.balance).toLocaleString()}`
      : isNegative
        ? `- ৳${Math.round(Math.abs(m.balance)).toLocaleString()}`
        : `৳০`;

    const balanceClass = isPositive ? 'surplus' : isNegative ? 'due' : 'neutral';

    card.innerHTML = `
      <div class="member-card-head">
        <div class="member-info">
          <div class="member-avatar">${m.name.charAt(0)}</div>
          <div>
            <div class="member-name">${m.name}</div>
            <div class="member-meals-sub">${m.meals} মিল</div>
          </div>
        </div>
        <span class="badge ${overallClass}" style="font-weight: 800; font-size: 0.72rem; padding: 2px 8px;" title="${overallTooltip}">${overallText}</span>
      </div>

      <div class="member-balance-box">
        <span class="text-sm text-muted">${isPositive ? 'ফেরত পাবে' : isNegative ? 'দিতে হবে' : 'ব্যালেন্স'}</span>
        <span class="balance-num ${balanceClass}">${balanceText}</span>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--border-color); font-size: 0.75rem;">
        <span class="text-muted">জমা: <b class="mono" style="color:var(--text-main);">৳${Math.round(m.totalDeposit).toLocaleString()}</b></span>
        <span class="member-tap-hint">বিস্তারিত দেখুন →</span>
      </div>
    `;
    container.appendChild(card);
  });

  // Update Pill Buttons counts
  const pillBaz = document.getElementById('pillBazarBtn');
  if (pillBaz) {
    const totalBazarCount = (state.bazar ? state.bazar.length : 0) + (state.sharedItems ? state.sharedItems.length : 0);
    pillBaz.textContent = `🛒 বাজার (${totalBazarCount})`;
  }

  // Recent Bazar List (Modern Card Items - showing ALL bazar: Meal + Others)
  const recentContainer = document.getElementById('dashboardRecentBazar');
  if (recentContainer) {
    const foodEntries = (state.bazar || []).map(b => ({
      id: b.id,
      rawId: b.id,
      isSharedTableItem: (b.category === 'shared' || b.type === 'shared'),
      shopper: b.shopper || '',
      item: b.item || '',
      amount: Number(b.amount) || 0,
      date: b.date || 'October',
      category: (b.category === 'shared' || b.type === 'shared') ? 'shared' : 'food'
    }));

    const sharedEntries = (state.sharedItems || []).map((s, idx) => ({
      id: 'shared-' + (s.id || idx),
      rawId: s.id,
      isSharedTableItem: true,
      shopper: s.buyer || s.shopper || 'মেস',
      item: s.name || s.item || 'মেস সামগ্রী',
      amount: Number(s.price || s.amount) || 0,
      date: s.date || 'October',
      category: 'shared'
    }));

    const allBazarList = [...foodEntries, ...sharedEntries];
    allBazarList.sort((a, b) => {
      const dayA = parseInt(a.date, 10) || 0;
      const dayB = parseInt(b.date, 10) || 0;
      if (dayA !== dayB) return dayA - dayB;
      return String(a.rawId).localeCompare(String(b.rawId));
    });

    if (allBazarList.length === 0) {
      recentContainer.innerHTML = `
        <div class="text-center text-muted" style="padding: 20px; font-size: 0.85rem;">
          এখনো কোনো বাজার খরচ যোগ করা হয়নি
        </div>
      `;
    } else {
      const displayItems = allBazarList.slice(-10).reverse();
      recentContainer.innerHTML = displayItems.map(b => `
        <div class="tx-card-item">
          <div class="tx-card-left">
            <div class="tx-avatar-chip">${(b.shopper || 'মেস').charAt(0)}</div>
            <div class="tx-details">
              <div class="tx-title" style="display:flex; align-items:center; gap:6px;">
                <span>${b.item}</span>
                ${b.category === 'shared' 
                  ? `<span class="badge" style="background:rgba(192,132,252,0.15); color:#c084fc; font-size:0.65rem; padding:1px 5px;">🧴 মেস সামগ্রী</span>`
                  : `<span class="badge" style="background:rgba(212,249,56,0.12); color:var(--accent); font-size:0.65rem; padding:1px 5px;">🍚 খাবার</span>`}
              </div>
              <div class="tx-sub">
                <span><b>${b.shopper}</b></span> • <span>${b.date || 'October'}</span>
              </div>
            </div>
          </div>
          <div class="tx-card-right">
            <span class="tx-amount">৳${Number(b.amount).toLocaleString()}</span>
            ${isAdmin ? `
              <div class="tx-actions">
                <button class="btn-action-edit" onclick="openEditBazarModal('${b.rawId}', ${b.isSharedTableItem})" title="এডিট করুন">✏️</button>
                <button class="btn-action-delete" onclick="deleteBazar('${b.rawId}', ${b.isSharedTableItem})" title="মুছে ফেলুন">🗑️</button>
              </div>
            ` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // Fund Contribution Progress (Cash + Mess Supplies)
  const shopperList = document.getElementById('shopperProgressList');
  if (shopperList) {
    shopperList.innerHTML = '';
    const badgeEl = document.getElementById('bazarTotalBadge');
    if (badgeEl) badgeEl.textContent = `মোট জমা ${formatBDT(metrics.totalDeposit)}`;

    state.members.forEach(member => {
      const summary = metrics.memberSummaries.find(s => s.name === member);
      const totalContributed = summary ? summary.totalDeposit : (Number(state.deposits[member]) || 0);
      const pct = metrics.totalDeposit > 0 ? (totalContributed / metrics.totalDeposit * 100).toFixed(1) : 0;
      shopperList.innerHTML += `
        <div>
          <div class="shopper-item-meta">
            <span>
              <b>${member}</b>: ${formatBDT(totalContributed)}
              ${summary && summary.sharedPaid > 0 ? `<span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal;">(ক্যাশ ${formatBDT(summary.cashDeposit)} + মেস ${formatBDT(summary.sharedPaid)})</span>` : ''}
            </span>
            <span class="mono text-muted text-sm">${pct}%</span>
          </div>
          <div class="track-bar">
            <div class="track-fill" style="width: ${pct}%"></div>
          </div>
        </div>
      `;
    });
  }

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

  const daysInMonth = getDaysInMonthForState(state);
  const mLabel = state.monthBn || state.month || 'মাস';
  for (let day = 1; day <= daysInMonth; day++) {
    const dayLabel = `${day} ${mLabel}`;
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

  const categorySelect = document.getElementById('bazarCategoryFilter');
  const selectedCategory = categorySelect ? categorySelect.value : 'ALL';

  const foodEntries = (state.bazar || []).map(b => ({
    id: b.id,
    rawId: b.id,
    isSharedTableItem: (b.category === 'shared' || b.type === 'shared'),
    shopper: b.shopper || '',
    item: b.item || '',
    amount: Number(b.amount) || 0,
    date: b.date || 'October',
    category: (b.category === 'shared' || b.type === 'shared') ? 'shared' : 'food'
  }));

  const sharedEntries = (state.sharedItems || []).map((s, idx) => ({
    id: 'shared-' + (s.id || idx),
    rawId: s.id,
    isSharedTableItem: true,
    shopper: s.buyer || s.shopper || 'মেস',
    item: s.name || s.item || 'মেস সামগ্রী',
    amount: Number(s.price || s.amount) || 0,
    date: s.date || 'October',
    category: 'shared'
  }));

  const allEntries = [...foodEntries, ...sharedEntries];
  allEntries.sort((a, b) => {
    const dayA = parseInt(a.date, 10) || 0;
    const dayB = parseInt(b.date, 10) || 0;
    if (dayA !== dayB) return dayA - dayB;
    return String(a.rawId).localeCompare(String(b.rawId));
  });

  let filtered = allEntries.filter(b => {
    if (selectedShopper !== 'all' && b.shopper !== selectedShopper) return false;
    if (selectedCategory === 'food' && b.category !== 'food') return false;
    if (selectedCategory === 'shared' && b.category !== 'shared') return false;
    if (search && !b.item.toLowerCase().includes(search) && !b.shopper.toLowerCase().includes(search)) return false;
    return true;
  });

  const totalFiltered = filtered.reduce((s, b) => s + (Number(b.amount) || 0), 0);
  document.getElementById('bazarFilteredCount').innerHTML = `ফিল্টারকৃত (${filtered.length}টি): <b>${formatBDT(totalFiltered)}</b>`;
  document.getElementById('bazarFooterTotal').textContent = formatBDT(totalFiltered);

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted" style="padding: 24px;">কোনো বাজার বা সামগ্রী খরচ পাওয়া যায়নি</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map((b, idx) => `
    <tr>
      <td class="mono text-muted">${idx + 1}</td>
      <td><b>${b.shopper}</b></td>
      <td>
        ${b.item} 
        ${b.category === 'shared' 
          ? `<span class="badge" style="background:rgba(192,132,252,0.15); color:#c084fc; font-size:0.65rem; padding:1px 5px;">🧴 মেস সামগ্রী</span>`
          : `<span class="badge" style="background:rgba(212,249,56,0.12); color:var(--accent); font-size:0.65rem; padding:1px 5px;">🍚 খাবার</span>`}
        <span class="text-dim text-sm">(${b.date || 'October'})</span>
      </td>
      <td class="text-right mono"><b>${formatBDT(b.amount)}</b></td>
      <td class="text-center admin-only-cell" style="display: ${isAdmin ? 'table-cell' : 'none'};">
        <div style="display: inline-flex; gap: 4px; align-items: center; justify-content: center;">
          <button class="btn-action-edit" onclick="openEditBazarModal('${b.rawId}', ${b.isSharedTableItem})" title="এডিট করুন">✏️</button>
          <button class="btn-action-delete" onclick="deleteBazar('${b.rawId}', ${b.isSharedTableItem})" title="মুছে ফেলুন">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.deleteBazar = function(id, isShared = false) {
  if (!isAdmin) return;
  let item = state.bazar.find(b => String(b.id) === String(id));
  let isSharedItem = isShared || (item && (item.category === 'shared' || item.type === 'shared'));
  
  if (!item && state.sharedItems) {
    const s = state.sharedItems.find(s => String(s.id) === String(id));
    if (s) {
      item = { item: s.name, amount: s.price };
      isSharedItem = true;
    }
  }
  
  const desc = item ? `"${item.item}" (${formatBDT(item.amount)})` : 'এই খরচটি';
  if (confirm(`আপনি কি নিশ্চিতভাবে ${desc} মুছে ফেলতে চান?`)) {
    if (isSharedItem && state.sharedItems) {
      state.sharedItems = state.sharedItems.filter(s => String(s.id) !== String(id));
    }
    state.bazar = state.bazar.filter(b => String(b.id) !== String(id));
    saveState();
    renderAll();
    showToast('খরচ সফলভাবে মুছে ফেলা হয়েছে');
  }
};

window.openEditBazarModal = function(id, isShared = false) {
  if (!isAdmin) {
    showToast('শুধুমাত্র এডমিন এডিট করতে পারবেন');
    return;
  }
  let item = state.bazar.find(b => String(b.id) === String(id));
  let isSharedItem = isShared;
  if (!item && state.sharedItems) {
    const s = state.sharedItems.find(s => String(s.id) === String(id));
    if (s) {
      item = {
        id: s.id,
        shopper: s.buyer,
        item: s.name,
        amount: s.price,
        date: s.date || 'October',
        category: 'shared'
      };
      isSharedItem = true;
    }
  }
  if (!item) {
    showToast('বাজার খরচ পাওয়া যায়নি');
    return;
  }
  document.getElementById('editBazarId').value = item.id;
  const shopperSelect = document.getElementById('editBazarShopperSelect');
  shopperSelect.innerHTML = state.members.map(m => `<option value="${m}" ${m === item.shopper ? 'selected' : ''}>${m}</option>`).join('');
  document.getElementById('editBazarDateInput').value = item.date || '';
  document.getElementById('editBazarItemInput').value = item.item || '';
  document.getElementById('editBazarAmountInput').value = item.amount || '';
  const catSelect = document.getElementById('editBazarCategorySelect');
  if (catSelect) {
    catSelect.value = (isSharedItem || item.category === 'shared' || item.type === 'shared') ? 'shared' : 'food';
  }

  const modal = document.getElementById('editBazarModal');
  if (modal) modal.classList.add('open');
};

window.openEditDepositModal = function(id) {
  if (!isAdmin) {
    showToast('শুধুমাত্র এডমিন এডিট করতে পারবেন');
    return;
  }
  ensureDepositHistory(state);
  const entry = state.depositHistory.find(d => String(d.id) === String(id));
  if (!entry) {
    showToast('জমা এন্ট্রি পাওয়া যায়নি');
    return;
  }
  document.getElementById('editDepositId').value = entry.id;
  const memberSelect = document.getElementById('editDepositMemberSelect');
  memberSelect.innerHTML = state.members.map(m => `<option value="${m}" ${m === entry.member ? 'selected' : ''}>${m}</option>`).join('');
  document.getElementById('editDepositAmountInput').value = entry.amount || '';
  document.getElementById('editDepositDateInput').value = entry.date || '';
  document.getElementById('editDepositNoteInput').value = entry.note || '';

  const modal = document.getElementById('editDepositModal');
  if (modal) modal.classList.add('open');
};

// Render Utilities
function renderUtilities(metrics) {
  if (!state.fixedBills) state.fixedBills = [];
  if (!state.memberBillStatus) state.memberBillStatus = {};

  // 1. Calculate Per-Member Bill Shares & Totals
  const memberBills = {};
  state.members.forEach(m => {
    memberBills[m] = {
      shares: {},
      total: 0
    };
  });

  state.fixedBills.forEach(b => {
    state.members.forEach(m => {
      const isExcluded = (b.note && b.note.includes('৩ জনের') && m === 'Imam') ||
                         (b.splitCount < state.members.length && m === 'Imam') ||
                         (b.title && (b.title.includes('বুয়া') || b.title.includes('খালা') || b.title.toLowerCase().includes('bua') || b.title.toLowerCase().includes('cook')) && m === 'Imam');
      const share = isExcluded ? 0 : (Number(b.amount) / (b.splitCount || state.members.length || 1));
      memberBills[m].shares[b.id] = {
        amount: share,
        isExcluded
      };
      memberBills[m].total += share;
    });
  });

  // Calculate Collection Statistics
  let paidCount = 0;
  let pendingCount = 0;
  let paidAmount = 0;
  let pendingAmount = 0;
  const totalFixed = state.fixedBills.reduce((s, b) => s + (Number(b.amount) || 0), 0);

  state.members.forEach(m => {
    const status = state.memberBillStatus[m] || 'Pending';
    if (status === 'Paid') {
      paidCount++;
      paidAmount += memberBills[m].total;
    } else {
      pendingCount++;
      pendingAmount += memberBills[m].total;
    }
  });

  const collectionPct = totalFixed > 0 ? Math.round((paidAmount / totalFixed) * 100) : 0;

  // 2. Render Collection Banner
  const bannerEl = document.getElementById('utilityCollectionBanner');
  if (bannerEl) {
    bannerEl.innerHTML = `
      <section class="stats-row" style="margin-bottom: 12px;">
        <div class="stat-card">
          <span class="stat-label">মোট ফিক্সড বিল</span>
          <div class="stat-value mono" style="color:var(--text-main);">৳${Math.round(totalFixed).toLocaleString()}</div>
          <span class="stat-desc">${state.members.length} জন সদস্যের সর্বমোট বিল</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">পরিশোধিত (Collected)</span>
          <div class="stat-value mono" style="color:var(--success);">৳${Math.round(paidAmount).toLocaleString()}</div>
          <span class="stat-desc">${paidCount} জন পরিশোধ করেছেন (${collectionPct}%)</span>
        </div>
        <div class="stat-card">
          <span class="stat-label">বকেয়া (Pending)</span>
          <div class="stat-value mono" style="color:${pendingCount > 0 ? 'var(--danger)' : 'var(--text-muted)'};">৳${Math.round(pendingAmount).toLocaleString()}</div>
          <span class="stat-desc">${pendingCount} জনের বাকি আছে</span>
        </div>
      </section>

      <div style="background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:10px 14px; margin-bottom: 20px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; font-size:0.8rem;">
          <span><b>বিল আদায় অগ্রগতি:</b> ${collectionPct}% সম্পন্ন (${paidCount}/${state.members.length} জন পরিশোধিত)</span>
          <span class="mono" style="color:${pendingAmount > 0 ? 'var(--danger)' : 'var(--success)'}; font-weight:700;">
            ${pendingAmount > 0 ? `বাকি ৳${Math.round(pendingAmount).toLocaleString()}` : 'সব পরিশোধিত 🎉'}
          </span>
        </div>
        <div class="track-bar" style="height:8px;">
          <div class="track-fill" style="width:${collectionPct}%; background:${collectionPct === 100 ? 'var(--success)' : 'var(--accent)'};"></div>
        </div>
      </div>
    `;
  }

  // 3. Render Master Member Bill Matrix Table
  const matrixTable = document.getElementById('memberUtilityMatrixTable');
  if (matrixTable) {
    matrixTable.innerHTML = `
      <thead>
        <tr>
          <th style="min-width: 120px;">সদস্য</th>
          ${state.fixedBills.map(b => {
            let short = b.title.split('(')[0].trim();
            return `<th class="text-right" style="min-width: 90px;">${short}</th>`;
          }).join('')}
          <th class="text-right" style="min-width: 110px;">মোট প্রদেয়</th>
          <th class="text-center" style="width: 100px;">স্ট্যাটাস</th>
        </tr>
      </thead>
      <tbody>
        ${state.members.map(m => {
          const mb = memberBills[m];
          const bStatus = state.memberBillStatus[m] || 'Pending';
          const isPaid = bStatus === 'Paid';
          const bClass = isPaid ? 'badge-green' : 'badge-red';
          const bText = isPaid ? 'Paid' : 'Pending';

          const statusBtn = isAdmin ? `
            <button class="badge ${bClass}" style="cursor: pointer; border: none; font-size: 0.68rem; padding: 2px 7px;" onclick="toggleMemberBillStatus('${m}')" title="ক্লিক করে স্ট্যাটাস পরিবর্তন করুন (Paid / Pending)">
              ${bText} ⟳
            </button>
          ` : `
            <span class="badge ${bClass}" style="font-size: 0.68rem; padding: 2px 7px;">${bText}</span>
          `;

          const billCells = state.fixedBills.map(b => {
            const item = mb.shares[b.id];
            if (item && item.isExcluded) {
              return `<td class="text-right" style="color:var(--text-muted); font-size:0.75rem;">৳০ <span style="font-size:0.65rem; color:#38bdf8;">(মুক্ত)</span></td>`;
            }
            return `<td class="text-right mono">৳${Math.round(item ? item.amount : 0).toLocaleString()}</td>`;
          }).join('');

          return `
            <tr>
              <td>
                <div style="display:flex; align-items:center; gap:8px;">
                  <div class="member-avatar" style="width:26px; height:26px; font-size:0.75rem;">${m.charAt(0)}</div>
                  <b>${m}</b>
                </div>
              </td>
              ${billCells}
              <td class="text-right mono" style="font-weight:800; font-size:0.95rem; color:#38bdf8;">
                ৳${Math.round(mb.total).toLocaleString()}
              </td>
              <td class="text-center">${statusBtn}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
      <tfoot>
        <tr style="background: rgba(255,255,255,0.03);">
          <th>
            <div style="font-weight: 700; color: var(--text-main);">সর্বমোট খাত খরচ</div>
            <div class="text-muted text-xs" style="font-weight: normal;">মূল বিলের মোট অংক</div>
          </th>
          ${state.fixedBills.map(b => `
            <th class="text-right" style="vertical-align: top;">
              <div class="mono" style="font-weight: 800; font-size: 0.95rem; color: var(--text-main);">
                ৳${Number(b.amount).toLocaleString()}
              </div>
              <div class="text-muted text-xs" style="font-weight: normal; margin-top: 2px;">
                ${b.splitCount || state.members.length} জনের ভাগ
              </div>
              ${isAdmin ? `
                <div style="display: inline-flex; gap: 4px; margin-top: 6px; align-items: center; justify-content: flex-end;">
                  <button class="btn-action-edit" onclick="openEditBillModal('${b.id}')" title="এডিট করুন" style="padding: 2px 6px; font-size: 0.75rem;">✏️</button>
                  <button class="btn-action-delete" onclick="deleteBill('${b.id}')" title="মুছে ফেলুন" style="padding: 2px 6px; font-size: 0.75rem;">🗑️</button>
                </div>
              ` : ''}
            </th>
          `).join('')}
          <th class="text-right mono" style="font-weight: 800; color: #38bdf8; font-size: 1.05rem; vertical-align: top;">
            ৳${Math.round(totalFixed).toLocaleString()}
            <div class="text-muted text-xs" style="font-weight: normal; margin-top: 2px;">
              মাথাপিছু ~৳${Math.round(totalFixed / (state.members.length || 1)).toLocaleString()}
            </div>
          </th>
          <th class="text-center" style="font-size: 0.75rem; color: var(--text-muted); vertical-align: middle;">
            <span class="badge ${paidCount === state.members.length ? 'badge-green' : 'badge-subtle'}">
              ${paidCount}/${state.members.length} Paid
            </span>
          </th>
        </tr>
      </tfoot>
    `;
  }

  // 4. Render Member Individual Slips (memberUtilityGrid)
  const memberGrid = document.getElementById('memberUtilityGrid');
  if (memberGrid) {
    memberGrid.innerHTML = state.members.map(m => {
      const mb = memberBills[m];
      const bStatus = state.memberBillStatus[m] || 'Pending';
      const isPaid = bStatus === 'Paid';
      const bClass = isPaid ? 'badge-green' : 'badge-red';
      const bText = isPaid ? 'Paid' : 'Pending';

      const statusBtn = isAdmin ? `
        <button class="badge ${bClass}" style="cursor: pointer; border: none; font-size: 0.72rem; padding: 2px 8px;" onclick="toggleMemberBillStatus('${m}')" title="ক্লিক করে স্ট্যাটাস পরিবর্তন করুন (Paid / Pending)">
          ${bText} ⟳
        </button>
      ` : `
        <span class="badge ${bClass}" style="font-size: 0.72rem; padding: 2px 8px;">${bText}</span>
      `;

      const lineItems = state.fixedBills.map(b => {
        const item = mb.shares[b.id];
        let icon = '🏠';
        const tLower = (b.title || '').toLowerCase();
        if (tLower.includes('wifi') || tLower.includes('ওয়াইফাই') || tLower.includes('নেট')) icon = '📶';
        else if (tLower.includes('বুয়া') || tLower.includes('খালা') || tLower.includes('cook')) icon = '🧹';
        else if (tLower.includes('বিদ্যুৎ') || tLower.includes('কারেন্ট') || tLower.includes('electric')) icon = '⚡';
        else if (tLower.includes('গ্যাস') || tLower.includes('পানি') || tLower.includes('gas') || tLower.includes('water')) icon = '💧';

        if (item && item.isExcluded) {
          return `
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="text-muted">${icon} ${b.title.split('(')[0].trim()}:</span>
              <span class="mono" style="color:var(--text-muted);">৳০ <span class="badge" style="font-size:0.62rem; padding:1px 4px; color:#38bdf8;">মুক্ত</span></span>
            </div>
          `;
        }
        return `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="text-muted">${icon} ${b.title.split('(')[0].trim()}:</span>
            <span class="mono" style="font-weight:600;">৳${Math.round(item ? item.amount : 0).toLocaleString()}</span>
          </div>
        `;
      }).join('');

      return `
        <div class="card" style="padding: 16px; border-radius: var(--radius-lg); background: var(--bg-card); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid var(--border-color);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="member-avatar" style="width: 36px; height: 36px; font-weight: 800;">${m.charAt(0)}</div>
                <div>
                  <div style="font-weight: 700; font-size: 1rem;">${m}</div>
                  <span class="text-muted text-sm" style="font-size: 0.72rem;">মাসিক ইউটিলিটি স্লিপ</span>
                </div>
              </div>
              <div>${statusBtn}</div>
            </div>

            <div style="display: flex; flex-direction: column; gap: 7px; font-size: 0.84rem;">
              ${lineItems}
            </div>
          </div>

          <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border-color); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span class="text-muted" style="font-size: 0.72rem; display: block;">মোট প্রদেয় বিল</span>
              <span class="mono" style="font-size: 1.15rem; font-weight: 800; color: #38bdf8;">
                ৳${Math.round(mb.total).toLocaleString()}
              </span>
            </div>
            <button type="button" class="btn btn-outline btn-sm" onclick="copyMemberBillSlip('${m}')" style="font-size: 0.75rem; padding: 4px 9px;" title="হোয়াটসঅ্যাপে পাঠানোর জন্য এই মেম্বারের বিল স্লিপ কপি করুন">
              📋 স্লিপ কপি
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // 5. Render Shared Items Table
  renderSharedItems();
}

window.toggleMemberBillStatus = function(memberName) {
  if (!isAdmin) {
    showToast('শুধুমাত্র এডমিন স্ট্যাটাস পরিবর্তন করতে পারবেন');
    return;
  }
  if (!state.memberBillStatus) state.memberBillStatus = {};
  const current = state.memberBillStatus[memberName] || 'Pending';
  const next = current === 'Paid' ? 'Pending' : 'Paid';
  state.memberBillStatus[memberName] = next;
  saveState();
  renderAll();
  showToast(`${memberName}-এর ভাড়া ও বিল: ${next === 'Paid' ? 'পরিশোধিত (Paid)' : 'বকেয়া (Due)'}`);
};

window.toggleMemberOverallStatus = function(memberName) {
  if (!isAdmin) {
    showToast('শুধুমাত্র এডমিন স্ট্যাটাস পরিবর্তন করতে পারবেন');
    return;
  }
  const metrics = calculateMetrics();
  const summary = metrics.memberSummaries.find(x => x.name === memberName);
  if (!summary) return;

  const isMealPaid = summary.balance >= -0.01;
  const hasFixedBills = (summary.utilityTotal || 0) > 0;
  const isBillPaid = !hasFixedBills || (state.memberBillStatus && state.memberBillStatus[memberName] === 'Paid');
  const isSharedPaid = !state.memberSharedStatus || state.memberSharedStatus[memberName] !== 'Pending';
  const isAllPaid = isMealPaid && isBillPaid && isSharedPaid;

  if (!state.memberBillStatus) state.memberBillStatus = {};
  if (!state.memberSharedStatus) state.memberSharedStatus = {};

  if (!isAllPaid) {
    // Mark all fixed bills and shared as Paid
    state.memberBillStatus[memberName] = 'Paid';
    state.memberSharedStatus[memberName] = 'Paid';
    showToast(`${memberName}-এর সকল বিল পরিশোধিত (Paid) করা হয়েছে`);
  } else {
    // Toggle fixed bills to Pending
    state.memberBillStatus[memberName] = 'Pending';
    showToast(`${memberName}-এর বিল বকেয়া (Pending) করা হয়েছে`);
  }

  saveState();
  renderAll();
};

window.toggleMemberSharedStatus = function(memberName) {
  if (!isAdmin) {
    showToast('শুধুমাত্র এডমিন স্ট্যাটাস পরিবর্তন করতে পারবেন');
    return;
  }
  if (!state.memberSharedStatus) state.memberSharedStatus = {};
  const current = state.memberSharedStatus[memberName] || 'Pending';
  const next = current === 'Paid' ? 'Pending' : 'Paid';
  state.memberSharedStatus[memberName] = next;
  saveState();
  renderAll();
  showToast(`${memberName}-এর মেস সামগ্রী: ${next === 'Paid' ? 'পরিশোধিত (Paid)' : 'বকেয়া (Due)'}`);
};

window.toggleBillStatus = function(id) {
  if (!isAdmin) return;
  const bill = state.fixedBills.find(b => b.id === id);
  if (bill) {
    bill.status = bill.status === 'Paid' ? 'Pending' : 'Paid';
    saveState();
    showToast(`স্ট্যাটাস পরিবর্তন হয়েছে: ${bill.status === 'Paid' ? 'পরিশোধিত' : 'বকেয়া'}`);
  }
};

window.deleteBill = function(id) {
  if (!isAdmin) {
    showToast('শুধুমাত্র এডমিন ডিলিট করতে পারবেন');
    return;
  }
  const bill = state.fixedBills.find(b => String(b.id) === String(id));
  const desc = bill ? `"${bill.title}" (${formatBDT(bill.amount)})` : 'এই বিলটি';
  if (confirm(`আপনি কি নিশ্চিতভাবে ${desc} মুছে ফেলতে চান?`)) {
    state.fixedBills = state.fixedBills.filter(b => String(b.id) !== String(id));
    saveState();
    renderAll();
    showToast('মাসিক বিল সফলভাবে মুছে ফেলা হয়েছে');
  }
};

window.openEditBillModal = function(id) {
  if (!isAdmin) {
    showToast('শুধুমাত্র এডমিন এডিট করতে পারবেন');
    return;
  }
  const bill = state.fixedBills.find(b => String(b.id) === String(id));
  if (!bill) {
    showToast('বিল খুঁজে পাওয়া যায়নি');
    return;
  }
  document.getElementById('billIdInput').value = bill.id;
  document.getElementById('billModalHeading').textContent = '✏️ মাসিক বিল এডিট করুন';
  document.getElementById('billTitleInput').value = bill.title || '';
  document.getElementById('billAmountInput').value = bill.amount || '';
  document.getElementById('billSplitCount').value = bill.splitCount || state.members.length;
  document.getElementById('billStatusSelect').value = bill.status || 'Paid';
  document.getElementById('billNoteInput').value = bill.note || '';

  const modal = document.getElementById('billModal');
  if (modal) modal.classList.add('open');
};


function renderSharedItems() {
  const tbody = document.getElementById('sharedItemsBody');
  const totalEl = document.getElementById('sharedItemsTotal');
  if (!state.sharedItems) state.sharedItems = [];

  const total = state.sharedItems.reduce((acc, cur) => acc + Number(cur.price || 0), 0);
  if (totalEl) totalEl.textContent = `মোট: ${formatBDT(total)}`;

  if (!tbody) return;

  if (state.sharedItems.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted" style="padding: 20px;">কোনো মেস সামগ্রী খরচের রেকর্ড নেই</td></tr>';
    return;
  }

  const perPerson = state.members.length > 0 ? (total / state.members.length) : 0;

  tbody.innerHTML = state.sharedItems.map(item => `
    <tr>
      <td><b>${item.name}</b></td>
      <td><span class="badge badge-subtle">${item.buyer}</span></td>
      <td class="text-right mono">${formatBDT(item.price)}</td>
      <td class="text-right mono">~${formatBDT(perPerson)}</td>
      <td class="text-center admin-only-cell" style="display: ${isAdmin ? 'table-cell' : 'none'};">
        <button class="btn-action-delete" onclick="deleteSharedItem(${item.id})" title="মুছে ফেলুন">🗑️</button>
      </td>
    </tr>
  `).join('');
}

function renderDashboardBills() {
  const container = document.getElementById('dashboardBillsContainer');
  if (!container) return;

  const bills = state.fixedBills || [];

  const pillBills = document.getElementById('pillBillsBtn');
  if (pillBills) {
    pillBills.textContent = `🏠 ভাড়া ও বিল (${bills.length})`;
  }

  if (bills.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted" style="padding: 28px 16px; font-size: 0.88rem;">
        কোনো স্থায়ী বিল যোগ করা হয়নি<br>
        ${isAdmin ? '<button class="btn btn-primary btn-sm" style="margin-top: 10px;" onclick="window.openBillModalGlobal && window.openBillModalGlobal()">+ নতুন বিল যোগ করুন</button>' : ''}
      </div>
    `;
    return;
  }

  container.innerHTML = bills.map(b => {
    let icon = '🏠';
    const tLower = (b.title || '').toLowerCase();
    if (tLower.includes('wifi') || tLower.includes('ওয়াইফাই') || tLower.includes('নেট')) icon = '📶';
    else if (tLower.includes('বুয়া') || tLower.includes('খালা') || tLower.includes('cook')) icon = '🧹';
    else if (tLower.includes('বিদ্যুৎ') || tLower.includes('কারেন্ট') || tLower.includes('electric')) icon = '⚡';
    else if (tLower.includes('গ্যাস') || tLower.includes('পানি') || tLower.includes('gas') || tLower.includes('water')) icon = '💧';

    const avg = Number(b.amount) / (b.splitCount || state.members.length || 1);
    const statusClass = b.status === 'Paid' ? 'badge-green' : 'badge-red';
    const statusText = b.status === 'Paid' ? 'Paid' : 'Pending';

    return `
      <div class="tx-card-item">
        <div class="tx-card-left">
          <div class="tx-avatar-chip" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">${icon}</div>
          <div class="tx-details">
            <div class="tx-title">
              <b>${b.title}</b>
              <span class="badge ${statusClass}" style="margin-left: 6px; font-size: 0.65rem; padding: 1px 6px;">${statusText}</span>
            </div>
            <div class="tx-sub">
              <span>মাথাপিছু ভাগ: ~${formatBDT(avg)}</span>
              ${b.note ? `<span>• ${b.note}</span>` : ''}
            </div>
          </div>
        </div>
        <div class="tx-card-right">
          <span class="tx-amount" style="font-weight: 800;">${formatBDT(b.amount)}</span>
          ${isAdmin ? `
            <div class="tx-actions">
              <button class="btn-action-edit" onclick="openEditBillModal(${b.id})" title="এডিট করুন">✏️</button>
              <button class="btn-action-delete" onclick="deleteBill(${b.id})" title="মুছে ফেলুন">🗑️</button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

window.deleteSharedItem = function(id) {
  if (!isAdmin) return;
  if (confirm('আপনি কি এই সামগ্রীর খরচ মুছে ফেলতে চান?')) {
    state.sharedItems = (state.sharedItems || []).filter(item => String(item.id) !== String(id));
    saveState();
    renderAll();
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

  // Detail Table (Meal + Others Cost Comprehensive Breakdown)
  const tbody = document.getElementById('settlementDetailBody');
  if (tbody) {
    tbody.innerHTML = metrics.memberSummaries.map(m => {
      const isPositive = m.balance > 0.01;
      const isNegative = m.balance < -0.01;
      const statusBadge = isPositive 
        ? `<span class="badge badge-green">পাবেন</span>` 
        : isNegative 
          ? `<span class="badge badge-red">দিতে হবে</span>` 
          : `<span class="badge">ক্লিয়ার</span>`;

      return `
        <tr>
          <td><b>${m.name}</b></td>
          <td class="text-center mono"><b>${m.meals}</b></td>
          <td class="text-right mono">৳${Math.round(m.cashDeposit).toLocaleString()}</td>
          <td class="text-right mono">৳${Math.round(m.mealCost).toLocaleString()}</td>
          <td class="text-right mono" style="color:#a855f7;">${m.sharedPaid > 0 ? `+৳${Math.round(m.sharedPaid).toLocaleString()}` : '৳০'}</td>
          <td class="text-right mono text-muted">-৳${Math.round(m.sharedCost).toLocaleString()}</td>
          <td class="text-right mono ${m.status}" style="font-weight:700;">
            ${formatBDT(m.balance, true)}
          </td>
          <td class="text-right mono" style="color:#38bdf8; font-weight:600;">
            ৳${Math.round(m.utilityTotal).toLocaleString()} ${m.name === 'Imam' ? '<span style="font-size:0.65rem;">(বুয়া মুক্ত)</span>' : ''}
          </td>
          <td class="text-center">${statusBadge}</td>
        </tr>
      `;
    }).join('');
  }

  generateWhatsAppSummary(metrics);
}

let currentWaMode = 'minimal';
let lastCalculatedMetrics = null;

function setWhatsAppReportMode(mode) {
  currentWaMode = mode;
  document.querySelectorAll('.wa-mode-toggle').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === mode);
  });
  if (lastCalculatedMetrics) {
    generateWhatsAppSummary(lastCalculatedMetrics, currentWaMode);
  }
}
window.setWhatsAppReportMode = setWhatsAppReportMode;

function generateWhatsAppSummary(metrics, mode = currentWaMode) {
  lastCalculatedMetrics = metrics;
  const monthTitle = state.monthBn || state.month;
  let msg = '';

  if (mode === 'minimal') {
    // Ultra Clean, Short & Minimal Summary (Default)
    msg += `📋 *মেস সামারি • ${monthTitle}*\n`;
    msg += `📊 মিল রেট: *৳${metrics.mealRate.toFixed(2)}* (মোট ${metrics.totalMeals} মিল)\n`;
    msg += `─────────────────────\n`;
    
    // Member balances (One clean line per member)
    msg += `👥 *সদস্যদের চূড়ান্ত হিসাব:*\n`;
    metrics.memberSummaries.forEach(m => {
      const bal = Math.round(m.balance);
      const sign = bal > 0 ? `+৳${bal.toLocaleString()}` : bal < 0 ? `-৳${Math.abs(bal).toLocaleString()}` : `৳০`;
      const status = bal > 0 ? `ফেরত পাবে ${sign}` : bal < 0 ? `দিতে হবে ${sign}` : `ব্যালেন্স ৳০`;
      msg += `• *${m.name}*: ${m.meals} মিল ➔ *${status}*\n`;
    });
    
    // Direct transfers
    msg += `─────────────────────\n`;
    msg += `🤝 *সরাসরি লেনদেন:*\n`;
    if (metrics.settlementTransfers && metrics.settlementTransfers.length > 0) {
      metrics.settlementTransfers.forEach(t => {
        msg += `👉 *${t.from}* দেবে ➔ *${t.to}*-কে: *৳${Math.round(t.amount).toLocaleString()}*\n`;
      });
    } else {
      msg += `সব হিসাব ক্লিয়ার! ✅\n`;
    }
    msg += `─────────────────────\n`;
    msg += `_মিল ট্র্যাকার (Meal Tracker)_`;
  } else {
    // Detailed full breakdown
    msg += `📋 *মিল ট্র্যাকার (Meal Tracker) - পূর্ণাঙ্গ মেস রিপোর্ট*\n`;
    msg += `🗓️ *মাস:* ${monthTitle}\n`;
    msg += `────────────────────────\n\n`;

    // 1. MEAL REPORT
    msg += `🍚 *[ ১. খাবারের মিল হিসাব ]*\n`;
    msg += `• মোট খাবার বাজার: ৳${metrics.totalFoodBazar.toFixed(2)}\n`;
    msg += `• মোট মিল: ${metrics.totalMeals} টি\n`;
    msg += `• মিল রেট: ৳${metrics.mealRate.toFixed(2)}\n`;
    msg += `• সদস্যভিত্তিক মিল:\n`;
    metrics.memberSummaries.forEach(m => {
      msg += `  ▫️ *${m.name}*: ${m.meals} মিল | খাবার খরচ: ৳${Math.round(m.mealCost)} | ক্যাশ জমা: ৳${Math.round(m.cashDeposit)}\n`;
    });
    msg += `\n`;

    // 2. OTHERS COST REPORT
    msg += `🧴 *[ ২. অন্যান্য খরচ (মেস সামগ্রী ও বিল) ]*\n`;
    msg += `• মেস সামগ্রী মোট: ৳${metrics.totalSharedBazar.toFixed(2)} (মাথাপিছু ৳${(metrics.totalSharedBazar / (state.members.length || 1)).toFixed(2)})\n`;
    metrics.memberSummaries.forEach(m => {
      if (m.sharedPaid > 0) {
        msg += `  ▫️ *${m.name}* সামগ্রী কিনেছেন: ৳${Math.round(m.sharedPaid)}\n`;
      }
    });
    msg += `• মাসিক স্থায়ী বিল (ভাড়া ও ইউটিলিটি):\n`;
    (state.fixedBills || []).forEach(b => {
      msg += `  ▫️ ${b.title}: ৳${Number(b.amount).toLocaleString()} (${b.splitCount || state.members.length} জনের ভাগ)\n`;
    });
    msg += `• সদস্যভিত্তিক বিল অংশ:\n`;
    metrics.memberSummaries.forEach(m => {
      msg += `  ▫️ *${m.name}*: ৳${Math.round(m.utilityTotal)} ${m.name === 'Imam' ? '(বুয়া বিল বাদে)' : ''}\n`;
    });
    msg += `\n`;

    // 3. FINAL NET STATUS
    msg += `📊 *[ ৩. মেসের চূড়ান্ত ব্যালেন্স (খাবার+সামগ্রী) ]*\n`;
    metrics.memberSummaries.forEach(m => {
      const statusText = m.balance > 0.01 
        ? `ফেরত পাবেন +৳${m.balance.toFixed(2)}` 
        : m.balance < -0.01 
          ? `দিতে হবে -৳${Math.abs(m.balance).toFixed(2)}` 
          : `ব্যালেন্স ৳০`;
      msg += `• *${m.name}*: ${statusText}\n`;
    });

    // 4. TRANSFERS
    msg += `\n🤝 *[ ৪. সরাসরি লেনদেন নির্দেশিকা ]*\n`;
    if (metrics.settlementTransfers.length > 0) {
      metrics.settlementTransfers.forEach(t => {
        msg += `👉 *${t.from}* দেবেন ➔ *${t.to}*-কে ৳${t.amount.toFixed(2)}\n`;
      });
    } else {
      msg += `সব হিসাব ক্লিয়ার! ✅\n`;
    }
    msg += `────────────────────────\n`;
    msg += `_মিল ট্র্যাকার (Meal Tracker) দ্বারা জেনারেট করা।_`;
  }

  const previewEl = document.getElementById('whatsAppTextPreview');
  if (previewEl) previewEl.textContent = msg;
  const linkEl = document.getElementById('openWhatsAppLink');
  if (linkEl) linkEl.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
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
  const cloudIndicator = document.getElementById('cloudSyncIndicator');
  if (cloudIndicator) cloudIndicator.style.display = isAdmin ? 'inline-flex' : 'none';

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

function renderMonthSwitcher() {
  const select = document.getElementById('monthSelectDropdown');
  const prevBtn = document.getElementById('prevMonthBtn');
  const nextBtn = document.getElementById('nextMonthBtn');
  const currentMonthLabel = document.getElementById('currentMonthLabel');

  if (currentMonthLabel) {
    currentMonthLabel.textContent = `${state.monthBn || state.month} • স্মার্ট মেস ও মিল খাতা`;
  }

  if (!select) return;

  allMonths.sort((a, b) => a.id.localeCompare(b.id));

  select.innerHTML = allMonths.map(m => `
    <option value="${m.id}" ${m.id === currentMonthId ? 'selected' : ''}>
      ${m.label || m.name}
    </option>
  `).join('');

  const currentIndex = allMonths.findIndex(m => m.id === currentMonthId);
  if (prevBtn) prevBtn.disabled = currentIndex <= 0;
  if (nextBtn) nextBtn.disabled = currentIndex >= allMonths.length - 1;
}

function updateQuickDaySelect() {
  const select = document.getElementById('quickDaySelect');
  if (!select) return;
  const currentVal = parseInt(select.value, 10) || 1;
  const daysInMonth = getDaysInMonthForState(state);
  select.innerHTML = Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => `
    <option value="${d}" ${d === currentVal ? 'selected' : ''}>${d} তারিখ</option>
  `).join('');
}

window.deleteCurrentMonth = function() {
  if (!isAdmin) {
    showToast('শুধুমাত্র এডমিন মাস ডিলিট করতে পারবেন');
    return;
  }
  if (allMonths.length <= 1) {
    showToast('কমপক্ষে একটি মাস থাকা আবশ্যক, এটি মুছা যাবে না');
    return;
  }
  const currentMeta = allMonths.find(m => m.id === currentMonthId);
  const name = currentMeta ? (currentMeta.label || currentMeta.name) : currentMonthId;
  if (confirm(`সতর্কতা! আপনি কি নিশ্চিতভাবে "${name}" মাসের পুরো খাতা ও সকল হিসাব মুছে ফেলতে চান?`)) {
    try {
      localStorage.removeItem(getStorageKeyForMonth(currentMonthId));
    } catch(e) {}
    allMonths = allMonths.filter(m => m.id !== currentMonthId);
    saveMonthsList();
    const targetId = allMonths.length > 0 ? allMonths[allMonths.length - 1].id : '2026-10';
    currentMonthId = '';
    switchMonth(targetId);
    showToast(`"${name}" মাস সফলভাবে মুছে ফেলা হয়েছে`);
  }
};

window.switchMonth = function(monthId) {
  if (monthId === currentMonthId) return;
  
  saveState();

  currentMonthId = monthId;
  localStorage.setItem(MESS_ACTIVE_MONTH_KEY, currentMonthId);

  state = loadState(currentMonthId);

  if (typeof listenToMonth === 'function') {
    listenToMonth(currentMonthId, (remoteState) => {
      if (remoteState && remoteState.members) {
        state = remoteState;
        saveStateLocalOnly();
        renderAll();
      }
    });
  }

  renderAll();
  const mMeta = allMonths.find(m => m.id === currentMonthId);
  showToast(`মাস পরিবর্তিত হয়েছে: ${mMeta ? (mMeta.label || mMeta.name) : currentMonthId}`);
};


function ensureDepositHistory(st) {
  if (!st) return;
  if (!Array.isArray(st.depositHistory)) {
    st.depositHistory = [];
  }

  // If depositHistory is empty but members have deposits recorded
  if (st.depositHistory.length === 0 && st.deposits && typeof st.deposits === 'object') {
    let idCounter = 1;
    Object.keys(st.deposits).forEach(member => {
      const amt = Number(st.deposits[member]) || 0;
      if (amt > 0) {
        st.depositHistory.push({
          id: 'init-' + idCounter++,
          member: member,
          amount: amt,
          date: '1 ' + (st.month || 'October 2026'),
          note: 'মেস ফান্ড জমা'
        });
      }
    });
  }
}

function recalculateDepositsFromHistory() {
  if (!state.deposits) state.deposits = {};
  state.members.forEach(m => {
    state.deposits[m] = 0;
  });

  if (Array.isArray(state.depositHistory)) {
    state.depositHistory.forEach(d => {
      const m = d.member;
      const amt = Number(d.amount) || 0;
      if (m) {
        state.deposits[m] = (Number(state.deposits[m]) || 0) + amt;
      }
    });
  }
}

window.deleteDepositEntry = function(depositId) {
  if (!isAdmin) {
    showToast('জমা ডিলিট করতে এডমিন লগইন করুন');
    return;
  }

  ensureDepositHistory(state);
  const entry = state.depositHistory.find(d => String(d.id) === String(depositId));
  if (!entry) return;

  if (confirm(`আপনি কি "${entry.member}" এর "${formatBDT(entry.amount)}" জমার এই এন্ট্রিটি মুছে ফেলতে চান?`)) {
    state.depositHistory = state.depositHistory.filter(d => String(d.id) !== String(depositId));
    recalculateDepositsFromHistory();

    saveState();
    renderAll();
    showToast(`"${entry.member}" এর ${formatBDT(entry.amount)} জমা সফলভাবে মুছে ফেলা হয়েছে!`);
  }
};

function renderDepositHistoryTable() {
  const container = document.getElementById('depositHistoryContainer');
  const filterSelect = document.getElementById('depositHistoryFilter');
  if (!container) return;

  ensureDepositHistory(state);

  // Update pill button badge counts
  const pillDep = document.getElementById('pillDepositBtn');
  if (pillDep) {
    const depCount = state.depositHistory ? state.depositHistory.length : 0;
    pillDep.textContent = `💰 টাকা জমা (${depCount})`;
  }
  const pillBaz = document.getElementById('pillBazarBtn');
  if (pillBaz) {
    const bazCount = (state.bazar ? state.bazar.length : 0) + (state.sharedItems ? state.sharedItems.length : 0);
      pillBaz.textContent = `🛒 বাজার (${bazCount})`;
  }

  if (filterSelect) {
    const currentVal = filterSelect.value || 'ALL';
    filterSelect.innerHTML = `<option value="ALL">সকল সদস্যের জমা</option>` +
      state.members.map(m => `<option value="${m}" ${m === currentVal ? 'selected' : ''}>${m} এর জমা</option>`).join('');
  }

  const selectedMember = filterSelect ? filterSelect.value : 'ALL';
  const history = [...(state.depositHistory || [])].reverse();

  const filtered = selectedMember === 'ALL'
    ? history
    : history.filter(d => d.member === selectedMember);

  const totalFilteredDeposit = filtered.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalBadgeEl = document.getElementById('depositTotalFilterBadge');
  if (totalBadgeEl) {
    totalBadgeEl.textContent = `মোট জমা: ${formatBDT(totalFilteredDeposit)}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted" style="padding: 28px 16px; font-size: 0.88rem;">
        কোনো জমার রেকর্ড পাওয়া যায়নি<br>
        <button type="button" class="btn btn-primary btn-sm" style="margin-top: 10px;" onclick="window.openDepositModalGlobal && window.openDepositModalGlobal()">
          + টাকা জমা দিন
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(d => `
    <div class="tx-card-item">
      <div class="tx-card-left">
        <div class="tx-avatar-chip" style="background: rgba(34, 197, 94, 0.15); color: #22c55e;">💰</div>
        <div class="tx-details">
          <div class="tx-title">
            <b>${d.member}</b>
            ${d.note ? `<span style="font-weight:400; font-size:0.8rem; color:var(--text-muted);"> • ${d.note}</span>` : ''}
          </div>
          <div class="tx-sub"><span>${d.date || 'তারিখ নেই'}</span></div>
        </div>
      </div>
      <div class="tx-card-right">
        <span class="tx-amount positive" style="font-weight: 800; color: var(--success);">+ ৳${Number(d.amount).toLocaleString()}</span>
        ${isAdmin ? `
          <div class="tx-actions">
            <button class="btn-action-edit" onclick="openEditDepositModal('${d.id}')" title="এডিট করুন">✏️</button>
            <button class="btn-action-delete" onclick="deleteDepositEntry('${d.id}')" title="মুছে ফেলুন">🗑️</button>
          </div>
        ` : ''}
      </div>
    </div>
  `).join('');
}

function renderAll() {
  const metrics = calculateMetrics();
  renderKPIs(metrics);
  renderDashboard(metrics);
  renderMealsTable();
  renderBazarTable();
  try {
    renderUtilities(metrics);
  } catch (err) {
    console.error('Error in renderUtilities:', err);
  }
  try {
    renderSettlement(metrics);
  } catch (err) {
    console.error('Error in renderSettlement:', err);
  }
  try {
    renderUserManagement();
  } catch (err) {
    console.error('Error in renderUserManagement:', err);
  }
  renderMonthSwitcher();
  try {
    renderDepositHistoryTable();
  } catch (err) {
    console.error('Error in renderDepositHistoryTable:', err);
  }
  try {
    renderDashboardBills();
  } catch (err) {
    console.error('Error in renderDashboardBills:', err);
  }
  updateQuickDaySelect();
  updateAdminUI();
}

// Tab Switching
window.switchTab = function(tabName) {
  document.querySelectorAll('.nav-list .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
  document.querySelectorAll('.floating-dock .dock-btn').forEach(btn => {
    if (tabName === 'utilities' && btn.dataset.tab === 'settlement') {
      btn.classList.add('active');
    } else {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    }
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
  // Theme Toggle with dynamic icon & smooth UI
  const updateThemeUI = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      if (theme === 'light') {
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        `;
        btn.title = 'ডার্ক থিম চালু করুন';
      } else {
        btn.innerHTML = `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        `;
        btn.title = 'লাইট থিম চালু করুন';
      }
    }
  };

  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  updateThemeUI(savedTheme);

  document.getElementById('themeToggleBtn').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, next);
    updateThemeUI(next);
    showToast(next === 'dark' ? '🌙 ডার্ক থিম চালু হয়েছে' : '☀️ লাইট থিম চালু হয়েছে');
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

  // Bazar Modal (Multi-Item & Specific Date Support)
  
  // Multi-item Bazar Row Helpers
  function createBazarRowElement(name = '', price = '') {
    const div = document.createElement('div');
    div.className = 'bazar-item-row';
    div.style.cssText = 'display: flex; gap: 8px; align-items: center;';
    div.innerHTML = `
      <input type="text" class="input bazar-item-name" placeholder="যেমন: মুরগি / চাল / ডিম" value="${name}" required style="flex: 2;">
      <input type="number" class="input mono bazar-item-price" placeholder="টাকা" value="${price}" min="1" step="any" required style="flex: 1;">
      <button type="button" class="btn btn-outline btn-sm remove-bazar-row-btn" style="padding: 4px 8px;" title="বাদ দিন">✕</button>
    `;
    return div;
  }

  function updateBazarModalLiveTotal() {
    const prices = document.querySelectorAll('#bazarItemsRowsContainer .bazar-item-price');
    let sum = 0;
    prices.forEach(inp => {
      const v = Number(inp.value);
      if (!isNaN(v) && v > 0) sum += v;
    });
    const totalEl = document.getElementById('modalBazarLiveTotal');
    if (totalEl) totalEl.textContent = 'মোট: ' + formatBDT(sum);
  }

  function resetBazarItemRows() {
    const container = document.getElementById('bazarItemsRowsContainer');
    if (!container) return;
    container.innerHTML = '';
    const initialRow = createBazarRowElement();
    container.appendChild(initialRow);
    const removeBtn = initialRow.querySelector('.remove-bazar-row-btn');
    if (removeBtn) removeBtn.style.visibility = 'hidden';
    updateBazarModalLiveTotal();
  }


  const bazarModal = document.getElementById('bazarModal');
  const openBazarModal = () => {
    if (!isAdmin) {
      showToast('বাজার যোগ করতে এডমিন লগইন করুন');
      return;
    }
    const shopperSelect = document.getElementById('modalShopperSelect');
    if (shopperSelect) {
      shopperSelect.innerHTML = state.members.map(m => `<option value="${m}">${m}</option>`).join('');
    }
    const today = new Date();
    const day = today.getDate();
    const monthPart = (state.month || 'October 2026').split(' ')[0];
    const dateInput = document.getElementById('modalBazarDateInput');
    if (dateInput) {
      dateInput.value = `${day} ${monthPart}`;
    }
    resetBazarItemRows();
    bazarModal.classList.add('open');
  };
  const closeBazarModal = () => bazarModal.classList.remove('open');
  window.openBazarModalGlobal = openBazarModal;

  document.getElementById('openAddBazarBtn').addEventListener('click', openBazarModal);
  document.getElementById('closeBazarModalBtn').addEventListener('click', closeBazarModal);
  document.getElementById('cancelBazarModalBtn').addEventListener('click', closeBazarModal);

  const setTodayBtn = document.getElementById('setTodayBazarDateBtn');
  if (setTodayBtn) {
    setTodayBtn.addEventListener('click', () => {
      const today = new Date();
      const day = today.getDate();
      const monthPart = (state.month || 'October 2026').split(' ')[0];
      const dateInput = document.getElementById('modalBazarDateInput');
      if (dateInput) dateInput.value = `${day} ${monthPart}`;
    });
  }

  const addMoreRowBtn = document.getElementById('addMoreBazarItemBtn');
  if (addMoreRowBtn) {
    addMoreRowBtn.addEventListener('click', () => {
      const container = document.getElementById('bazarItemsRowsContainer');
      if (!container) return;
      const row = createBazarRowElement();
      container.appendChild(row);
      container.querySelectorAll('.remove-bazar-row-btn').forEach(btn => btn.style.visibility = 'visible');
      const nameInput = row.querySelector('.bazar-item-name');
      if (nameInput) nameInput.focus();
    });
  }

  const rowsContainer = document.getElementById('bazarItemsRowsContainer');
  if (rowsContainer) {
    rowsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('remove-bazar-row-btn')) {
        const row = e.target.closest('.bazar-item-row');
        if (row) {
          row.remove();
          const allRows = rowsContainer.querySelectorAll('.bazar-item-row');
          if (allRows.length === 1) {
            allRows[0].querySelector('.remove-bazar-row-btn').style.visibility = 'hidden';
          }
          updateBazarModalLiveTotal();
        }
      }
    });

    rowsContainer.addEventListener('input', (e) => {
      if (e.target.classList.contains('bazar-item-price')) {
        updateBazarModalLiveTotal();
      }
    });
  }

  // Edit Bazar Modal Listeners
  const editBazarModal = document.getElementById('editBazarModal');
  const closeEditBazarModal = () => { if (editBazarModal) editBazarModal.classList.remove('open'); };
  const closeEditBazarBtn = document.getElementById('closeEditBazarModalBtn');
  const cancelEditBazarBtn = document.getElementById('cancelEditBazarModalBtn');
  if (closeEditBazarBtn) closeEditBazarBtn.addEventListener('click', closeEditBazarModal);
  if (cancelEditBazarBtn) cancelEditBazarBtn.addEventListener('click', closeEditBazarModal);

  const editBazarForm = document.getElementById('editBazarForm');
  if (editBazarForm) {
    editBazarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!isAdmin) return;
      const id = document.getElementById('editBazarId').value;
      const shopper = document.getElementById('editBazarShopperSelect').value;
      const date = document.getElementById('editBazarDateInput').value.trim();
      const item = document.getElementById('editBazarItemInput').value.trim();
      const amount = Number(document.getElementById('editBazarAmountInput').value);
      const catEl = document.getElementById('editBazarCategorySelect');
      const category = catEl ? catEl.value : 'food';

      if (!item || isNaN(amount) || amount <= 0) {
        showToast('সঠিক খরচ ও বিবরণ দিন');
        return;
      }

      const idx = state.bazar.findIndex(b => String(b.id) === String(id));
      if (idx !== -1) {
        state.bazar[idx].shopper = shopper;
        state.bazar[idx].date = date;
        state.bazar[idx].item = item;
        state.bazar[idx].amount = amount;
        state.bazar[idx].category = category;
        saveState();
        closeEditBazarModal();
        renderAll();
        showToast('বাজার খরচ সফলভাবে আপডেট করা হয়েছে!');
      } else if (state.sharedItems) {
        const sIdx = state.sharedItems.findIndex(s => String(s.id) === String(id));
        if (sIdx !== -1) {
          state.sharedItems[sIdx].buyer = shopper;
          state.sharedItems[sIdx].date = date;
          state.sharedItems[sIdx].name = item;
          state.sharedItems[sIdx].price = amount;
          saveState();
          closeEditBazarModal();
          renderAll();
          showToast('মেস সামগ্রী খরচ সফলভাবে আপডেট করা হয়েছে!');
        }
      }
    });
  }

  document.getElementById('bazarForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const shopper = document.getElementById('modalShopperSelect').value;
    const catEl = document.getElementById('modalBazarCategorySelect');
    const category = catEl ? catEl.value : 'food';
    const dateInput = document.getElementById('modalBazarDateInput');
    const date = dateInput ? dateInput.value.trim() : `${new Date().getDate()} October`;

    const items = [];
    document.querySelectorAll('#bazarItemsRowsContainer .bazar-item-row').forEach(row => {
      const name = (row.querySelector('.bazar-item-name').value || '').trim();
      const price = Number(row.querySelector('.bazar-item-price').value);
      if (name && !isNaN(price) && price > 0) {
        items.push({ name, price });
      }
    });

    if (items.length === 0) {
      showToast('অন্তত একটি জিনিস ও তার সঠিক টাকা লিখুন');
      return;
    }

    const baseTime = Date.now();
    items.forEach((it, idx) => {
      const entryId = baseTime + idx;
      if (category === 'shared') {
        if (!state.sharedItems) state.sharedItems = [];
        state.sharedItems.push({
          id: entryId,
          name: it.name,
          price: it.price,
          buyer: shopper,
          date: date
        });
      } else {
        if (!state.bazar) state.bazar = [];
        state.bazar.push({
          id: entryId,
          shopper: shopper,
          item: it.name,
          amount: it.price,
          category: 'food',
          date: date
        });
      }
    });

    saveState();
    renderAll();
    closeBazarModal();
    document.getElementById('bazarForm').reset();
    showToast(items.length > 1 
      ? `${items.length}টি জিনিসের বাজার খরচ সফলভাবে যোগ হয়েছে!` 
      : (category === 'shared' ? 'নতুন মেস সামগ্রী সফলভাবে যোগ হয়েছে!' : 'নতুন বাজার খরচ সফলভাবে যোগ হয়েছে!')
    );
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
    const dateInput = document.getElementById('depositDateInput');
    const noteInput = document.getElementById('depositNoteInput');

    const date = dateInput ? dateInput.value.trim() : '';
    const note = noteInput ? noteInput.value.trim() : '';

    if (!member || isNaN(amount) || amount <= 0) {
      showToast('সঠিক জমার পরিমাণ দিন');
      return;
    }

    ensureDepositHistory(state);

    const newDeposit = {
      id: Date.now(),
      member,
      amount,
      date: date || (new Date().getDate() + ' ' + (state.monthBn || state.month || '')),
      note: note || 'ফান্ড জমা'
    };

    state.depositHistory.push(newDeposit);
    recalculateDepositsFromHistory();

    saveState();
    closeDepositModal();
    renderAll();
    showToast(`${member} এর ${formatBDT(amount)} ফান্ড জমা সফলভাবে রেকর্ড হয়েছে!`);
  });

  // Fixed Bill Modal
  const billModal = document.getElementById('billModal');
  const openBillModal = () => {
    if (!isAdmin) {
      showToast('বিল এন্ট্রি করতে এডমিন লগইন করুন');
      return;
    }
    document.getElementById('billForm').reset();
    const idInput = document.getElementById('billIdInput');
    if (idInput) idInput.value = '';
    const heading = document.getElementById('billModalHeading');
    if (heading) heading.textContent = 'নতুন বিল এন্ট্রি (Rent / Utility)';
    document.getElementById('billSplitCount').value = state.members.length;
    billModal.classList.add('open');
  };
  const closeBillModal = () => billModal.classList.remove('open');
  window.openBillModalGlobal = openBillModal;

  const openBillBtn = document.getElementById('openAddBillBtn');
  if (openBillBtn) openBillBtn.addEventListener('click', openBillModal);
  document.getElementById('closeBillModalBtn').addEventListener('click', closeBillModal);
  document.getElementById('cancelBillModalBtn').addEventListener('click', closeBillModal);

  document.getElementById('billForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const billId = document.getElementById('billIdInput') ? document.getElementById('billIdInput').value : '';
    const title = document.getElementById('billTitleInput').value.trim();
    const amount = Number(document.getElementById('billAmountInput').value);
    const splitCount = Number(document.getElementById('billSplitCount').value) || state.members.length;
    const status = document.getElementById('billStatusSelect').value;
    const note = document.getElementById('billNoteInput').value.trim();

    if (!title || isNaN(amount) || amount <= 0) {
      showToast('সঠিক বিলের নাম ও পরিমাণ দিন');
      return;
    }

    if (billId) {
      const idx = state.fixedBills.findIndex(b => String(b.id) === String(billId));
      if (idx !== -1) {
        state.fixedBills[idx].title = title;
        state.fixedBills[idx].amount = amount;
        state.fixedBills[idx].splitCount = splitCount;
        state.fixedBills[idx].status = status;
        state.fixedBills[idx].note = note || `${splitCount} জনের ভাগ`;
        saveState();
        closeBillModal();
        renderAll();
        showToast(`বিল "${title}" সফলভাবে আপডেট করা হয়েছে!`);
        return;
      }
    }

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
    renderAll();
    showToast(`নতুন বিল "${title}" সফলভাবে যোগ হয়েছে!`);
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
  window.openSharedItemModalGlobal = openSharedItemModal;
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
  const catFilterEl = document.getElementById('bazarCategoryFilter');
  if (catFilterEl) catFilterEl.addEventListener('change', renderBazarTable);
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
        if (currentMonthId === '2026-10') {
          state = JSON.parse(JSON.stringify(INITIAL_DATA));
        } else {
          state = createFreshMonthState(currentMonthId);
        }
        saveState();
        renderAll();
        showToast('রিসেট সম্পন্ন হয়েছে!');
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
        // If remote state in Firestore is from an older data version, push new Google Sheet data
        if (remoteState.dataVersion !== INITIAL_DATA.dataVersion) {
          console.log('Syncing fresh Google Sheet data to Firestore...');
          pushStateToFirebase(state);
          return;
        }
        state = remoteState;
        ensureDepositHistory(state);
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
    if (!isAdmin) {
      showToast('ফায়ারবেস ক্লাউড সেটিং শুধুমাত্র এডমিনের জন্য সংরক্ষিত');
      return;
    }
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


  // Month Switcher controls
  const prevMonthBtn = document.getElementById('prevMonthBtn');
  const nextMonthBtn = document.getElementById('nextMonthBtn');
  const monthSelectDropdown = document.getElementById('monthSelectDropdown');

  if (prevMonthBtn) {
    prevMonthBtn.addEventListener('click', () => {
      allMonths.sort((a, b) => a.id.localeCompare(b.id));
      const idx = allMonths.findIndex(m => m.id === currentMonthId);
      if (idx > 0) switchMonth(allMonths[idx - 1].id);
    });
  }

  if (nextMonthBtn) {
    nextMonthBtn.addEventListener('click', () => {
      allMonths.sort((a, b) => a.id.localeCompare(b.id));
      const idx = allMonths.findIndex(m => m.id === currentMonthId);
      if (idx < allMonths.length - 1) switchMonth(allMonths[idx + 1].id);
    });
  }

  if (monthSelectDropdown) {
    monthSelectDropdown.addEventListener('change', (e) => {
      switchMonth(e.target.value);
    });
  }

  // New Month Modal
  const openNewMonthModalBtn = document.getElementById('openNewMonthModalBtn');
  const newMonthModal = document.getElementById('newMonthModal');
  const closeNewMonthModalBtn = document.getElementById('closeNewMonthModalBtn');
  const cancelNewMonthModalBtn = document.getElementById('cancelNewMonthModalBtn');
  const newMonthForm = document.getElementById('newMonthForm');

  if (openNewMonthModalBtn) {
    openNewMonthModalBtn.addEventListener('click', () => {
      if (!isAdmin) {
        openAdminModal();
        showToast('নতুন মাস শুরু করতে এডমিন পিন দিন');
        return;
      }
      allMonths.sort((a, b) => a.id.localeCompare(b.id));
      const latestMonth = allMonths[allMonths.length - 1];
      const parts = latestMonth.id.split('-');
      let nextYear = parseInt(parts[0], 10);
      let nextMonthNum = parseInt(parts[1], 10) + 1;
      if (nextMonthNum > 12) {
        nextMonthNum = 1;
        nextYear += 1;
      }

      document.getElementById('newMonthSelect').value = String(nextMonthNum);
      document.getElementById('newYearInput').value = nextYear;
      const namesEl = document.getElementById('carryMembersNames');
      if (namesEl) namesEl.textContent = state.members.join(', ');
      
      newMonthModal.classList.add('open');
    });
  }

  const closeNewMonthModal = () => newMonthModal.classList.remove('open');
  if (closeNewMonthModalBtn) closeNewMonthModalBtn.addEventListener('click', closeNewMonthModal);
  if (cancelNewMonthModalBtn) cancelNewMonthModalBtn.addEventListener('click', closeNewMonthModal);

  if (newMonthForm) {
    newMonthForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const monthNum = parseInt(document.getElementById('newMonthSelect').value, 10);
      const year = parseInt(document.getElementById('newYearInput').value, 10);
      const carryMembers = document.getElementById('carryOverMembersCheckbox').checked;

      const formattedMonth = monthNum < 10 ? '0' + monthNum : '' + monthNum;
      const newMonthId = year + '-' + formattedMonth;

      const existing = allMonths.find(m => m.id === newMonthId);
      if (existing) {
        closeNewMonthModal();
        switchMonth(newMonthId);
        showToast(`এই মাসটি (${existing.label}) ইতিমধ্যে রয়েছে, সেখানে সুইচ করা হয়েছে।`);
        return;
      }

      const mIndex = monthNum - 1;
      const bnName = MONTH_NAMES_BN[mIndex] + ' ' + year;
      const enName = MONTH_NAMES_EN[mIndex] + ' ' + year;
      const days = new Date(year, monthNum, 0).getDate();

      const newMonthObj = {
        id: newMonthId,
        name: enName,
        label: bnName,
        days: days
      };

      allMonths.push(newMonthObj);
      saveMonthsList();

      const newState = createFreshMonthState(newMonthId, carryMembers);
      localStorage.setItem(getStorageKeyForMonth(newMonthId), JSON.stringify(newState));

      closeNewMonthModal();
      switchMonth(newMonthId);
      showToast(`অভিনন্দন! ${bnName} মাসের খাতা সফলভাবে শুরু হয়েছে। 🎉`);
    });
  }

  // Initial load
  const depositHistoryFilter = document.getElementById('depositHistoryFilter');
  if (depositHistoryFilter) {
    depositHistoryFilter.addEventListener('change', () => {
      renderDepositHistoryTable();
    });
  }

  
  // Floating Dock tab clicks
  document.querySelectorAll('.floating-dock .dock-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Quick Action Sheet
  const quickFab = document.getElementById('quickActionFab');
  const quickSheet = document.getElementById('quickActionSheet');
  const closeQuickSheetBtn = document.getElementById('closeQuickSheetBtn');
  const quickSheetMealBtn = document.getElementById('quickSheetMealBtn');
  const quickSheetBazarBtn = document.getElementById('quickSheetBazarBtn');
  const quickSheetDepositBtn = document.getElementById('quickSheetDepositBtn');
  const quickSheetBillBtn = document.getElementById('quickSheetBillBtn');
  if (quickSheetBillBtn) {
    quickSheetBillBtn.addEventListener('click', () => {
      closeQuickActionSheet();
      openBillModal();
    });
  }

  const closeQuickActionSheet = () => {
    if (quickSheet) quickSheet.classList.remove('open');
  };

  if (quickFab && quickSheet) {
    quickFab.addEventListener('click', () => {
      quickSheet.classList.toggle('open');
    });
  }

  if (closeQuickSheetBtn) {
    closeQuickSheetBtn.addEventListener('click', closeQuickActionSheet);
  }

  if (quickSheet) {
    quickSheet.addEventListener('click', (e) => {
      if (e.target === quickSheet) closeQuickActionSheet();
    });
  }

  if (quickSheetMealBtn) {
    quickSheetMealBtn.addEventListener('click', () => {
      closeQuickActionSheet();
      switchTab('meals');
    });
  }

  if (quickSheetBazarBtn) {
    quickSheetBazarBtn.addEventListener('click', () => {
      closeQuickActionSheet();
      if (!isAdmin) {
        showToast('বাজার খরচ যোগ করতে এডমিন লগইন করুন');
        switchTab('bazar');
        return;
      }
      if (window.openBazarModalGlobal) window.openBazarModalGlobal();
      else switchTab('bazar');
    });
  }

  if (quickSheetDepositBtn) {
    quickSheetDepositBtn.addEventListener('click', () => {
      closeQuickActionSheet();
      if (!isAdmin) {
        showToast('টাকা জমা এন্ট্রি করতে এডমিন লগইন করুন');
        return;
      }
      if (window.openDepositModalGlobal) window.openDepositModalGlobal();
      else switchTab('dashboard');
    });
  }

  renderAll();
});


window.switchHomeTab = function(tab) {
  const secBazar = document.getElementById('homeSectionBazar');
  const secDeposit = document.getElementById('homeSectionDeposit');
  const secBills = document.getElementById('homeSectionBills');
  const secStats = document.getElementById('homeSectionStats');

  const btnBazar = document.getElementById('pillBazarBtn');
  const btnDeposit = document.getElementById('pillDepositBtn');
  const btnBills = document.getElementById('pillBillsBtn');
  const btnStats = document.getElementById('pillStatsBtn');
  const viewAllBtn = document.getElementById('homeViewAllBtn');

  if (btnBazar) btnBazar.classList.toggle('active', tab === 'bazar');
  if (btnDeposit) btnDeposit.classList.toggle('active', tab === 'deposit');
  if (btnBills) btnBills.classList.toggle('active', tab === 'bills');
  if (btnStats) btnStats.classList.toggle('active', tab === 'stats');

  if (secBazar) secBazar.style.display = tab === 'bazar' ? 'block' : 'none';
  if (secDeposit) secDeposit.style.display = tab === 'deposit' ? 'block' : 'none';
  if (secBills) secBills.style.display = tab === 'bills' ? 'block' : 'none';
  if (secStats) secStats.style.display = tab === 'stats' ? 'block' : 'none';

  if (tab === 'deposit') {
    renderDepositHistoryTable();
  } else if (tab === 'bills') {
    renderDashboardBills();
  }

  if (viewAllBtn) {
    if (tab === 'bazar') {
      viewAllBtn.style.display = 'inline-flex';
      viewAllBtn.onclick = () => switchTab('bazar');
      viewAllBtn.textContent = 'সব বাজার →';
    } else if (tab === 'bills') {
      viewAllBtn.style.display = 'inline-flex';
      viewAllBtn.onclick = () => switchTab('utilities');
      viewAllBtn.textContent = 'সব বিল ও বিস্তারিত →';
    } else {
      viewAllBtn.style.display = 'none';
    }
  }
};

window.copyMessSummaryToClipboard = function() {
  const metrics = calculateMetrics();
  let msg = `📋 মেস মিল হিসাব - ${state.monthBn || state.month}\\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\\n`;
  msg += `⚡ মিল রেট: ৳${metrics.mealRate.toFixed(2)}\\n`;
  msg += `🛒 মোট বাজার: ৳${Math.round(metrics.totalBazar).toLocaleString()} | 🍲 মোট মিল: ${metrics.totalMeals.toFixed(1)}\\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\\n`;
  msg += `📊 মেম্বারদের ফাইনাল ব্যালেন্স:\\n`;
  metrics.memberSummaries.forEach(m => {
    const status = m.balance > 0.01
      ? `পাবে ➔ +৳${Math.round(m.balance).toLocaleString()}`
      : m.balance < -0.01
        ? `দেবে ➔ -৳${Math.round(Math.abs(m.balance)).toLocaleString()}`
        : `ক্লিয়ার (৳০)`;
    msg += `• ${m.name} (${m.meals} মিল): ${status}\\n`;
  });
  if (metrics.settlementTransfers && metrics.settlementTransfers.length > 0) {
    msg += `━━━━━━━━━━━━━━━━━━━━━\\n`;
    msg += `🤝 সরাসরি লেনদেন:\\n`;
    metrics.settlementTransfers.forEach(t => {
      msg += `👉 ${t.from} দিবে ${t.to}-কে ৳${Math.round(t.amount).toLocaleString()}\\n`;
    });
  }
  msg += `━━━━━━━━━━━━━━━━━━━━━\\n`;
  msg += `_মিল ট্র্যাকার অ্যাপ থেকে জেনারেট করা_`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(msg).then(() => {
      showToast('✅ হিসাব কপি হয়েছে! মেসেঞ্জার বা হোয়াটসঅ্যাপে পেস্ট করুন');
    }).catch(() => {
      copyFallback(msg);
    });
  } else {
    copyFallback(msg);
  }
};

function copyFallback(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('✅ হিসাব কপি হয়েছে! মেসেঞ্জার বা হোয়াটসঅ্যাপে পেস্ট করুন');
  } catch (e) {
    showToast('কপি করা সম্ভব হয়নি');
  }
  document.body.removeChild(ta);
}


window.forceAppReload = function() {
  showToast('🔄 অ্যাপ আপডেট ও রিফ্রেশ হচ্ছে...');
  if (window.caches) {
    caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
  }
  setTimeout(() => {
    window.location.href = window.location.origin + window.location.pathname + '?t=' + Date.now();
  }, 250);
};

// Auto update on new build
(function checkAppBuild() {
  const LATEST_BUILD = '2026-10-20-v22';
  const current = localStorage.getItem('meal_tracker_build');
  if (current !== LATEST_BUILD) {
    localStorage.setItem('meal_tracker_build', LATEST_BUILD);
    if (current && window.location.search.indexOf('t=') === -1) {
      window.location.replace(window.location.origin + window.location.pathname + '?t=' + Date.now());
    }
  }
})();


// Backdrop click to close memberDetailsModal
document.addEventListener('DOMContentLoaded', () => {
  const memberModal = document.getElementById('memberDetailsModal');
  if (memberModal) {
    memberModal.addEventListener('click', (e) => {
      if (e.target === memberModal) window.closeMemberDetailsModal();
    });
  }
});


// Member Details Pop Up Modal
window.openMemberDetailsModal = function(memberName) {
  const metrics = calculateMetrics();
  const m = metrics.memberSummaries.find(s => s.name === memberName);
  if (!m) return;

  const modal = document.getElementById('memberDetailsModal');
  if (!modal) return;

  // Header info
  const avatarEl = document.getElementById('modalMemberAvatar');
  if (avatarEl) {
    avatarEl.textContent = m.name.charAt(0);
  }
  const nameEl = document.getElementById('modalMemberName');
  if (nameEl) nameEl.textContent = m.name;
  
  const subEl = document.getElementById('modalMemberSub');
  if (subEl) subEl.textContent = `মোট মিল: ${m.meals} টি • ব্যক্তিগত হিসাব`;

  // Status computation
  const isPositive = m.balance > 0.01;
  const isNegative = m.balance < -0.01;

  // Overall Member Payment Status: Paid ONLY when EVERYTHING is paid
  const isMealPaid = m.balance >= -0.01;
  const hasFixedBills = (m.utilityTotal || 0) > 0;
  const isBillPaid = !hasFixedBills || (state.memberBillStatus && state.memberBillStatus[m.name] === 'Paid');
  const isSharedPaid = !state.memberSharedStatus || state.memberSharedStatus[m.name] !== 'Pending';

  const isOverallPaid = isMealPaid && isBillPaid && isSharedPaid;
  const overallClass = isOverallPaid ? 'badge-green' : 'badge-red';
  const overallText = isOverallPaid ? 'Paid' : 'Pending';

  const modalPendingReasons = [];
  if (!isMealPaid) modalPendingReasons.push('খাবার ব্যালেন্স বকেয়া');
  if (!isBillPaid) modalPendingReasons.push('বাসা ভাড়া ও বিল বকেয়া');
  if (!isSharedPaid) modalPendingReasons.push('মেস সামগ্রী বকেয়া');
  const modalOverallTooltip = isOverallPaid ? 'সকল হিসাব ও বিল পরিশোধিত (Paid)' : `বকেয়া: ${modalPendingReasons.join(', ')}`;

  const balanceText = isPositive
    ? `+ ৳${Math.round(m.balance).toLocaleString()}`
    : isNegative
      ? `- ৳${Math.round(Math.abs(m.balance)).toLocaleString()}`
      : `৳০`;
  const balanceStatusTitle = isPositive ? 'মেস থেকে ফেরত পাবেন' : isNegative ? 'মেসের ফান্ডে দিতে হবে' : 'হিসাব সম্পন্ন';

  // Shared supplies status
  if (!state.memberSharedStatus) state.memberSharedStatus = {};
  const defaultS = (m.sharedPaid >= m.sharedCost && m.sharedCost > 0) ? 'Paid' : 'Pending';
  const sStatus = state.memberSharedStatus[m.name] || defaultS;
  const sClass = sStatus === 'Paid' ? 'badge-green' : 'badge-red';
  const sText = sStatus === 'Paid' ? 'Paid' : 'Pending';

  // Bill status
  if (!state.memberBillStatus) state.memberBillStatus = {};
  const bStatus = state.memberBillStatus[m.name] || 'Pending';
  const bClass = bStatus === 'Paid' ? 'badge-green' : 'badge-red';
  const bText = bStatus === 'Paid' ? 'Paid' : 'Pending';

  const bodyEl = document.getElementById('modalMemberBody');
  if (bodyEl) {
    bodyEl.innerHTML = `
      <!-- Top Hero Balance Card in Modal -->
      <div style="background: var(--bg-muted); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 14px 16px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span class="text-sm text-muted" style="display: block; margin-bottom: 2px;">${balanceStatusTitle}</span>
          <span class="mono" style="font-size: 1.6rem; font-weight: 800; color: ${isPositive ? 'var(--accent)' : isNegative ? 'var(--danger)' : 'var(--text-main)'};">
            ${balanceText}
          </span>
        </div>
        <div style="text-align: right;">
          <span class="text-muted" style="font-size: 0.72rem; display: block; margin-bottom: 4px;">পেমেন্ট স্ট্যাটাস</span>
          ${isAdmin ? `
            <button class="badge ${overallClass}" style="font-weight: 800; font-size: 0.75rem; padding: 3px 9px; cursor: pointer; border: none;" onclick="toggleMemberOverallStatus('${m.name}'); openMemberDetailsModal('${m.name}');" title="ক্লিক করে স্ট্যাটাস পরিবর্তন করুন">
              ${overallText} ⟳
            </button>
          ` : `
            <span class="badge ${overallClass}" style="font-weight: 800; font-size: 0.75rem; padding: 3px 9px;">${overallText}</span>
          `}
        </div>
      </div>

      <!-- Detailed Breakdown Items -->
      <div style="display: flex; flex-direction: column; gap: 9px; font-size: 0.85rem;">
        <!-- Total Deposit & Transactions -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 11px 13px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600;">💰 মোট ফান্ড জমা</span>
            <span class="mono" style="font-weight: 800; font-size: 0.95rem; color: var(--success);">৳${Math.round(m.totalDeposit).toLocaleString()}</span>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
            <span>ক্যাশ জমা: ৳${Math.round(m.cashDeposit).toLocaleString()}</span>
            ${m.sharedPaid > 0 ? `<span style="color: #a855f7;">+ মেস সামগ্রী: ৳${Math.round(m.sharedPaid).toLocaleString()}</span>` : ''}
          </div>
          ${(() => {
            const memberDeps = (state.depositHistory || []).filter(d => d.member === m.name);
            if (memberDeps.length === 0) return '';
            return `
              <div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed var(--border-color); display: flex; flex-direction: column; gap: 4px; font-size: 0.74rem;">
                <span class="text-muted" style="font-size: 0.7rem; font-weight: 600;">জমার বিবরণী (${memberDeps.length} টি):</span>
                ${memberDeps.map(d => `
                  <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-muted); padding: 3px 6px; border-radius: 4px;">
                    <span>${d.note || 'ফান্ড জমা'} <span class="text-muted">(${d.date || 'তারিখ নেই'})</span></span>
                    <span class="mono" style="font-weight: 700; color: var(--success);">+ ৳${Number(d.amount).toLocaleString()}</span>
                  </div>
                `).join('')}
              </div>
            `;
          })()}
        </div>

        <!-- Meal Cost -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 11px 13px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-weight: 600;">🍲 খাবার মিল খরচ</span>
            <span class="mono" style="font-weight: 800; font-size: 0.95rem;">৳${Math.round(m.mealCost).toLocaleString()}</span>
          </div>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
            ${m.name === 'Imam' ? '০ মিল খরচ (ইমাম সাহেব ফ্রি)' : `${m.meals} টি মিল × মিল রেট ৳${metrics.mealRate.toFixed(2)}`}
          </div>
        </div>

        <!-- Shared Mess Supplies -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 11px 13px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-weight: 600;">🧼 মেস সামগ্রীর ভাগ</span>
              <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">(হারপিক, তেল, টিস্যু ইত্যাদি)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="mono" style="font-weight: 800; font-size: 0.95rem;">৳${Math.round(m.sharedCost).toLocaleString()}</span>
              ${isAdmin ? `
                <button class="badge ${sClass}" style="font-size: 0.68rem; padding: 2px 7px; cursor: pointer; border: none;" onclick="toggleMemberSharedStatus('${m.name}'); openMemberDetailsModal('${m.name}');" title="ক্লিক করে স্ট্যাটাস পরিবর্তন করুন">
                  ${sText} ⟳
                </button>
              ` : `
                <span class="badge ${sClass}" style="font-size: 0.68rem; padding: 2px 7px;">${sText}</span>
              `}
            </div>
          </div>
          ${m.sharedPaid > 0 ? `
            <div style="font-size: 0.75rem; color: #a855f7; margin-top: 4px;">
              ✓ নিজ পকেটে মেস সামগ্রী কিনেছেন: ৳${Math.round(m.sharedPaid).toLocaleString()}
            </div>
          ` : ''}
        </div>

        <!-- Rent & Utilities -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 11px 13px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="display: flex; align-items: center; gap: 5px;">
                <span style="font-weight: 600;">🏠 বাসা ভাড়া ও বিল</span>
                ${m.name === 'Imam' ? '<span class="badge" style="font-size:0.62rem; padding:1px 4px; color:#38bdf8; background: rgba(56,189,248,0.12);">বুয়া বাদে</span>' : ''}
              </div>
              <span style="font-size: 0.72rem; color: var(--text-muted); display: block;">(ভাড়া, বুয়া, বিদ্যুৎ, ওয়াইফাই)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span class="mono" style="font-weight: 800; font-size: 0.95rem; color: #38bdf8;">৳${Math.round(m.utilityTotal).toLocaleString()}</span>
              ${isAdmin ? `
                <button class="badge ${bClass}" style="font-size: 0.68rem; padding: 2px 7px; cursor: pointer; border: none;" onclick="toggleMemberBillStatus('${m.name}'); openMemberDetailsModal('${m.name}');" title="ক্লিক করে স্ট্যাটাস পরিবর্তন করুন">
                  ${bText} ⟳
                </button>
              ` : `
                <span class="badge ${bClass}" style="font-size: 0.68rem; padding: 2px 7px;">${bText}</span>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  const actionEl = document.getElementById('modalMemberAdminAction');
  if (actionEl) {
    actionEl.innerHTML = isAdmin ? `
      <button type="button" class="btn btn-primary btn-sm" onclick="closeMemberDetailsModal(); openQuickDeposit('${m.name}');">
        + টাকা জমা দিন
      </button>
    ` : '';
  }

  modal.classList.add('open');
};

window.closeMemberDetailsModal = function() {
  const modal = document.getElementById('memberDetailsModal');
  if (modal) modal.classList.remove('open');
};


// Copy Individual Member Bill Slip
window.copyMemberBillSlip = function(memberName) {
  if (!state.fixedBills) return;
  const m = memberName;
  const monthName = state.month || 'চলতি মাস';

  let total = 0;
  const lines = state.fixedBills.map(b => {
    const isExcluded = (b.note && b.note.includes('৩ জনের') && m === 'Imam') ||
                       (b.splitCount < state.members.length && m === 'Imam') ||
                       (b.title && (b.title.includes('বুয়া') || b.title.includes('খালা') || b.title.toLowerCase().includes('bua') || b.title.toLowerCase().includes('cook')) && m === 'Imam');
    const share = isExcluded ? 0 : (Number(b.amount) / (b.splitCount || state.members.length || 1));
    total += share;
    const titleClean = b.title.split('(')[0].trim();
    if (isExcluded) return `• ${titleClean}: ৳০ (মুক্ত)`;
    return `• ${titleClean}: ৳${Math.round(share).toLocaleString()}`;
  });

  const bStatus = state.memberBillStatus?.[m] || 'Pending';
  const statusEmoji = bStatus === 'Paid' ? 'Paid 🟢 (পরিশোধিত)' : 'Pending 🔴 (বকেয়া)';

  const text = `🏠 *${monthName} - ${m}-এর বাসা ভাড়া ও বিল স্লিপ*
━━━━━━━━━━━━━━━━━━━━
${lines.join('\n')}
━━━━━━━━━━━━━━━━━━━━
*সর্বমোট প্রদেয় বিল:* ৳${Math.round(total).toLocaleString()}
*পেমেন্ট অবস্থা:* ${statusEmoji}
━━━━━━━━━━━━━━━━━━━━
(অনুগ্রহ করে দ্রুত বিল পরিশোধ করুন)`;

  copyTextToClipboard(text, `📋 ${m}-এর বিল স্লিপ হোয়াটসঅ্যাপে পাঠানোর জন্য কপি হয়েছে!`);
};

// Copy Full Group WhatsApp Utility Notice
window.copyWhatsAppUtilityNotice = function() {
  if (!state.fixedBills) return;
  const monthName = state.month || 'চলতি মাস';

  let totalFixed = 0;
  let paidAmount = 0;
  let pendingAmount = 0;
  let paidCount = 0;
  let pendingCount = 0;

  const memberLines = state.members.map(m => {
    let mTotal = 0;
    const details = state.fixedBills.map(b => {
      const isExcluded = (b.note && b.note.includes('৩ জনের') && m === 'Imam') ||
                         (b.splitCount < state.members.length && m === 'Imam') ||
                         (b.title && (b.title.includes('বুয়া') || b.title.includes('খালা') || b.title.toLowerCase().includes('bua') || b.title.toLowerCase().includes('cook')) && m === 'Imam');
      const share = isExcluded ? 0 : (Number(b.amount) / (b.splitCount || state.members.length || 1));
      mTotal += share;
      const titleClean = b.title.split('(')[0].trim();
      return isExcluded ? `${titleClean} ৳০` : `${titleClean} ৳${Math.round(share)}`;
    }).join(' | ');

    totalFixed += mTotal;
    const bStatus = state.memberBillStatus?.[m] || 'Pending';
    if (bStatus === 'Paid') {
      paidCount++;
      paidAmount += mTotal;
    } else {
      pendingCount++;
      pendingAmount += mTotal;
    }

    const badge = bStatus === 'Paid' ? '[Paid 🟢]' : '[Pending 🔴]';
    return `• *${m}*: ৳${Math.round(mTotal).toLocaleString()} ${badge}\n  ↳ ${details}`;
  });

  const text = `🏠 *${monthName} - বাসা ভাড়া ও ইউটিলিটি বিল নোটিশ*
━━━━━━━━━━━━━━━━━━━━━
${memberLines.join('\n')}
━━━━━━━━━━━━━━━━━━━━━
💰 *মোট বিল:* ৳${Math.round(totalFixed).toLocaleString()}
✅ *পরিশোধিত:* ৳${Math.round(paidAmount).toLocaleString()} (${paidCount} জন)
⏳ *বকেয়া:* ৳${Math.round(pendingAmount).toLocaleString()} (${pendingCount} জন)
━━━━━━━━━━━━━━━━━━━━━
(অনুগ্রহ করে সবাই যথাসময়ে বিল পরিশোধ করুন)`;

  copyTextToClipboard(text, '📋 সম্পূর্ণ মেসের বিল নোটিশ কপি হয়েছে!');
};
