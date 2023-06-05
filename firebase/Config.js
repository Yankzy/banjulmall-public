import { initializeApp } from "firebase/app";
// import { confirmPath, resetPath} from "logged_out/components/Routing"
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth, 
    signOut,
    sendEmailVerification,
    sendPasswordResetEmail,
    updatePassword,
    confirmPasswordReset,
    verifyPasswordResetCode,
    applyActionCode,
    updateProfile,
    onAuthStateChanged,
    // verifyBeforeUpdateEmail,
} from "firebase/auth";
import {getStorage} from 'firebase/storage'
import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../src/redux/userSlice";
import { getMessaging } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCR1s1fZd7Egb6gab44QqlkQAr0W8HYrA4",
    authDomain: "banjulmall.firebaseapp.com",
    projectId: "banjulmall",
    storageBucket: "banjulmall.appspot.com",
    messagingSenderId: "1037466701999",
    appId: "1:1037466701999:web:d2ac3fca5c08c16eefc45a",
    measurementId: "G-WBXS46VZ0H"
};

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app);
export const db = getFirestore();
// export const messaging = getMessaging(app);

export let auth;

try {
    auth = getAuth(app)
} catch (error) {
    console.log(error);
}


export const signUp = (email, password) =>{
    return createUserWithEmailAndPassword(auth, email, password)
}

export const updateInfo = (displayName)=>{
    updateProfile(auth.currentUser, {displayName: displayName })
    .catch((error) => error);
}

export const verifyEmail = () =>{
    return sendEmailVerification(auth.currentUser, {url: `${window.location.origin}/${'confirmPath'}/`})
}

export const completeVerification = (oobCode) =>{
    return applyActionCode(auth, oobCode)
}

export const resetPasswordEmail = (email) =>{
    return sendPasswordResetEmail(auth, email, {url: `${window.location.origin}/${'resetPath'}/`})
}

export const verifyCode = (oobCode) =>{
    return verifyPasswordResetCode(auth, oobCode)
}

export const confirmReset = (oobCode, newPassword) =>{
    return confirmPasswordReset(auth, oobCode, newPassword)
}

export const changePassword = (newPassword) =>{
    return updatePassword(auth.currentUser, newPassword)
}

export const login = (email, password) =>{
    return signInWithEmailAndPassword(auth, email, password)
}


export const logout = ()=>{
    return signOut(auth)
}

export const authContext = createContext();


export const FirebaseProvider = ({children}) =>{
    const dispatch = useDispatch();
    const loading = useSelector(({user}) => user.loading);
    useEffect(() => {
        auth && onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(setUser({
                    displayName: user.displayName,
                    email: user.email,
                    emailVerified: user.emailVerified,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    providerId: user.providerId,
                    lastLoginAt: user.lastLoginAt,
                    createdAt: user.createdAt,
                    multiFactor: user.multiFactor,
                }));
                dispatch(setLoading(false));
            } else {
                dispatch(setUser(null));
                dispatch(setLoading(false));
            }
            });

    }, []);
    return(
        <authContext.Provider value={{}} >
            {!loading && children}
        </authContext.Provider>
    )
}