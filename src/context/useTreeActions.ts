import { useContext } from 'react';
import { treeActionsContext } from './treeContext';

export const useTreeActions = () => {
  return useContext(treeActionsContext);
};
