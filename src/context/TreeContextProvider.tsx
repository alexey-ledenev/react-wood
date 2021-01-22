import React, { FC, useMemo, useReducer } from 'react';
import { ITreeItem } from '../types';
import { treeStateContext, treeActionsContext } from './treeContext';
import { actions, getInitialTreeState, treeReducer } from './treeReducer';

export const TreeContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(treeReducer, getInitialTreeState());

  const treeActions = useMemo(
    () => ({
      toggleExpanded(item: ITreeItem) {
        if (item.childs === void 0) return;
        dispatch(actions.toggleExpanded(item.id));
      },
    }),
    []
  );

  return (
    <treeActionsContext.Provider value={treeActions}>
      <treeStateContext.Provider value={state}>
        {children}
      </treeStateContext.Provider>
    </treeActionsContext.Provider>
  );
};
