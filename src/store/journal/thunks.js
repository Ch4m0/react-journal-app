import { collection, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { loadNotes } from "../../helpers/loadNote"
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice"

export const startNewNote = () => {


    return async (dispatch, getState) => {
        console.log(getState(), "node")

        const { uid } = getState().auth
        dispatch(savingNewNote())

        // 
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        const setDocRes = await setDoc(newDoc, newNote)

        console.log(newDoc)
        console.log(setDocRes)

        newNote.id = newDoc.id

        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

        //dispatch

    }
}

export const startLoadingNotes = () => {


    return async (dispatch, getState) => {
        const { uid } = getState().auth
        if (!uid) throw new Error('El Uid del usuario no existe')
        console.log(uid)

        const res = await loadNotes(uid)
        console.log(res)

        dispatch(setNotes(res))

    }

}