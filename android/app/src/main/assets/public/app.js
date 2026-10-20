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

  const membersList = (carryOverMembers && typeof state !== 'undefined' && state && state.members && state.members.length > 0)
    ? [...state.members]
    : ['Sadhin', 'Tanzid', 'Akhirul', 'Imam'];

  const freshMeals = {};
  for (let d = 1; d <= daysInMonth; d++) {
    freshMeals[d] = {};
    membersList.forEach(m => freshMeals[d][m] = 0);
  }

  const freshDeposits = {};
  membersList.forEach(m => freshDeposits[m] = 0);

  const defaultBills = [
    { id: 1, title: 'বাসা ভাড়া (Room Rent)', amount: 0, status: 'Due', note: 'সকল সদস্যের মাঝে ভাগ' },
    { id: 2, title: 'খালা / বাবুর্চি বিল (Cook Bill)', amount: 0, status: 'Due', note: 'সকল সদস্যের মাঝে ভাগ' },
    { id: 3, title: 'ওয়াইফাই বিল (WiFi Bill)', amount: 0, status: 'Due', note: 'সকল সদস্যের মাঝে ভাগ' },
    { id: 4, title: 'গ্যাস / সিলিন্ডার বিল (Gas Bill)', amount: 0, status: 'Due', note: 'সকল সদস্যের মাঝে ভাগ' },
    { id: 5, title: 'ময়লা বিল (Dust/Waste)', amount: 0, status: 'Due', note: 'সকল সদস্যের মাঝে ভাগ' }
  ];

  return {
    month: enName,
    monthBn: bnName,
    monthId: monthId,
    daysInMonth: daysInMonth,
    members: membersList,
    adminPin: (typeof state !== 'undefined' && state && state.adminPin) ? state.adminPin : '1234',
    deposits: freshDeposits,
    bazar: [],
    meals: freshMeals,
    fixedBills: defaultBills,
    sharedItems: []
  };
}

loadMonthsList();

const STORAGE_KEY = 'MESS_MINIMAL_DATA_V2';
const THEME_KEY = 'MESS_THEME';
const ADMIN_SESSION_KEY = 'MESS_ADMIN_LOGGED_IN';

// App State
let state = loadState();
let isAdmin = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';

