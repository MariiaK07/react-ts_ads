import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.scss';

export const HomePage: React.FC = () => (
  <div className="home-page">
    <h1 className="title app__title">
      WELCOME to Add&Ad
    </h1>
    <p className="buttons">
      <Link to="/ads" className="button is-dark">
        <span className="icon">
          <i className="fa fa-search" />
        </span>
        <span>Find and ad</span>
      </Link>
      <Link to="/ads/new" className="button">
        <span className="icon">
          <i className="fa fa-plus" />
        </span>
        <span>Create an ad</span>
      </Link>
    </p>
  </div>
);
