import { SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography, useFormControl } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ImageGallery } from "../components";

import { useEffect } from "react";
import { useForm } from "../../hooks";
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletetingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import { useRef } from "react";

export const NoteView = () => {

  const dispatch = useDispatch();

  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal)

  const { body, title, date, onInputChange, formState } = useForm(note)

  const fileInputRef = useRef()

  const dateString = useMemo(() => {
    const newDate = new Date(date)
    return newDate.toUTCString()
  }, [date])

  useEffect(() => {
    dispatch(setActiveNote(formState))
  }, [formState])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Actualizado', 'Nota actualizada', 'success')
    }

  }, [messageSaved])

  const onSaveNote = () => {
    dispatch(startSaveNote());
  }

  const onFileInputChange = ({ target }) => {
    console.log(target.files)
    if (target.files.length == 0) return;
    dispatch(startUploadingFiles(target.files))
  }

  const onDelete = (id) => {
    dispatch(startDeletetingNote())
  }

  return (
    <Grid
      className="animate__animated animate__fadeIn animate__faster"
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input type="file" multiple onChange={onFileInputChange} style={{ display: "none" }} ref={fileInputRef} />

        <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
          <UploadFileOutlined />
        </IconButton>

        <Button color="primary" sx={{ padding: 2 }} onClick={onSaveNote}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}

        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid container justifyContent='end'>
        <Button onClick={() => onDelete(note.id)} sx={{ mt: 2 }} color="error">
          Borrar
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery images={note.imageUrls} />
    </Grid >
  );
};
