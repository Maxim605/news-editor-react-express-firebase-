// ./src/app/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("C:/Users/maxim/Desktop/editor/src/app/editor-1a339-firebase_key.json");
process.env.GOOGLE_APPLICATION_CREDENTIALS = "C:/Users/maxim/Desktop/editor/src/app/editor-1a339-firebase_key.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://editor-1a339.firebaseio.com",
});

const db = admin.firestore();
module.exports = db; 
