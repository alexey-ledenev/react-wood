import { createContext } from 'react';
import { ITreeItem } from '../types';
import { noop } from '../utils';
import { getInitialTreeState, ITreeState } from './treeReducer';

export const treeStateContext = createContext<ITreeState>(
  getInitialTreeState()
);

export interface ITreeActions {
  toggleExpanded: (item: ITreeItem, expanded: boolean) => void;
  toggleSelected: (item: ITreeItem) => void;
}
export const treeActionsContext = createContext<ITreeActions>({
  toggleExpanded: noop,
  toggleSelected: noop,
});
