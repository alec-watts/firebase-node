import db from "./firebase/config.js";
import { FieldValue } from "firebase-admin/firestore";

const addCreatedAtToAllDocs = async (collectionName) => {
  const collectionRef = db.collection(collectionName);
  const snapshot = await collectionRef.get();

  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    const docRef = collectionRef.doc(doc.id);
    batch.update(docRef, {
      createdAt: FieldValue.serverTimestamp(),
    });
  });

  await batch.commit();
  console.log(`Added createdAt to all documents in ${collectionName}`);
};

// Usage
addCreatedAtToAllDocs("systemPrompts");
// addCreatedAtToAllDocs("functionCalls");
// addCreatedAtToAllDocs("chats");
// addCreatedAtToAllDocs("streams");
