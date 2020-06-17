import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Input,
  FormHelperText,
  Button,
  LinearProgress,
} from '@material-ui/core';
import api from '../../api';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    textAlign: 'center',
  },
  alert: {
    position: 'fixed',
    top: '35px',
    margin: '0px auto',
  },
  h1: {
    fontSize: '40px',
    marginBottom: '1em',
  },
  h2: {
    fontSize: '30px',
    marginBottom: '1em',
    color: 'black',
  },
  form: {
    width: '50vw',
    minWidth: '200px',
  },
  btn: {
    marginTop: '1em',
    width: '100px',
    fontSize: '20px',
  },
}));

export default function Raport() {
  const classes = useStyles();
  const [sendBtn, setSendBtn] = React.useState(true);
  const [fileName, setFileName] = React.useState('Brak pliku');
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [loaded, setLoaded] = React.useState(0);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [isSend, setIsSend] = React.useState(false);

  const handleFile = (event) => {
    const file = event.target.files[0];
    let typeFile = file.name.split('.');
    typeFile = typeFile[typeFile.length - 1];
    if (event.target.files.length !== 1) {
      setError(true);
      setErrorMessage('Wybierz tylko jeden plik');
    } else if (typeFile !== 'pdf') {
      setError(true);
      setErrorMessage('Plik musi mieć format pdf');
    } else {
      setError(false);
      setSelectedFile(file);
      setFileName(file.name);
      setSendBtn(false);
    }
  };

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.getStudentById();
      const student = result.data;
      setIsSend(student.raport);
    };
    fetchData();
  }, []);

  const handleSaveFile = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://amalus.no-ip.org:3002/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('key-jwt-pwr-21'),
        },
        onUploadProgress: (progressEvent) => {
          setLoaded(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
          setTimeout(() => setLoaded(0), 10000);
        },
      });
      setSuccess('Poprawnie przesłano plik');
      setTimeout(() => setSuccess(''), 10000);
    } catch (err) {
      setError(true);
      setErrorMessage('Nie udało się przesłanie pliku');
    }
  };

  return (
    <div className={classes.root}>
      {error && (
        <Alert className={classes.alert} severity="error">
          {errorMessage}
        </Alert>
      )}
      {success && (
        <Alert className={classes.alert} severity="success">
          {success}
        </Alert>
      )}
      <Typography color="textSecondary" variant="h1" className={classes.h1}>
        Sprawozdanie
      </Typography>
      {isSend ? (
        <Typography color="textSecondary" variant="h2" className={classes.h2}>
          Plik ze sprawozdaniem został już przesłany
        </Typography>
      ) : (
        <div>
          <FormControl className={classes.form}>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              type="file"
              onChange={handleFile}
            />
            <FormHelperText id="my-helper-text">
              Plik musi być w formacie pdf.
            </FormHelperText>
            <LinearProgress variant="determinate" value={loaded} />
          </FormControl>
          <br />
          <Button
            variant="contained"
            color="primary"
            className={classes.btn}
            disabled={sendBtn}
            onClick={handleSaveFile}
          >
            PRZEŚLIJ
          </Button>
        </div>
      )}
    </div>
  );
}
