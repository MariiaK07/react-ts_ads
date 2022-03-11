import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './AdsPage.scss';

import { useAds } from '../../hooks/useAds';
import { AdCard } from './AdCard';

export const AdsPage: React.FC = () => {
  const { ads } = useAds();
  const [query, setQuery] = useState('');

  return (
    <div className="ads-page">
      <div className="ads-page__header">
        <h1 className="title app__title">Ads</h1>
        <Link to="/ads/new" className="button is-dark ads-page__button">
          <span className="icon">
            <i className="fa fa-plus" />
          </span>
          <span>Create an ad</span>
        </Link>

        <p className="control has-icons-left">
          <input
            type="search"
            value={query}
            onChange={event => {
              setQuery(event.target.value);
            }}
            placeholder="Find an ad"
            className="input"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-search" />
          </span>
        </p>
      </div>

      <ul className="ads-page__list">
        {ads.filter(ad => ad.title.toLowerCase().includes(query)).map(ad => (
          <AdCard
            key={ad.id}
            ad={ad}
          />
        ))}
      </ul>

      {ads.length < 1 && (
        <p className="subtitle">
          There are no ads yes. Please click &quot;Create an ad&quot; button.
        </p>
      )}
    </div>
  );
};
