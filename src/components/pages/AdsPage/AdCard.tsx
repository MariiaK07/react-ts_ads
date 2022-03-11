import React from 'react';
import { Link } from 'react-router-dom';
import { Ad } from '../../../types/Ad';

import './AdCard.scss';

type Props = {
  ad: Ad;
};

export const AdCard: React.FC<Props> = ({ ad }) => (
  <Link key={ad.id} to={`/ads/${ad.id}`} className="card">
    <li className="title card__title">{ad.title}</li>
  </Link>
);
