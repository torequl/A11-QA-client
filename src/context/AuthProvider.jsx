import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const axiosConfig = useAxiosSecure()
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState('');
    const googleProvider = new GoogleAuthProvider();

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
        const unsubscribe = onAuthStateChanged(auth, async currentUser => {
            if (currentUser?.email) {
                setUser(currentUser)
                const email = currentUser.email;
                await axiosConfig.post('/jwt', { email });
            } else {
                setUser(currentUser)
                await axiosConfig.get('/logout');
            }
            setLoading(false)
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
    }

    return (

        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;