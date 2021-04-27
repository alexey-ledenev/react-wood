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
   * A function for drawing additional content inside nodes.
   * @param node A node object.
   * @param isNodeSelected Indicates whether this item is selected.
   */
  renderNodeData?: (node: ITreeItem, isNodeSelected: boolean) => ReactNode;
  /**
   * A function for drawing icons.
   */
  renderNodeIcon?: (
    isNodeExpanded: boolean,
    isNodeSelected: boolean,
    isParentNode: boolean,
    node: ITreeItem
  ) => ReactNode;
  /**
   * A ReactNode for indicating nodes loading state.
   */
  loader?: ReactNode;
  /**
   * A ReactNode for indicating empty tree.
   */
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
      selectionType={selectionType}
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
          ? children !== void 0 &&
            children !== null &&
            (noData ?? (
              <div className="Wood-info Wood-info_noData">No data</div>
            ))
          : nodes.map(renderNode)}
      </div>
    </TreeContextProvider>
  );
};
