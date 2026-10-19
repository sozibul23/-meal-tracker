/**
 * Firebase Realtime Cloud Synchronization
 * Connects Meal Tracker with Firebase Firestore
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
const FIRESTORE_DOC_PATH = 'mess_data/october_2026';

let db = null;
let isCloudConnected = false;
let isSyncingFromRemote = false;

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

function initFirebase(onRemoteChange) {
  const config = getStoredFirebaseConfig();

  // Check if user has provided real credentials
  if (!config.projectId || config.projectId === 'YOUR_PROJECT_ID') {
    console.log('Firebase not configured yet. Operating in LocalStorage mode.');
    updateSyncIndicator(false, 'লোকাল মোড (ক্লাউড সেটআপ করুন)');
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

    // Realtime Listener
    db.doc(FIRESTORE_DOC_PATH).onSnapshot((doc) => {
      if (doc.exists) {
        const cloudData = doc.data();
        if (cloudData && onRemoteChange) {
          isSyncingFromRemote = true;
          onRemoteChange(cloudData);
          isSyncingFromRemote = false;
          updateSyncIndicator(true, 'লাইভ ক্লাউড সিঙ্কড');
        }
      } else {
        console.log('No document in Firestore yet. Pushing local state...');
        if (typeof state !== 'undefined') {
          pushStateToFirebase(state);
        }
      }
    }, (error) => {
      console.error('Firestore listener error:', error);
      updateSyncIndicator(false, 'সিঙ্ক ত্রুটি (চেক করুন)');
    });

  } catch (e) {
    console.error('Firebase initialization error', e);
    updateSyncIndicator(false, 'কানেকশন ফেইল্ড');
  }
}

// Push local changes to Firestore
function pushStateToFirebase(currentState) {
  if (!db || !isCloudConnected || isSyncingFromRemote) return;

  db.doc(FIRESTORE_DOC_PATH).set(currentState, { merge: true })
    .then(() => {
      updateSyncIndicator(true, 'লাইভ ক্লাউড সিঙ্কড');
    })
    .catch((err) => {
      console.error('Error uploading to Firestore:', err);
      updateSyncIndicator(false, 'অফলাইন মোড');
    });
}

function updateSyncIndicator(isOnline, text) {
  const el = document.getElementById('cloudSyncIndicator');
  if (!el) return;

  el.innerHTML = `
    <span class="status-dot ${isOnline ? 'online' : 'offline'}"></span>
    <span class="status-text">${text}</span>
  `;
}
