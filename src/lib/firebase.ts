// src/lib/firebase.ts

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC2lsyGPAsQnFpK7A1GQaT0qW6-DG3VwMw",
    authDomain: "thatumei-portals.firebaseapp.com",
    databaseURL: "https://thatumei-portals-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "thatumei-portals",
    storageBucket: "thatumei-portals.firebasestorage.app",
    messagingSenderId: "951780186243",
    appId: "1:951780186243:web:c165895d9a98030d3e63b6",
    measurementId: "G-T3GBLJH0MP"
};

// Next.jsのSSR環境で二重に初期化されるのを防ぐため、既に初期化されているかチェックします。
let firebaseApp: FirebaseApp;
if (!getApps().length) {
    // アプリが未初期化の場合のみ、初期化を実行
    firebaseApp = initializeApp(firebaseConfig);
} else {
    // 既に初期化されている場合は、既存のアプリインスタンスを取得
    firebaseApp = getApp();
}

// 各サービスを呼び出し、必要な場所でインポートして利用できるようにします。
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export default firebaseApp;