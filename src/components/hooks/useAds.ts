import { useContext } from 'react';
import { AdsContext } from '../hoc/AdsProvider';

export const useAds = () => {
  return useContext(AdsContext);
};
