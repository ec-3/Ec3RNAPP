import { useContext } from 'react';
import { ThemeContext } from 'providers/contexts';

export const useEC3Theme = () => {
  return useContext(ThemeContext);
};
