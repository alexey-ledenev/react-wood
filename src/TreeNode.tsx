import React, { FC } from 'react';
import cn from './utils/classNames';
import { actions } from './context/treeReducer';
import { useTreeDispatch } from './context/useTreeDispatch';
import { useTreeState } from './context/useTreeState';
import { ItemType, ITreeItem } from './types';

export interface ITreeNodeProps {
  item: ITreeItem;
}

export const TreeNode: FC<ITreeNodeProps> = ({ item }) => {
  const dispatch = useTreeDispatch();
  const { expandedIds = Object.create(null) } = useTreeState();
  const isFolder = item.type === ItemType.Folder;
  const expanded = expandedIds[item.id] === true;
  const onNodeClick = () => {
    dispatch(actions.toggleExpanded(item.id));
  };
  return (
    <div
      className={cn(
        'tree-node',
        isFolder ? 'parent' : 'child',
        expanded && 'expanded'
      )}
      onClick={onNodeClick}
    >
      <span className="tree-label">{item.label}</span>
      {isFolder &&
        expanded &&
        item.childs !== void 0 &&
        (Array.isArray(item.childs) ? (
          item.childs.map(renderNode)
        ) : (
          <div className="tree-info">Loading...</div>
        ))}
    </div>
  );
};

export function renderNode(item: ITreeItem) {
  return <TreeNode key={item.id} item={item} />;
}
