import db from "./firebase/config.js";

const chatsRef = db.collection("chats");
// const functionCallsRef = db.collection("functionCalls");  // This line isn't needed for the task at hand

const fetchChats = async () => {
  const snapshot = await chatsRef.get();
  const chats = snapshot.docs.map((doc) => ({
    id: doc.id, // Store the document ID so we can reference it for updates
    ...doc.data(),
  }));

  for (const chat of chats) {
    const lastMessage = chat.messages[chat.messages.length - 1];
    if (lastMessage?.usage) {
      const parse = JSON.parse(lastMessage.usage);
      console.log(parse.total_tokens);

      // Update the tokens attribute in Firestore for the current chat
      await chatsRef.doc(chat.id).update({
        tokens: parse.total_tokens,
      });
    }
  }
};

fetchChats();
