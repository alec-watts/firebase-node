import fs from "fs";
import path from "path";
import db from "./firebase/config.js";
import { exit } from "process";

// Define the path to the SystemPrompts folder
const systemPromptsDir = './grab/SystemPrompts';
const files = fs.readdirSync(systemPromptsDir);
const parsedContents = {};

// Iterate over each file
files.forEach((file) => {
  const filePath = path.join(systemPromptsDir, file);
  const content = fs.readFileSync(filePath, "utf-8");
  const parsedContent = JSON.parse(content);
  parsedContents[file] = parsedContent;
});

(async function uploadToFirestore() {
  for (const [filename, content] of Object.entries(parsedContents)) {
    // Extract the 'id' and use it as the Firestore document identifier
    const docId = content.id;

    // Ensure the 'id' exists
    if (!docId) {
      console.error(`Missing 'id' in ${filename}. Skipping...`);
      continue;
    }

    // Remove the 'id' from the content object so it's not part of the document's .data()
    delete content.id;

    try {
      await db.collection("systemPrompts").doc(docId).set(content);
      console.log(
        `Uploaded data from ${filename} to Firestore using id ${docId}.`
      );
    } catch (error) {
      console.error(`Failed to upload data from ${filename}:`, error);
    }
  }
})();
