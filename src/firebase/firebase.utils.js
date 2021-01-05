import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
    apiKey: "AIzaSyA6Wydjmf7LFd_WOR7emjZspuXLAoZLU1M",
    authDomain: "crwn-db-6806f.firebaseapp.com",
    databaseURL: "https://crwn-db-6806f.firebaseio.com",
    projectId: "crwn-db-6806f",
    storageBucket: "crwn-db-6806f.appspot.com",
    messagingSenderId: "275289374647",
    appId: "1:275289374647:web:6eb7c323a6b65965673232",
    measurementId: "G-6E8YPP1BP4"
  };

export const createUserProfileDocument = async(userAuth, additionalData) => {
    //take userAuth object and create new entry in collection with userAuth ID
    //API call is asynchronous
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot=await userRef.get();

    //check if user already present in "users" collection
    if(!snapShot.exists){
        const {displayName, email } = userAuth;
        const createdAt = new Date();
        
        try{
            await userRef.set({ //async request to add to db
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }
    //retain userRef
    return userRef;
} 

firebase.initializeApp(config);

export const auth =firebase.auth(); //access to the oauth sign on
export const firestore = firebase.firestore(); //access to the firestore database

const provider = new firebase.auth.GoogleAuthProvider();    //access to the new google auth provider class from the auth library
provider.setCustomParameters({prompt: 'select_account'});   //Always trigger the google popup
export const signInWithGoogle = () => auth.signInWithPopup(provider);   //sign in with popup using the google signin service

export default firebase;