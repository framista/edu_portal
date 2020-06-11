import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  title: {
    color: 'black',
  },
  textarea: {
    width: '90%',
    fontFamily: 'Roboto, sans-serif',
    marginBottom: '15px',
    padding: '8px',
  },
  question: {
    color: 'black',
  },
}));

export default function FormDialog(props) {
  const { taskNumber, questions, closeDialog, timeQuestion } = props;
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const [answers, setAnswers] = React.useState([]);

  const handleChange = (prop) => (event) => {
    setAnswers({ ...answers, [prop]: event.target.value });
  };

  setInterval(() => handleClose(), timeQuestion * 1000);

  const handleClose = () => {
    setOpen(false);
    closeDialog(answers);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle
          className={classes.title}
          id="form-dialog-title"
        >{`Kartkówka ${taskNumber}`}</DialogTitle>
        <DialogContent>
          {questions.map((question, index) => (
            <div key={index}>
              <DialogContentText className={classes.question}>
                {question}
              </DialogContentText>
              <textarea
                className={classes.textarea}
                name={`q${index}`}
                rows="10"
                cols="1000"
                placeholder={`Odpowiedź na pytanie ${index + 1}`}
                value={answers[index]}
                onChange={handleChange(index)}
              />
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Zakończ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
