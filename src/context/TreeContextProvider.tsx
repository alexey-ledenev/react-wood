import React, { FC, useReducer } from 'react';
import { treeStateContext, treeDispatchContext } from './treeContext';
import { getInitialTreeState, treeReducer } from './treeReducer';

export const TreeContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(treeReducer, getInitialTreeState());

  return (
    <treeDispatchContext.Provider value={dispatch}>
      <treeStateContext.Provider value={state}>
        {children}
      </treeStateContext.Provider>
    </treeDispatchContext.Provider>
  );
};
