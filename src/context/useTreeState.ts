import { useContext } from 'react';
import { treeStateContext } from './treeContext';
import { ITreeState } from './treeReducer';

export const useTreeState = (): ITreeState => {
  return useContext(treeStateContext);
};
