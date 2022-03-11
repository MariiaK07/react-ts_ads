import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Ad } from '../../types/Ad';

type GlobalContext = {
  ads: Ad[];
  setAds: (ads: Ad[]) => void;
  filteredAds: Ad[];
  setFilteredAds: (filteredTodos: Ad[]) => void;
};

export const AdsContext = React.createContext<GlobalContext>({
  ads: [],
  setAds: () => {},
  filteredAds: [],
  setFilteredAds: () => {},
});

export const AdsProvider: React.FC = ({ children }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);

  const saveLocalAds = useCallback(() => {
    localStorage.setItem('ads', JSON.stringify(ads));
  }, [ads]);

  const getLocalAds = () => {
    setAds(JSON.parse(localStorage.ads));
  };

  useEffect(() => {
    getLocalAds();
  }, []);

  useEffect(() => {
    setFilteredAds(ads);
    saveLocalAds();
  }, [ads, saveLocalAds]);

  const contextValue = useMemo(() => {
    return {
      ads,
      setAds,
      filteredAds,
      setFilteredAds,
    };
  }, [ads, filteredAds]);

  return (
    <AdsContext.Provider value={contextValue}>
      {children}
    </AdsContext.Provider>
  );
};
