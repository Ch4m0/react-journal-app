import { SatelliteAltOutlined } from '@mui/icons-material'
import { createSlice } from '@reduxjs/toolkit'



export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        saveMessage: '',
        notes: [],
        active: null
        /*        active: {
                    id: 'ABC123',
                    title: '',
                    body: '',
                    date: 123456,
                    imageUrls: []
                }*/
    },

    reducers: {

        savingNewNote: (state) => {
            state.isSaving = true
        },

        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload)
            state.isSaving = false
        },

        setActiveNote: (state, action) => {
            console.log(action.payload)
            state.active = action.payload

        },
        setNotes: (state, action) => {

            state.notes = action.payload

        },

        setSaving: (state, action) => {

        },

        updateNote: (state, action) => {

        },

        deleteNoteById: (state, action) => {

        }

    }
})

export const { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById, savingNewNote } = journalSlice.actions