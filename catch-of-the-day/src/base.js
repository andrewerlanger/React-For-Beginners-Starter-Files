import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyAkoPR90OkS0H6aUVKubZoPa5RqlBDTBMg",
    authDomain: "catch-of-the-day-erlanger.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-erlanger.firebaseio.com",
    
    // These are copy/pasted from firebase but not actually required for this project
    projectId: "catch-of-the-day-erlanger",
    storageBucket: "catch-of-the-day-erlanger.appspot.com",
    messagingSenderId: "917543610881"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a NAMED export (i.e. not default)
export { firebaseApp };

// This is a DEFAULT export
export default base;