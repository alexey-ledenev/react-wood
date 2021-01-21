import { createContext, Dispatch } from 'react';
import { getInitialTreeState, ITreeState, Action } from './treeReducer';

export const treeStateContext = createContext<ITreeState>(
  getInitialTreeState()
);
export const treeDispatchContext = createContext<Dispatch<Action>>(() => {});