function loadState(monthId = currentMonthId) {
  const key = getStorageKeyForMonth(monthId);
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.deposits) {
        parsed.deposits = {};
        (parsed.members || []).forEach(m => parsed.deposits[m] = 0);
      }
      ensureDepositHistory(parsed);
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
  let totalDeposit = 0;
  state.members.forEach(m => {
    if (state.deposits[m] === undefined) state.deposits[m] = 0;
    totalDeposit += Number(state.deposits[m]) || 0;
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
    const deposit = Number(state.deposits[name]) || 0;
    const meals = memberMeals[name] || 0;
    const mealCost = meals * mealRate;
    const foodBalance = deposit - mealCost;

    const sharedPaid = memberSharedPaid[name] || 0;
    const sharedBalance = sharedPaid - perMemberSharedCost;

    // Final Net Balance = (Deposit - Food Meal Cost) + (Shared Items Paid - Shared Item Equal Share)
    const balance = foodBalance + sharedBalance;

    return {
      name,
      meals,
      deposit,
      mealCost,
      foodBalance,
      sharedPaid,
      sharedBalance,
      balance,
      status: balance > 0.01 ? 'positive' : balance < -0.01 ? 'negative' : 'neutral'
    };
  });

  const totalFixed = (state.fixedBills || []).reduce((s, b) => s + (Number(b.amount) || 0), 0);
  const totalShared = totalSharedBazar;
  const settlementTransfers = computeSettlement(memberSummaries);

  return {
    totalDeposit,
    totalBazar,
    totalFoodBazar,
    totalSharedBazar,
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
  document.getElementById('kpiBazarCount').textContent = `খাবার: ${formatBDT(metrics.totalFoodBazar)} • মেস সামগ্রী: ${formatBDT(metrics.totalSharedBazar)}`;
  
  const remEl = document.getElementById('kpiRemainingFund');
  remEl.textContent = formatBDT(metrics.remainingFund);
  remEl.style.color = metrics.remainingFund < 0 ? 'var(--danger)' : 'var(--text-main)';
  document.getElementById('kpiFundStatus').textContent = metrics.remainingFund >= 0 
    ? 'ক্যাশে জমা উদ্বৃত্ত আছে' 
    : 'ঘাটতি (ফান্ডে অতিরিক্ত টাকা লাগবে)';

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

    const isPositive = m.balance > 0.01;
    const isNegative = m.balance < -0.01;
    const statusBadge = isPositive 
      ? `<span class="badge badge-green">পাবে</span>` 
      : isNegative 
        ? `<span class="badge badge-red">দেবে</span>` 
        : `<span class="badge">ক্লিয়ার</span>`;

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
        ${statusBadge}
      </div>

      <div class="member-balance-box">
        <span class="text-sm text-muted">${isPositive ? 'ফেরত পাবে' : isNegative ? 'দিতে হবে' : 'ব্যালেন্স'}</span>
        <span class="balance-num ${balanceClass}">${balanceText}</span>
      </div>

      <div class="member-breakdown">
        <span>জমা: <b class="mono">৳${Math.round(m.deposit).toLocaleString()}</b> ${isAdmin ? `<button class="btn btn-sm btn-ghost" style="padding:0 4px;" onclick="openQuickDeposit('${m.name}')" title="জমা এন্ট্রি">✎</button>` : ''}</span>
        <span>খরচ: <b class="mono">৳${Math.round(m.mealCost).toLocaleString()}</b></span>
      </div>
    `;
    container.appendChild(card);
  });

  // Recent Bazar List (Modern Card Items)
  const recentContainer = document.getElementById('dashboardRecentBazar');
  if (recentContainer) {
    const recentItems = state.bazar.slice(-5).reverse();
    if (recentItems.length === 0) {
      recentContainer.innerHTML = `
        <div class="text-center text-muted" style="padding: 20px; font-size: 0.85rem;">
          এখনো কোনো বাজার খরচ যোগ করা হয়নি
        </div>
      `;
    } else {
      recentContainer.innerHTML = recentItems.map(b => `
        <div class="tx-card-item">
          <div class="tx-card-left">
            <div class="tx-avatar-chip">${b.shopper.charAt(0)}</div>
            <div class="tx-details">
              <div class="tx-title" style="display:flex; align-items:center; gap:6px;">
                <span>${b.item}</span>
                ${(b.category === 'shared' || b.type === 'shared') 
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
                <button class="btn-action-edit" onclick="openEditBazarModal(${b.id})" title="এডিট করুন">✏️</button>
                <button class="btn-action-delete" onclick="deleteBazar(${b.id})" title="মুছে ফেলুন">🗑️</button>
              </div>
            ` : ''}
          </div>
        </div>
      `).join('');
    }
  }

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
      <td>
        ${b.item} 
        ${(b.category === 'shared' || b.type === 'shared') 
          ? `<span class="badge" style="background:rgba(192,132,252,0.15); color:#c084fc; font-size:0.65rem; padding:1px 5px;">🧴 মেস সামগ্রী</span>`
          : `<span class="badge" style="background:rgba(212,249,56,0.12); color:var(--accent); font-size:0.65rem; padding:1px 5px;">🍚 খাবার</span>`}
        <span class="text-dim text-sm">(${b.date || 'October'})</span>
      </td>
      <td class="text-right mono"><b>${formatBDT(b.amount)}</b></td>
      <td class="text-center admin-only-cell" style="display: ${isAdmin ? 'table-cell' : 'none'};">
        <div style="display: inline-flex; gap: 4px; align-items: center; justify-content: center;">
          <button class="btn-action-edit" onclick="openEditBazarModal(${b.id})" title="এডিট করুন">✏️</button>
          <button class="btn-action-delete" onclick="deleteBazar(${b.id})" title="মুছে ফেলুন">🗑️</button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.deleteBazar = function(id) {
  if (!isAdmin) return;
  const item = state.bazar.find(b => String(b.id) === String(id));
  const desc = item ? `"${item.item}" (${formatBDT(item.amount)})` : 'এই বাজার এন্ট্রিটি';
  if (confirm(`আপনি কি নিশ্চিতভাবে ${desc} মুছে ফেলতে চান?`)) {
    state.bazar = state.bazar.filter(b => String(b.id) !== String(id));
    saveState();
    renderAll();
    showToast('বাজার এন্ট্রি সফলভাবে মুছে ফেলা হয়েছে');
  }
};

