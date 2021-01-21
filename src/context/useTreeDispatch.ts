import { useContext } from 'react';
import { treeDispatchContext } from './treeContext';

export const useTreeDispatch = () => {
  return useContext(treeDispatchContext);
};
