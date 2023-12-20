// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDT7o1vsaeLxOLhD2I0V9prmN3D8Y6Fn84",
  authDomain: "coq-recursos-humanos.firebaseapp.com",
  projectId: "coq-recursos-humanos",
  storageBucket: "coq-recursos-humanos.appspot.com",
  messagingSenderId: "460342143854",
  appId: "1:460342143854:web:9ba9f777cae37ed0cf2f7f",
  measurementId: "G-GR1NSWME6F"
};

// Initialize Firebase
const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export {app, storage, analytics};
