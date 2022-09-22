import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {

    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        console.log(result.user, "result")

        const { displayName, email, photoURL, uid } = result.user

        return {
            ok: true,
            //user info
            displayName, email, photoURL, uid
        }

    } catch (error) {
        console.log(error)
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }

    }

}



export const registerUserWithEmailPassword = async ({ email, password, displayName }) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user
        console.log(resp)
        //TODO: actualizar el displayName en firebase
        await updateProfile(FirebaseAuth.currentUser, { displayName })

        return {
            ok: true,
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error) {

        return { ok: false, errorMessage: error.message }
    }

}

export const loginWithEmailPassword = async (params) => {

    console.log("entrooo")
    try {

        const resp = await signInWithEmailAndPassword(FirebaseAuth, params.email, params.password)
        console.log(resp)
        const { email, displayName, photoURL, uid } = resp.user

        return {
            ok: true,
            email, displayName, photoURL, uid
        }



    } catch (err) {
        console.log(err)
        return {
            ok: false,
            errorMessage: err.message
        }


    }

}


export const logoutFirebase = async () => {

    return await FirebaseAuth.signOut()
}
