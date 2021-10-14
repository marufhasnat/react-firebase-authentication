import { confirmPasswordReset, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "@firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/init-firebase";

const AuthConext = createContext();

export const useAuth = () => useContext(AuthConext);

export default function AuthConextProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsbuscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => {
            unsbuscribe()
        }
    }, [])

    function register(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signInWithGoogle(){
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    function forgotPassword(email) {
        return sendPasswordResetEmail(auth, email, {
          url: `http://localhost:3000/login`,
        })
    }

    function resetPassword(oobCode, newPassword) {
        return confirmPasswordReset(auth, oobCode, newPassword)
    }

    function logout(){
        return signOut(auth);
    } 

    const value = {
        currentUser,
        register,
        login,
        logout,
        signInWithGoogle,
        forgotPassword,
        resetPassword
    }

    return <AuthConext.Provider value={value}>{children}</AuthConext.Provider>
}