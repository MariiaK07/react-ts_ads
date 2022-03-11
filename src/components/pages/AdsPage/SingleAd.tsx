import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import './SingleAd.scss';

import { Ad } from '../../../types/Ad';
import { useAds } from '../../hooks/useAds';

import { AdCard } from './AdCard';

export const SingleAd: React.FC = () => {
  const { id } = useParams();
  const [ad, setAd] = useState<Ad | null>(null);
  const [similarAds, setSimilarAds] = useState<Ad[]>([]);
  const { ads, setAds } = useAds();
  const navigate = useNavigate();

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const date = new Date();

  const findSimilarAds = (providedAds: Ad[], targetAd: Ad) => {
    const targetTitleWords = targetAd.title.split(' ');
    const targetDescriptionWords = targetAd.description.split(' ');

    return providedAds.filter(({ title, description }) => {
      const titleWords = title.split(' ');
      const descriptionWords = description.split(' ');

      const isTitleSimilar = targetTitleWords
        .some(word => titleWords.includes(word));
      const isDescriptionSimilar = targetDescriptionWords
        .some(word => descriptionWords.includes(word));

      return isTitleSimilar && isDescriptionSimilar;
    });
  };

  useEffect(() => {
    let selectedAd;

    if (id) {
      selectedAd = ads.find(elem => elem.id === +id);
    }

    if (selectedAd && id) {
      setAd(selectedAd);
      setSimilarAds(
        findSimilarAds(ads, selectedAd)
          .splice(0, 3).filter(elem => elem.id !== +id),
      );
    }
  }, [id, ads]);

  const deleteAd = (adId: number) => {
    setAds(ads.filter(elem => elem.id !== adId));
    navigate(-1);
  };

  return (
    <div className="ad">
      <div className="ad__card">
        {ad && (
          <>
            <button
              type="button"
              className="button ad__back-button"
              onClick={() => navigate('/ads')}
            >
              <span className="icon">
                <i className="fa fa-multiply" />
              </span>
            </button>

            <h1 className="title ad__title mb-6">{ad.title}</h1>
            <p className="subtitle">{ad.description}</p>
            <span className="ad__post-date mb-5">
              <i>{`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`}</i>
            </span>

            <div className="buttons ad__buttons">
              <button
                type="button"
                className="button is-dark"
                onClick={() => id && deleteAd(+id)}
              >
                <span className="icon">
                  <i className="fa fa-trash" />
                </span>
                <span>Delete the ad</span>
              </button>
              <Link to={`/ads/${ad.id}/edit`} className="button">
                <span className="icon">
                  <i className="fa fa-pen" />
                </span>
                <span>Edit the ad</span>
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="ad__similar-ads">
        {similarAds.length > 0 && (
          <>
            <h3 className="subtitle">
              Similar ads
            </h3>
            <ul className="ads-page__list">
              {similarAds.map(elem => (
                <AdCard
                  key={elem.id}
                  ad={elem}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
