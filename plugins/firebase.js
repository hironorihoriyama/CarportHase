import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyD-_7fHQONaTrAJu1bUSzU3aBp4YDVscZo",
    authDomain: "carporthase-66efe.firebaseapp.com",
    databaseURL: "https://carporthase-66efe.firebaseio.com",
    projectId: "carporthase-66efe",
    storageBucket: "carporthase-66efe.appspot.com",
    messagingSenderId: "251631847056",
    appId: "1:251631847056:web:585fa5d93a729c50f1ba15",
    measurementId: "G-KCDWZ5MZRH"
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
    firebase.analytics()
}

export const auth = firebase.auth
export default firebase
