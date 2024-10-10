import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCzNVE0iGQhYMF-q_uAvzELZGnWzgoilEY",
  authDomain: "my-app-83051.firebaseapp.com",
  projectId: "my-app-83051",
  storageBucket: "my-app-83051.appspot.com",
  messagingSenderId: "965599490366",
  appId: "1:965599490366:web:5992b4c64b8f790a163c6f",
  measurementId: "G-MCKPZZEEJ9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export {
  app,
  db,
  storage,
  auth,
  collection,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  doc,
};
