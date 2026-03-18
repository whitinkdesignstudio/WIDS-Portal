# ================================================================
# WHITE INK DESIGN STUDIO PORTAL — COMPLETE SETUP GUIDE
# ================================================================
# Bilingual: English + Hindi (Hinglish)
# ================================================================

## 📦 PROJECT FILES
```
wink-portal/
├── index.html                  ← Main portal file
├── manifest.json               ← PWA manifest
├── firebase-messaging-sw.js    ← Background notifications
├── firestore.rules             ← Firestore security rules
├── css/
│   └── style.css               ← All styles
└── js/
    ├── config.js               ← 🔑 YOUR KEYS GO HERE
    ├── firebase.js             ← Firebase operations
    ├── reminders.js            ← Notification & alarm system
    └── app.js                  ← Main application logic
```

---

## STEP 1 — FIREBASE PROJECT BANAO (Create Firebase Project)

1. Browser mein kholo: https://console.firebase.google.com
2. "Add project" click karo
3. Project name: `white-ink-portal` (ya kuch bhi)
4. Google Analytics: Enable kar sakte ho (optional)
5. Project create ho jayega

---

## STEP 2 — FIREBASE AUTHENTICATION SETUP

Firebase Console → Authentication → Get Started

**Sign-in Methods enable karo:**
- Google → Enable ✓
- "Save" click karo

**Authorized domains mein add karo:**
- localhost (testing ke liye)
- Aapki actual hosting domain (e.g. portal.whiteinkdesignstudio.com)

---

## STEP 3 — FIRESTORE DATABASE SETUP

Firebase Console → Firestore Database → Create Database

1. "Start in production mode" select karo
2. Location: `asia-south1` (Mumbai — best for India)
3. "Enable" click karo

**Security Rules set karo:**
1. Firestore → Rules tab
2. `firestore.rules` file ka sara content copy karo
3. Paste karo aur "Publish" karo

**Admin email change karo rules mein:**
Line `"admin@whiteinkdesignstudio.com"` ko apna actual email se replace karo

---

## STEP 4 — FCM (PUSH NOTIFICATIONS) SETUP

Firebase Console → Project Settings → Cloud Messaging

1. "Web Push certificates" section mein
2. "Generate key pair" click karo
3. Woh VAPID key copy kar lo

---

## STEP 5 — WEB APP REGISTER KARO

Firebase Console → Project Settings → General → Your Apps

1. "</>" (Web) icon click karo
2. App nickname: `WINK Portal`
3. "Also set up Firebase Hosting" optional hai
4. Register karo
5. Config object milega — ye save karo:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "white-ink-portal.firebaseapp.com",
  projectId: "white-ink-portal",
  storageBucket: "white-ink-portal.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef...",
  measurementId: "G-XXXXXXXX"
};
```

---

## STEP 6 — GEMINI AI API KEY (Chatbots ke liye)

1. Jao: https://makersuite.google.com/app/apikey
2. "Create API Key" click karo
3. Key copy karo

---

## STEP 7 — config.js MEIN KEYS DAALO

`js/config.js` file kholo aur replace karo:

```javascript
const FIREBASE_CONFIG = {
  apiKey: "YAHAN_AAPKI_FIREBASE_API_KEY",
  authDomain: "AAPKA_PROJECT_ID.firebaseapp.com",
  projectId: "AAPKA_PROJECT_ID",
  storageBucket: "AAPKA_PROJECT_ID.appspot.com",
  messagingSenderId: "AAPKA_SENDER_ID",
  appId: "AAPKA_APP_ID",
  measurementId: "AAPKA_MEASUREMENT_ID"
};

const FIREBASE_VAPID_KEY = "AAPKI_VAPID_KEY";
const GEMINI_API_KEY = "AAPKI_GEMINI_KEY";

