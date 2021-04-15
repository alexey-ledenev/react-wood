import React, { FC, ReactNode } from 'react';
import cn from './utils/classNames';
import { isSelectableItem } from './utils/tree';
import { ITreeItem, SelectionType } from './types';
import { useTreeActions, useTreeState } from './context';
import { NodeContent } from './NodeContent';
import { NodeLabel } from './NodeLabel';
import { NodeIcon } from './NodeIcon';
import s from './styles/Tree.module.sass';

export interface ITreeNodeProps {
  item: ITreeItem;
  selectionType: SelectionType;
  className?: string;
  activeClassName?: string;
  contentClassName?: string;
  iconBoxClassName?: string;
  iconClassName?: string;
  labelClassName?: string;
  renderData?: (node: ITreeItem, selected: boolean) => ReactNode;
  renderIcon?: (
    expanded: boolean,
    selected: boolean,
    isParent: boolean,
    node: ITreeItem
  ) => ReactNode;
  loader?: ReactNode;
}

export const TreeNode: FC<ITreeNodeProps> = ({
  item,
  selectionType,
  className,
  activeClassName,
  contentClassName,
  iconBoxClassName,
  iconClassName,
  labelClassName,
  renderData,
  renderIcon,
  loader,
  children,
}) => {
  const { toggleExpanded, toggleSelected } = useTreeActions();
  const { expandedIds, selectedNodes } = useTreeState();

  const withChildren = item.children !== void 0;
  const expanded = expandedIds?.[item.id] === true;
  const selected = selectedNodes?.[item.id] !== undefined;
  const selectable = isSelectableItem(selectionType, withChildren);

  const onNodeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    if (selectable === false) {
      toggleExpanded(item, expanded);
    } else {
      toggleSelected(item);
    }
  };

  const onIconClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    toggleExpanded(item, expanded);
  };

  const renderNode = (n: ITreeItem) => (
    <TreeNode
      key={n.id}
      item={n}
      selectionType={selectionType}
      className={className}
      activeClassName={activeClassName}
      contentClassName={contentClassName}
      iconBoxClassName={iconBoxClassName}
      iconClassName={iconClassName}
      labelClassName={labelClassName}
      renderData={renderData}
      renderIcon={renderIcon}
      loader={loader}
    />
  );

  return (
    <div
      className={cn(
        s.node,
        selected && s.selected,
        className,
        selected && activeClassName
      )}
      onClick={onNodeClick}
    >
      <NodeContent className={contentClassName}>
        <NodeIcon
          isParent={withChildren}
          expanded={expanded}
          className={iconBoxClassName}
          iconClassName={iconClassName}
          onClick={onIconClick}
        >
          {typeof renderIcon === 'function' &&
            renderIcon(expanded, selected, withChildren, item)}
        </NodeIcon>
        <NodeLabel className={labelClassName}>{item.label}</NodeLabel>
        {typeof renderData === 'function' && renderData(item, selected)}
      </NodeContent>
      {children}
      {withChildren &&
        expanded &&
        (Array.isArray(item.children)
          ? item.children.map(renderNode)
          : loader || <div className="Wood-info Wood-info_loading">...</div>)}
    </div>
  );
};
