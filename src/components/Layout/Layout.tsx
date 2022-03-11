import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from '../AppHeader';

export const Layout: React.FC = () => (
  <>
    <AppHeader />

    <main>
      <Outlet />
    </main>
  </>
);
