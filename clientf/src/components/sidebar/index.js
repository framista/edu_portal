import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './sidebar.css';

export const Sidebar = () => {
  const [authTokens, setAuthTokens] = React.useState(
    localStorage.getItem('key-jwt-pwr')
  );

  const handleLogout = () => {
    localStorage.removeItem('key-jwt-pwr');
    localStorage.removeItem('selectedSite');
    setAuthTokens(localStorage.getItem('key-jwt-pwr'));
  };
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/task1">
        Ćwiczenie 1
      </a>

      <a className="menu-item" href="/task2">
        Ćwiczenie 2
      </a>

      <a className="menu-item" href="/task3">
        Ćwiczenie 3
      </a>

      <a className="menu-item" href="/task4">
        Ćwiczenie 4
      </a>

      <a className="menu-item" href="/raport">
        Sprawozdanie
      </a>

      <a className="menu-item" href="/login" onClick={handleLogout}>
        {authTokens ? 'Wyloguj' : 'Zaloguj'}
      </a>
    </Menu>
  );
};
