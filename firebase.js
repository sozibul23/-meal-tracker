/**
 * Firebase Realtime Cloud Synchronization
 * Connects Meal Tracker with Firebase Firestore
 * Supports Multi-Month Archives & Realtime Switching
 */

// Your Firebase Config
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyC58uwyLswooi-aF5tApVrukYdmzNU04pM",
  authDomain: "our-mess-tracker.firebaseapp.com",
  projectId: "our-mess-tracker",
  storageBucket: "our-mess-tracker.firebasestorage.app",
  messagingSenderId: "756444277675",
  appId: "1:756444277675:web:b6521949d8e792a19300ee"
};

const FIREBASE_CONFIG_STORAGE_KEY = 'MESS_FIREBASE_CONFIG';

let db = null;
let isCloudConnected = false;
let isSyncingFromRemote = false;
let activeDocUnsubscribe = null;
let activeMetaUnsubscribe = null;
let activeMonthDocId = '2026-10';
let remoteStateChangeCallback = null;

function getStoredFirebaseConfig() {
  try {
    const raw = localStorage.getItem(FIREBASE_CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.projectId && parsed.projectId !== 'YOUR_PROJECT_ID') {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Error reading stored Firebase config', e);
  }
  return DEFAULT_FIREBASE_CONFIG;
}

function saveFirebaseConfig(config) {
  try {
    localStorage.setItem(FIREBASE_CONFIG_STORAGE_KEY, JSON.stringify(config));
    window.location.reload();
  } catch (e) {
    console.error('Failed to save config', e);
  }
}

function getFirestoreDocPath(monthId) {
  // Preserve existing document for October 2026
  if (monthId === '2026-10' || monthId === 'october_2026') {
    return 'mess_data/october_2026';
  }
  return `mess_data/${monthId}`;
}

function initFirebase(onRemoteChange, onMetaChange) {
  const config = getStoredFirebaseConfig();
  remoteStateChangeCallback = onRemoteChange;

  if (!config.projectId || config.projectId === 'YOUR_PROJECT_ID') {
    console.log('Firebase not configured yet. Operating in LocalStorage mode.');
    updateSyncIndicator(false, 'লোকাল মোড (ক্লাউড ডিসকানেক্টেড)');
    return;
  }

  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    db = firebase.firestore();
    
    // Enable offline persistence
    db.enablePersistence({ synchronizeTabs: true }).catch((err) => {
      console.warn('Persistence error:', err.code);
    });

    isCloudConnected = true;
    updateSyncIndicator(true, 'লাইভ ক্লাউড সিঙ্কড');

    // Listen to current active month
    listenToMonth(activeMonthDocId, onRemoteChange);

    // Listen to months list metadata
    activeMetaUnsubscribe = db.doc('mess_meta/months').onSnapshot((doc) => {
      if (doc.exists) {
        const meta = doc.data();
        if (meta && Array.isArray(meta.list) && onMetaChange) {
          onMetaChange(meta.list);
        }
      } else {
        if (typeof allMonths !== 'undefined') {
          syncMonthsMetaToCloud(allMonths);
        }
      }
    }, (err) => {
      console.warn('Meta listener error', err);
    });

  } catch (e) {
    console.error('Firebase initialization error', e);
    updateSyncIndicator(false, 'ফায়ারবেস সংযোগ ব্যর্থ');
  }
}

function listenToMonth(monthId, onRemoteChange) {
  activeMonthDocId = monthId || '2026-10';
  if (onRemoteChange) remoteStateChangeCallback = onRemoteChange;
  if (!db || !isCloudConnected) return;

  if (activeDocUnsubscribe) {
    activeDocUnsubscribe();
    activeDocUnsubscribe = null;
  }

  const currentListeningMonth = activeMonthDocId;
  const docPath = getFirestoreDocPath(currentListeningMonth);

  activeDocUnsubscribe = db.doc(docPath).onSnapshot((doc) => {
    if (doc.exists) {
      const cloudData = doc.data();
      if (cloudData && remoteStateChangeCallback) {
        isSyncingFromRemote = true;
        remoteStateChangeCallback(cloudData, currentListeningMonth);
        isSyncingFromRemote = false;
        updateSyncIndicator(true, 'লাইভ ক্লাউড সিঙ্কড');
      }
    } else {
      console.log(`No document for ${docPath} in Firestore yet. Pushing local state...`);
      if (typeof state !== 'undefined' && state) {
        pushStateToFirebase(state, currentListeningMonth);
      }
    }
  }, (error) => {
    console.error('Firestore listener error:', error);
    updateSyncIndicator(false, 'সিঙ্ক ত্রুটি (অফলাইন)');
  });
}

// Push local changes to Firestore
function pushStateToFirebase(currentState, overrideMonthId) {
  if (!db || !isCloudConnected || isSyncingFromRemote) return;

  const targetMonthId = overrideMonthId || (currentState && currentState.monthId) || activeMonthDocId || '2026-10';
  const docPath = getFirestoreDocPath(targetMonthId);
  db.doc(docPath).set(currentState)
    .then(() => {
      updateSyncIndicator(true, 'লাইভ ক্লাউড সিঙ্কড');
    })
    .catch((err) => {
      console.error('Error uploading to Firestore:', err);
      updateSyncIndicator(false, 'আপলোডে সমস্যা');
    });
}

function syncMonthsMetaToCloud(monthsList) {
  if (!db || !isCloudConnected || !Array.isArray(monthsList)) return;
  db.doc('mess_meta/months').set({ list: monthsList }, { merge: true })
    .catch(err => console.warn('Could not sync months metadata', err));
}

function updateSyncIndicator(isOnline, text) {
  const el = document.getElementById('cloudSyncIndicator');
  if (!el) return;

  el.innerHTML = `
    <span class="status-dot ${isOnline ? 'online' : 'offline'}"></span>
    <span class="status-text">${text}</span>
  `;
}