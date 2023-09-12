import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// import firebaseKey from "./personal-firebase-key.json" assert { type: "json" };
import firebaseKey from "./grab-firebase-key.json" assert { type: "json" };

initializeApp({
  credential: cert(firebaseKey),
});

const db = getFirestore();

export default db;