import React, { FC, useEffect, useMemo, useReducer } from 'react';
import { ID, ITreeItem, SelectionType } from '../types';
import { isSelectableItem } from '../utils/tree';
import {
  treeStateContext,
  treeActionsContext,
  ITreeActions,
} from './treeContext';
import { actions, getInitialTreeState, treeReducer } from './treeReducer';

interface ITreeContextProps {
  selectionType: SelectionType;
  multiSelect: boolean;
  disabledIds?: ID[];
  onExpand?: (node: ITreeItem) => void;
  onSelect?: (selectedNodes: ITreeItem[]) => void;
}

export const TreeContextProvider: FC<ITreeContextProps> = ({
  selectionType,
  multiSelect,
  disabledIds,
  onExpand,
  onSelect,
  children,
}) => {
  const [state, dispatch] = useReducer(treeReducer, getInitialTreeState());

  const treeActions = useMemo<ITreeActions>(
    () => ({
      toggleExpanded(item: ITreeItem, expanded: boolean) {
        if (item.children === void 0) return;
        dispatch(actions.toggleExpanded(item));
        if (expanded !== true && typeof onExpand === 'function') onExpand(item);
      },
      toggleSelected(item: ITreeItem) {
        if (
          isSelectableItem(selectionType, item.children !== void 0) === false ||
          disabledIds?.includes(item.id)
        ) {
          return;
        }
        dispatch(actions.toggleSelected(item, multiSelect));
      },
    }),
    [dispatch, onExpand, selectionType, multiSelect, disabledIds]
  );

  useEffect(() => {
    if (typeof onSelect === 'function') {
      onSelect(
        Object.values(state.selectedNodes).filter(
          (item) => item !== undefined
        ) as ITreeItem[]
      );
    }
  }, [state.selectedNodes, onSelect]);

  return (
    <treeActionsContext.Provider value={treeActions}>
      <treeStateContext.Provider value={state}>
        {children}
      </treeStateContext.Provider>
    </treeActionsContext.Provider>
  );
};
