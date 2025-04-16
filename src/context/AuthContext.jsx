import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult 
} from 'firebase/auth';
import { auth } from '../lib/firebase';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
        // signInWithRedirect(auth, provider)
    };

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        // First, get the result of the Google redirect
        // getRedirectResult(auth)
        //     .then((result) => {
        //         if (result?.user) {
        //             console.log("Google Redirect Result User:", result.user);
        //             setUser(result.user);
        //         }
        //     })
        //     .catch((error) => {
        //         console.error("Google Sign-In Error:", error);
        //     });
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log("currentUser", currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <UserContext.Provider value={{ createUser, user, logout, signIn, googleSignIn }}>
            {children}
        </UserContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(UserContext);
};