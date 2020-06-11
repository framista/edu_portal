import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import api from '../../api';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  h1: {
    fontSize: '24px',
    marginBottom: '1em',
    textAlign: 'center',
    margin: '10px',
  },
  list: {
    width: '100%',
    maxWidth: '150px',
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [tasks, setTasks] = React.useState([]);
  const [raport, setRaport] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await api.getStudentById();
      const student = result.data;
      setTasks([...student.tasks]);
      setRaport(student.raport);
    };
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Typography color="textSecondary" variant="h1" className={classes.h1}>
        Techniki wytwarzania - obróbka plastyczna
      </Typography>
      <List className={classes.list}>
        {tasks.map((task, index) => {
          return (
            <ListItem
              key={index}
              dense
              button
              onClick={() => props.history.push(`/task${index + 1}`)}
            >
              <ListItemText primary={`Ćwiczenie ${index + 1}`}></ListItemText>
              <Checkbox
                edge="end"
                color="primary"
                checked={task === 2}
              ></Checkbox>
            </ListItem>
          );
        })}
        <ListItem
          key={10}
          dense
          button
          onClick={() => props.history.push(`/raport`)}
        >
          <ListItemText primary={'Sprawozdanie'}></ListItemText>
          <Checkbox edge="end" color="primary" checked={raport}></Checkbox>
        </ListItem>
      </List>
    </div>
  );
}
