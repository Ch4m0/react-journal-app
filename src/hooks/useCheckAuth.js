import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { startLoadingNotes } from "../store/journal/thunks";




export const useCheckAuth = () => {
    const { status } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(FirebaseAuth, async (user) => {
            console.log(user, "USER");

            if (!user) return dispatch(logout());

            const { uid, email, photoURL, displayName } = user;


            dispatch(login({ uid, email, photoURL, displayName }));
            dispatch(startLoadingNotes())
        });
    }, []);

    return { status }

}