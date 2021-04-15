import React, { FC, ReactNode } from 'react';
import cn from './utils/classNames';
import { ID, ITreeItem, SelectionType } from './types';
import { TreeContextProvider } from './context';
import { TreeNode } from './TreeNode';
import s from './styles/Tree.module.sass';

export interface ITreeProps {
  nodes: ITreeItem[];
  /**
   * Elements available for selection:
   * 'child', 'parent', 'all'.
   * To disable selection use 'none' (by default).
   */
  selectionType?: SelectionType;
  /**
   * Is multiple selection allowed.
   */
  multipleSelection?: boolean;
  /**
   * Disable selection of specified items.
   */
  disabledIds?: ID[];
  containerClassName?: string;
  nodeClassName?: string;
  nodeActiveClassName?: string;
  nodeContentClassName?: string;
  nodeIconBoxClassName?: string;
  nodeIconClassName?: string;
  nodeLabelClassName?: string;
  /**
   * Called when an item is expanded.
   * @param expandedNode Expanded item.
   */
  onNodeExpand?: (expandedNode: ITreeItem) => void;
  /**
   * Called when an item is selected.
   * @param selectedNodes An array of the currently selected items.
   */
  onSelect?: (selectedNodes: ITreeItem[]) => void;
  /**
   * Function for drawing additional content inside the node.
   */
  renderNodeData?: (node: ITreeItem, isNodeSelected: boolean) => ReactNode;
  /**
   * Function for drawing a node icon.
   */
  renderNodeIcon?: (
    isNodeExpanded: boolean,
    isNodeSelected: boolean,
    isParentNode: boolean,
    node: ITreeItem
  ) => ReactNode;
  loader?: ReactNode;
  noData?: ReactNode;
}

export const Tree: FC<ITreeProps> = ({
  nodes,
  selectionType = SelectionType.None,
  multipleSelection = false,
  disabledIds,
  containerClassName,
  nodeClassName,
  nodeActiveClassName,
  nodeContentClassName,
  nodeIconBoxClassName,
  nodeIconClassName,
  nodeLabelClassName,
  onNodeExpand,
  onSelect,
  renderNodeData,
  renderNodeIcon,
  loader,
  noData,
  children,
}) => {
  const renderNode = (n: ITreeItem) => (
    <TreeNode
      key={n.id}
      item={n}
      className={nodeClassName}
      activeClassName={nodeActiveClassName}
      contentClassName={nodeContentClassName}
      iconBoxClassName={nodeIconBoxClassName}
      iconClassName={nodeIconClassName}
      labelClassName={nodeLabelClassName}
      renderData={renderNodeData}
      renderIcon={renderNodeIcon}
      loader={loader}
    />
  );
  return (
    <TreeContextProvider
      selectionType={selectionType}
      multiSelect={multipleSelection}
      disabledIds={disabledIds}
      onSelect={onSelect}
      onExpand={onNodeExpand}
    >
      <div className={cn(s.container, containerClassName)}>
        {children}
        {!nodes?.length
          ? !children &&
            (noData || (
              <div className="Wood-info Wood-info_noData">No data</div>
            ))
          : nodes.map(renderNode)}
      </div>
    </TreeContextProvider>
  );
};
