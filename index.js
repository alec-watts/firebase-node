import admin from "firebase-admin";
import firebaseKey from "./firebase-key.json" assert { type: "json" };

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

console.log(firebaseKey);
admin.initializeApp({
  credential: admin.credential.cert(firebaseKey),
});

const db = admin.firestore();

let moviesRef = db.collection("movies");

moviesRef
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  })
  .catch((err) => {
    console.log("Error getting documents", err);
  });
