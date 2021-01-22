import React, { FC, useMemo, useReducer } from 'react';
import { ITreeItem, SelectionType } from '../types';
import { treeStateContext, treeActionsContext } from './treeContext';
import { actions, getInitialTreeState, treeReducer } from './treeReducer';

interface ITreeContextProps {
  selectionType: SelectionType;
  multiSelect: boolean;
  onExpand?: (node: ITreeItem) => void;
  onSelect?: (selectedNodes: ITreeItem[]) => void;
}

export const TreeContextProvider: FC<ITreeContextProps> = ({
  selectionType,
  multiSelect,
  onExpand,
  onSelect,
  children,
}) => {
  const [state, dispatch] = useReducer(treeReducer, getInitialTreeState());

  const treeActions = useMemo(
    () => ({
      toggleExpanded(item: ITreeItem) {
        if (item.childs === void 0) return;
        dispatch(actions.toggleExpanded(item, onExpand));
      },
      toggleSelected(item: ITreeItem) {
        if (selectionType === SelectionType.None) return;
        const isParent = item.childs !== void 0;
        if (selectionType === SelectionType.Parents && !isParent) return;
        if (selectionType === SelectionType.Childs && isParent) return;
        dispatch(actions.toggleSelected(item, multiSelect, onSelect));
      },
    }),
    [dispatch, onExpand, onSelect, selectionType, multiSelect]
  );

  return (
    <treeActionsContext.Provider value={treeActions}>
      <treeStateContext.Provider value={state}>
        {children}
      </treeStateContext.Provider>
    </treeActionsContext.Provider>
  );
};
