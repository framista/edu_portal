import React from 'react';
import ReactPlayer from 'react-player';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import api from '../../api';
import './task.css';
import FormDialog from '../../components/test';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    paddingTop: '40px',
  },
  h1: {
    fontSize: '40px',
    marginBottom: '1em',
  },
  h2: {
    fontSize: '20px',
    marginTop: '1em',
    color: 'black',
    padding: '1em',
    fontWeight: 'bold',
  },
  btn: {
    marginTop: '1em',
    width: '100px',
    fontSize: '20px',
  },
}));

export default function Task(props) {
  const { taskNumber, movieDuration, video } = props;
  const classes = useStyles();
  const [startTime, setStartTime] = React.useState(0);
  const [stopTime, setStopTime] = React.useState(0);
  const [tasks, setTasks] = React.useState([]);
  const [testBtn, setTestBtn] = React.useState(true);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [answers, setAnswers] = React.useState([]);
  const [saveQuestions, setSaveQuestions] = React.useState(false);
  const [testDone, setTestDone] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.getStudentById();
      const student = result.data;
      setTasks([...student.tasks]);
      if (student.tasks[taskNumber - 1] === 1) {
        setTestBtn(false);
      }
      if (student.tasks[taskNumber - 1] === 2) {
        setTestDone(true);
      }
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    const time = (stopTime - startTime) / 1000;
    const fetchData = async () => {
      try {
        tasks[taskNumber - 1] = 1;
        await api.updateStudentTasks({ tasks });
        setTestBtn(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (tasks[taskNumber - 1] === 0 && time >= movieDuration) {
      fetchData();
    }
  }, [stopTime]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const test = questions.map((q, index) => ({
          question: q,
          answer: answers[index],
        }));
        await api.updateStudentTests({ test, taskNumber });
        setTestBtn(true);
        setTestDone(true);
      } catch (err) {
        console.log(err);
      }
    };
    if (tasks[taskNumber - 1] === 1) {
      fetchData();
    }
  }, [saveQuestions]);

  const handleDialogClose = async (data) => {
    const arr = Object.values(data).map((e) => e);
    setAnswers(arr);
    setDialogOpen(false);
    setSaveQuestions(true);
  };

  const randomNumbers = (n, max) => {
    const arr = [];
    while (arr.length < n) {
      const r = Math.floor(Math.random() * max);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };

  const fetchQuestionData = async () => {
    const result = await api.getAllTasksForTask(taskNumber);
    const data = result.data.map((el) => {
      return el.question;
    });
    const numbers = randomNumbers(2, data.length);
    const selectedQuestion = numbers.map((n) => data[n]);
    setQuestions(selectedQuestion);
  };

  return (
    <div className={classes.root}>
      <Typography color="textSecondary" variant="h1" className={classes.h1}>
        {`Ćwiczenie ${taskNumber}`}
      </Typography>
      <div className="container">
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url={video}
            width="100%"
            height="100%"
            controls
            onStart={() => setStartTime(performance.now())}
            onEnded={() => setStopTime(performance.now())}
          />
        </div>
      </div>
      {testDone ? (
        <Typography color="textSecondary" variant="h2" className={classes.h2}>
          Test wykonany
        </Typography>
      ) : (
        <Button
          variant="contained"
          color="primary"
          className={classes.btn}
          disabled={testBtn}
          onClick={() => {
            fetchQuestionData();
            setDialogOpen(true);
          }}
        >
          TEST
        </Button>
      )}
      {dialogOpen && (
        <FormDialog
          taskNumber={taskNumber}
          questions={questions}
          closeDialog={handleDialogClose}
          timeQuestion={60} //sec
        />
      )}
    </div>
  );
}
