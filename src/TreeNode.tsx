import React, { FC, ReactNode, useRef } from 'react';
import cn from './utils/classNames';
import { ITreeItem } from './types';
import { useTreeActions, useTreeState } from './context';
import { NodeContent } from './NodeContent';
import { NodeLabel } from './NodeLabel';
import { NodeIcon } from './NodeIcon';
import s from './styles/Tree.module.sass';

export interface ITreeNodeProps {
  item: ITreeItem;
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

const DBL_CLICK_DELAY = 200;

export const TreeNode: FC<ITreeNodeProps> = ({
  item,
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
  const doubleClickCheck = useRef({
    timer: 0,
    prevent: false,
  });
  const { toggleExpanded, toggleSelected } = useTreeActions();
  const { expandedIds, selectedNodes } = useTreeState();
  const withChildren = item.children !== void 0;
  const expanded = expandedIds?.[item.id] === true;
  const selected = selectedNodes?.[item.id] !== undefined;

  const onSelectNode = (node: ITreeItem) => {
    toggleSelected(node);
  };

  const onNodeClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    doubleClickCheck.current.timer = window.setTimeout(() => {
      if (!doubleClickCheck.current.prevent) {
        if (e.ctrlKey || e.metaKey) {
          onSelectNode(item);
        } else {
          toggleExpanded(item, expanded);
        }
      }
      doubleClickCheck.current.prevent = false;
    }, DBL_CLICK_DELAY);
  };
  const onNodeDoubleClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    clearTimeout(doubleClickCheck.current.timer);
    doubleClickCheck.current.prevent = true;
    onSelectNode(item);
  };

  const renderNode = (n: ITreeItem) => (
    <TreeNode
      key={n.id}
      item={n}
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
      onDoubleClick={onNodeDoubleClick}
    >
      <NodeContent className={contentClassName}>
        <NodeIcon
          isParent={withChildren}
          expanded={expanded}
          className={iconBoxClassName}
          iconClassName={iconClassName}
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
