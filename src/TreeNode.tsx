import React, { FC } from 'react';
import cn from './utils/classNames';
import { useTreeActions } from './context/useTreeActions';
import { useTreeState } from './context/useTreeState';
import { ITreeItem } from './types';

export interface ITreeNodeProps {
  item: ITreeItem;
}

export const TreeNode: FC<ITreeNodeProps> = ({ item }) => {
  const { toggleExpanded } = useTreeActions();
  const { expandedIds = Object.create(null) } = useTreeState();
  const withChilds = item.childs !== void 0;
  const expanded = expandedIds[item.id] === true;

  const onNodeExpand = () => {
    toggleExpanded(item);
  };

  return (
    <div
      className={cn(
        'tree-node',
        withChilds ? 'parent' : 'child',
        expanded && 'expanded'
      )}
      onClick={onNodeExpand}
    >
      <span className="tree-label">{item.label}</span>
      {withChilds &&
        expanded &&
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
