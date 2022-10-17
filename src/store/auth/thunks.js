import { doc } from "firebase/firestore/lite"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {

    return (dispatch) => {
        dispatch(checkingCredentials())
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await signInWithGoogle()
        console.log(result)
        if (!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result))
    }

}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {

    return async (dispatch) => {

        dispatch(checkingCredentials())
        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })

        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, displayName, email, photoURL }))

    }

}

export const startLoginWithEmailPassword = (params) => {

    return async (dispatch) => {

        dispatch(checkingCredentials())

        const { ok, email, displayName, photoURL, uid, errorMessage } = await loginWithEmailPassword({ email: params.email, password: params.password })

        if (!ok) return dispatch(logout({ errorMessage }))
        dispatch(login({ ok, email, displayName, photoURL, uid }))

    }

}


export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase()
        console.log("entrooo")
        dispatch(clearNotesLogout())
        dispatch(logout())
    }
}
