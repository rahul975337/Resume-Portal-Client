import firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";
var firebaseApp;

const firebaseConfig = {
  apiKey: "AIzaSyBT0hwSUgZqNP0k0UlfpoUMsIEFGFWNoH8",
  authDomain: "resume-cc97f.firebaseapp.com",
  projectId: "resume-cc97f",
  storageBucket: "resume-cc97f.appspot.com",
  messagingSenderId: "985886968778",
  appId: "1:985886968778:web:980996e0480049e49f1d33",
  measurementId: "G-56R5WK5SC7",
};
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(firebaseConfig);
} else firebase.app();
const projectStorage = firebaseApp.storage();
const projectFirestore = firebaseApp.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp, projectStorage, projectFirestore };
export default projectFirestore;
