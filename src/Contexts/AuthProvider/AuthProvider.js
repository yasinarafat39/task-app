import React, { createContext, useEffect, useState } from 'react';
import app from '../../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

import { GoogleAuthProvider } from 'firebase/auth';


export const AuthContext = createContext();
const auth = getAuth(app);



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const GoogleProvider = new GoogleAuthProvider();

    // Create new user 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }


    // Login with email and password
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Login With Google 
    const LoginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, GoogleProvider);
    }

    // Logout system 
    const userLogout = () => {
        setLoading(true);
        return signOut(auth);
    }

    // update a user
    const updateUser = profile => {
        return updateProfile(auth.currentUser, profile);
    }

    //Password Reset
    const passwordReset = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        LoginWithGoogle,
        userLogout,
        updateUser,
        passwordReset
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        })

        return () => unsubscribe();
    }, [])


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;