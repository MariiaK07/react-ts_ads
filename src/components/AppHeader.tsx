import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './AppHeader.scss';

export const AppHeader: React.FC = () => {
  return (
    <header className="header app-header">
      <nav className="navbar">
        <div className="navbar-brand">
          <NavLink
            to="/"
            className={({ isActive }) => classNames(
              'navbar-item is-tab', { 'is-active': isActive },
            )}
          >
            Home
          </NavLink>

          <NavLink
            to="/ads"
            className={({ isActive }) => classNames(
              'navbar-item is-tab', { 'is-active': isActive },
            )}
          >
            Ads
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
