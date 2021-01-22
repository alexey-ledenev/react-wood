import { useContext } from 'react';
import { ITreeActions, treeActionsContext } from './treeContext';

export const useTreeActions = (): ITreeActions => {
  return useContext(treeActionsContext);
};
