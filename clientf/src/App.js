import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Sidebar } from './components/sidebar';
import PrivateRoute from './PrivateRoute';
import { Login, Home, Raport, Task1, Task2, Task3, Task4 } from './pages';

function App() {
  return (
    <Router>
      <Sidebar></Sidebar>
      <Switch>
        <Route path={'/login'} exact component={Login} />
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/raport" exact component={Raport} />
        <PrivateRoute path="/task1" exact component={Task1} />
        <PrivateRoute path="/task2" exact component={Task2} />
        <PrivateRoute path="/task3" exact component={Task3} />
        <PrivateRoute path="/task4" exact component={Task4} />
      </Switch>
    </Router>
  );
}

export default App;
