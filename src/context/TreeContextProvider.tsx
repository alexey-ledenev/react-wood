import React, { FC, useEffect, useMemo, useReducer } from 'react';
import { ITreeItem, SelectionType } from '../types';
import { treeStateContext, treeActionsContext } from './treeContext';
import { actions, getInitialTreeState, treeReducer } from './treeReducer';

interface ITreeContextProps {
  selectionType: SelectionType;
  multiSelect: boolean;
  disabledIds?: ITreeItem['id'][];
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

  const treeActions = useMemo(
    () => ({
      toggleExpanded(item: ITreeItem, expanded: boolean) {
        if (item.children === void 0) return;
        dispatch(actions.toggleExpanded(item));
        if (!expanded && typeof onExpand === 'function') onExpand(item);
      },
      toggleSelected(item: ITreeItem) {
        if (selectionType === SelectionType.None) return;
        if (disabledIds?.includes(item.id)) return;
        const isParent = item.children !== void 0;
        if (selectionType === SelectionType.Parent && !isParent) return;
        if (selectionType === SelectionType.Child && isParent) return;
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
