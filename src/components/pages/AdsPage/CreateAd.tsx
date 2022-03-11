import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import './CreateAd.scss';

import { useAds } from '../../hooks/useAds';

export const CreateAd: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { ads, setAds } = useAds();

  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const createAd: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (title && description && setAds) {
      setAds([...ads, {
        id: Date.now(),
        title,
        description,
        postDate: `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`,
      }]);

      navigate('/ads');
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="form">
      <div className="form__header">
        <button
          type="button"
          className="form__back-button button is-dark"
          onClick={() => navigate(-1)}
        >
          <span className="icon">
            <i className="fas fa-arrow-left" />
          </span>
        </button>

        <h1 className="title has-text-centered app__title">
          Create an ad
        </h1>
      </div>

      <form onSubmit={createAd}>
        <div className="field">
          <input
            required
            type="text"
            value={title}
            maxLength={30}
            ref={inputRef}
            placeholder="Enter a title"
            className="input"
            onChange={event => {
              setTitle(event.target.value);
            }}
          />
        </div>

        <div className="field">
          <textarea
            required
            value={description}
            maxLength={500}
            placeholder="Enter a description"
            className="input form__textarea"
            onChange={event => {
              setDescription(event.target.value);
            }}
          />
        </div>

        <button
          type="submit"
          className="form__button button is-dark"
          disabled={!title}
        >
          Create
        </button>
      </form>
    </div>
  );
};
