import firebaseConfig from "./config";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// init firebase
firebase.initializeApp(firebaseConfig);

// init auth service
const projectAuth = firebase.auth();

// init firestore service
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// export firestore
export { projectFirestore, timestamp, projectAuth };