window.openEditBazarModal = function(id) {
  if (!isAdmin) {
    showToast('শুধুমাত্র এডমিন এডিট করতে পারবেন');
    return;
  }
  const item = state.bazar.find(b => String(b.id) === String(id));
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
  if (catSelect) catSelect.value = item.category || item.type || 'food';

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
    if (st.deposits && typeof st.deposits === 'object') {
      let idCounter = 1;
      Object.keys(st.deposits).forEach(member => {
        const amt = Number(st.deposits[member]) || 0;
        if (amt > 0) {
          st.depositHistory.push({
            id: 'init-' + idCounter++,
            member: member,
            amount: amt,
            date: '1 ' + (st.month || 'October 2026'),
            note: 'প্রারম্ভিক মেস ফান্ড জমা'
          });
        }
      });
    }
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

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted" style="padding: 20px; font-size: 0.85rem;">
        কোনো জমার রেকর্ড পাওয়া যায়নি
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.slice(0, 10).map(d => `
    <div class="tx-card-item">
      <div class="tx-card-left">
        <div class="tx-avatar-chip" style="background: rgba(74, 222, 128, 0.15); color: #4ade80;">💰</div>
        <div class="tx-details">
          <div class="tx-title">${d.member} ${d.note ? `<span style="font-weight:400; font-size:0.8rem; color:var(--text-muted);">• ${d.note}</span>` : ''}</div>
          <div class="tx-sub"><span>${d.date || 'তারিখ নেই'}</span></div>
        </div>
      </div>
      <div class="tx-card-right">
        <span class="tx-amount positive">+ ৳${Number(d.amount).toLocaleString()}</span>
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
  renderUtilities(metrics);
  renderSettlement(metrics);
  renderUserManagement();
  renderMonthSwitcher();
  renderDepositHistoryTable();
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
  // Theme Toggle
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
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
  window.openBazarModalGlobal = openBazarModal;

  document.getElementById('openAddBazarBtn').addEventListener('click', openBazarModal);
  document.getElementById('closeBazarModalBtn').addEventListener('click', closeBazarModal);
  document.getElementById('cancelBazarModalBtn').addEventListener('click', closeBazarModal);

  
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
      }
    });
  }

  // Edit Deposit Modal Listeners
  const editDepositModal = document.getElementById('editDepositModal');
  const closeEditDepositModal = () => { if (editDepositModal) editDepositModal.classList.remove('open'); };
  const closeEditDepositBtn = document.getElementById('closeEditDepositModalBtn');
  const cancelEditDepositBtn = document.getElementById('cancelEditDepositModalBtn');
  if (closeEditDepositBtn) closeEditDepositBtn.addEventListener('click', closeEditDepositModal);
  if (cancelEditDepositBtn) cancelEditDepositBtn.addEventListener('click', closeEditDepositModal);

  const editDepositForm = document.getElementById('editDepositForm');
  if (editDepositForm) {
    editDepositForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!isAdmin) return;
      const id = document.getElementById('editDepositId').value;
      const member = document.getElementById('editDepositMemberSelect').value;
      const amount = Number(document.getElementById('editDepositAmountInput').value);
      const date = document.getElementById('editDepositDateInput').value.trim();
      const note = document.getElementById('editDepositNoteInput').value.trim();

      if (!member || isNaN(amount) || amount <= 0) {
        showToast('সঠিক জমার পরিমাণ দিন');
        return;
      }

      ensureDepositHistory(state);
      const idx = state.depositHistory.findIndex(d => String(d.id) === String(id));
      if (idx !== -1) {
        state.depositHistory[idx].member = member;
        state.depositHistory[idx].amount = amount;
        state.depositHistory[idx].date = date;
        state.depositHistory[idx].note = note;

        recalculateDepositsFromHistory();
        saveState();
        closeEditDepositModal();
        renderAll();
        showToast('ফান্ড জমা এন্ট্রি সফলভাবে আপডেট করা হয়েছে!');
      }
    });
  }

  document.getElementById('bazarForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const shopper = document.getElementById('modalShopperSelect').value;
    const item = document.getElementById('modalItemInput').value.trim();
    const amount = Number(document.getElementById('modalAmountInput').value);
    const catEl = document.getElementById('modalBazarCategorySelect');
    const category = catEl ? catEl.value : 'food';

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
        showToast('নতুন মাস শুরু করতে এডমিন লগইন করুন');
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
  const LATEST_BUILD = '2026-10-20-v8';
  const current = localStorage.getItem('meal_tracker_build');
  if (current !== LATEST_BUILD) {
    localStorage.setItem('meal_tracker_build', LATEST_BUILD);
    if (current && window.location.search.indexOf('t=') === -1) {
      window.location.replace(window.location.origin + window.location.pathname + '?t=' + Date.now());
    }
  }
})();