// IMPORTANT: Apna admin email yahan likhna
const ADMIN_EMAIL = "aap@whiteinkdesignstudio.com";
```

**firebase-messaging-sw.js mein bhi same Firebase config daalo!**

---

## STEP 8 — ADMIN: EMPLOYEES KO ACCESS DO

Admin hone ke baad:

1. Portal mein login karo (Google se)
2. Left sidebar mein "Admin" section dikhega
3. "Manage Users" click karo
4. "+ Add User" se employee email daalo
5. Woh employee ab Google se login kar payega

---

## STEP 9 — HOSTING (OPTIONAL BUT RECOMMENDED)

### Option A: Firebase Hosting (Free)

```bash
# Terminal mein:
npm install -g firebase-tools
firebase login
firebase init hosting
# Public directory: . (current folder)
# Single page app: No
firebase deploy
```

### Option B: Netlify (Aur bhi easy, free)

1. https://netlify.com par jao
2. "Add new site" → "Deploy manually"
3. `wink-portal` folder drag & drop karo
4. Automatic deploy ho jayega
5. Custom domain bhi set kar sakte ho

### Option C: Vercel

1. https://vercel.com
2. Import project → Upload folder
3. Deploy!

---

## STEP 10 — GOOGLE DRIVE INTEGRATION (File storage)

1. https://console.cloud.google.com jaao
2. Same Google project select karo
3. APIs & Services → Library
4. "Google Drive API" search karo → Enable karo
5. Employees portal se files upload kar sakte hain

---

## STEP 11 — GOOGLE CALENDAR INTEGRATION (Meetings)

Same Google Cloud Console mein:
1. "Google Calendar API" enable karo
2. OAuth consent screen setup karo
3. Meetings schedule karne par Google Calendar mein automatically add ho jayega

---

## 🔔 NOTIFICATIONS KAISE KAAM KARTI HAIN

| Type | Kaise |
|------|-------|
| Office reminder | Browser notification 5 min pehle |
| Task deadline | Browser notification 10 min pehle |
| Alarm overlay | Portal ke andar red full-screen alarm |
| Sound | Web Audio API se beep sound |
| Background | Service Worker (tab band ho tab bhi) |

**Mobile mein bhi kaam karega agar:**
- Chrome/Edge browser use ho
- "Add to Home Screen" karo (PWA)
- Notification permission di hui ho

---

## 🛠️ TROUBLESHOOTING

**Problem: Login nahi ho raha**
→ Firebase Authentication mein authorized domain check karo
→ Google Sign-In enabled hai ki nahi check karo

**Problem: Notifications nahi aa rahi**
→ Browser mein notification permission grant karo
→ VAPID key sahi hai ki check karo
→ firebase-messaging-sw.js correct location mein hai ki nahi

**Problem: Data save nahi ho raha**
→ Firestore rules check karo
→ Console mein error dekho (F12 → Console)

**Problem: Admin options nahi dikh rahe**
→ ADMIN_EMAIL config.js mein aapka exact Google email hai?

---

## 📱 MOBILE PAR INSTALL KAISE KAREN

### Android (Chrome):
1. Portal open karo Chrome mein
2. 3-dot menu → "Add to Home Screen"
3. Install karo
4. Ab app jaisi kaam karegi

### iPhone (Safari):
1. Portal open karo Safari mein
2. Share button → "Add to Home Screen"
3. Install karo

---

## 🔒 SECURITY TIPS

1. Admin email sirf aapka hona chahiye
2. Firebase rules sahi se set karo (firestore.rules file use karo)
3. API keys kabhi public repo mein mat daalo
4. Regularly allowed users list check karo

---

## 📞 FEATURES SUMMARY

| Feature | Status |
|---------|--------|
| Google Login | ✅ Ready |
| Admin access control | ✅ Ready |
| Employee setup (office hours) | ✅ Ready |
| Attendance (mark in/out) | ✅ Ready |
| Late reason selection | ✅ Ready |
| Task management | ✅ Ready |
| Task deadline alarms | ✅ Ready |
| Change requests | ✅ Ready |
| Break tracking (lunch/tea) | ✅ Ready |
| Leave requests | ✅ Ready |
| Meeting scheduler | ✅ Ready |
| Activities | ✅ Ready |
| Performance charts | ✅ Ready |
| Content posting schedule | ✅ Ready |
| Approvals management | ✅ Ready |
| 3 AI Chatbots (Gemini) | ✅ Ready |
| Reports & history | ✅ Ready |
| Admin dashboard | ✅ Ready |
| Login history | ✅ Ready |
| Client SOP management | ✅ Ready |
| Push notifications | ✅ Ready |
| Browser alarms + sound | ✅ Ready |
| Mobile responsive | ✅ Ready |
| PWA (installable) | ✅ Ready |
| Future task reminders | ✅ Ready |
| Pending task alerts | ✅ Ready |
| White Ink brand theme | ✅ Ready |

---

Made with ❤️ for White Ink Design Studio
