import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import './CreateAd.scss';

import { Ad } from '../../../types/Ad';
import { useAds } from '../../hooks/useAds';

export const EditAd: React.FC = () => {
  const { id } = useParams();
  const { ads, setAds } = useAds();
  const [ad, setAd] = useState<Ad | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (ad) {
      setTitle(ad.title);
      setDescription(ad.description);
    }
  }, [ad]);

  useEffect(() => {
    let selectedAd;

    if (id) {
      selectedAd = ads.find(elem => elem.id === +id);
    }

    if (selectedAd) {
      setAd(selectedAd);
    }
  }, [id, ads]);

  const navigate = useNavigate();

  const editAd = (item: Ad) => {
    if (title && description && setAds) {
      setAds(ads.map(elem => {
        if (id && elem.id !== +id) {
          return elem;
        }

        return {
          ...item, title, description,
        };
      }));
    }
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (ad) {
      editAd(ad);
    }

    navigate(-1);
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
          Edit an ad
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
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
          Edit
        </button>
      </form>
    </div>
  );
};
