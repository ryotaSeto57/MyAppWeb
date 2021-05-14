import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/firestore'


var firebaseConfig = {
  apiKey: "AIzaSyBzFHl_9_uY0-ahdzHcF0EStHOH_qeJ1ik",
  authDomain: "my-app-6154a.firebaseapp.com",
  databaseURL: "https://my-app-6154a.firebaseio.com",
  projectId: "my-app-6154a",
  storageBucket: "my-app-6154a.appspot.com",
  messagingSenderId: "730774024261",
  appId: "1:730774024261:web:5aff8372cc5a8f3a20f32c",
  measurementId: "G-SB6585YQRX"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
};

const db = firebase.firestore();
const storage = firebase.storage();

export {firebase,db,storage};

