// ./src/app/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("C:/Users/maxim/Desktop/editor/src/app/editor-1a339-firebase-adminsdk-5poag-294ea84f5a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://console.firebase.google.com/u/0/project/editor-1a339/firestore/databases/-default-/data/~2Fnews~2FCou38Y0LkAfv2opKQ01w",
});

module.exports = admin;
