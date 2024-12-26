import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import axios from "axios";
import axiosInstance from "../axiosInstance";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState(null);

    const googleProvider = new GoogleAuthProvider();

    const [myQueries, setMyQueries] = useState([]);

    useEffect(() => {
        axiosInstance.get('my-queries', { params: { email: user?.email } })
        .then(response => setMyQueries(response.data))
        .catch(error => {
            console.error("Error loading recommendations:", error);
            throw new Response("Failed to load data", { status: error.response?.status || 500 });
        });
    }, [user?.email]);

    // TODO: Sign Up with Email And Password
    const handleRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // TODO: Login with Email And Password
    const handelLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)

    }

    // Google Login 
    const handelGoogleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    // Update Profile 
    const updateUserProfile = (updateData) => {
        setLoading(true)
        return updateProfile(auth.currentUser, updateData);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log(currentUser);

            if(currentUser?.email){
                const user = {email: currentUser.email};
                axios.post('http://localhost:5000/jwt', user, {
                    withCredentials: true,
                })
                .then(res => {
                    console.log(res.data)
                    setLoading(false)
                })
            }
            else {
                axios.post('http://localhost:5000/logout', {} ,{
                    withCredentials: true,
                })
                .then(res => {
                    console.log('logout', res.data)
                    setLoading(false)
                })
            }

            return () => {
                unsubscribe()
            }
        })
    })


    const authInfo = {
        handleRegister,
        handelLogin,
        handelGoogleLogin,
        updateUserProfile,
        user,
        loading,
        setMyQueries,
        myQueries,
    }

    return (

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;