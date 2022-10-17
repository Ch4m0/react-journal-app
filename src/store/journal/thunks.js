import { PrecisionManufacturingTwoTone } from "@mui/icons-material"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { fileUpload } from "../../helpers/fileUpload"
import { loadNotes } from "../../helpers/loadNote"
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"

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


export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())

        const { uid } = getState().auth
        const { active: note } = getState().journal
        const noteToFireStore = { ...note }
        delete noteToFireStore.id
        console.log(noteToFireStore)

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)
        await setDoc(docRef, noteToFireStore, { merge: true })
        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())
        console.log("files from startUploading")
        /*        const urls = await fileUpload(files[0])
                console.log(urls, "URLS")*/

        const fileUploadPromises = []

        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises)

        console.log(photosUrls, "photoUrls")
        dispatch(setPhotosToActiveNote(photosUrls))


    }

}

export const startDeletetingNote = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().auth
        const { active: note } = getState().journal
        console.log(uid, note)

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

        await deleteDoc(docRef)
        dispatch(deleteNoteById(note.id))


    }
}