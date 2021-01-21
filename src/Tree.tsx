import React, { FC } from 'react';
import { TreeContextProvider } from './context/TreeContextProvider';
import { renderNode } from './TreeNode';
import { ITreeItem } from './types';

export interface ITreeProps {
  nodes: ITreeItem[];
}

export const Tree: FC<ITreeProps> = ({ nodes }) => {
  return (
    <TreeContextProvider>
      <div className="tree-container">
        {!nodes?.length ? (
          <div className="tree-info">No data</div>
        ) : (
          nodes.map(renderNode)
        )}
      </div>
    </TreeContextProvider>
  );
};
