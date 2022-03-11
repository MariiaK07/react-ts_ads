import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.scss';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';

import { Layout } from './components/Layout/Layout';
import { HomePage } from './components/pages/HomePage/HomePage';
import { AdsPage } from './components/pages/AdsPage/AdsPage';
import { SingleAd } from './components/pages/AdsPage/SingleAd';
import { CreateAd } from './components/pages/AdsPage/CreateAd';
import { EditAd } from './components/pages/AdsPage/EditAd';
import { NotFoundPage } from './components/pages/NotFoundPage/NotFoundPage';
import { AdsProvider } from './components/hoc/AdsProvider';

export const App: React.FC = () => (
  <AdsProvider>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/home"
          element={<Navigate to="/" replace />}
        />
        <Route path="ads" element={<AdsPage />} />
        <Route path="ads/:id" element={<SingleAd />} />
        <Route path="ads/new" element={<CreateAd />} />
        <Route path="ads/:id/edit" element={<EditAd />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </AdsProvider>
);
