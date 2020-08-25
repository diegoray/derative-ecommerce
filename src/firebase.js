import firebase from 'firebase';
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDaP72ghEw3sZwyaWkqc5itwoNlrSVsBGk",
    authDomain: "derative-ecommerce.firebaseapp.com",
    databaseURL: "https://derative-ecommerce.firebaseio.com",
    projectId: "derative-ecommerce",
    storageBucket: "derative-ecommerce.appspot.com",
    messagingSenderId: "371767737273",
    appId: "1:371767737273:web:6774fd745218db15191468"
  };
  
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  export {fb, db};