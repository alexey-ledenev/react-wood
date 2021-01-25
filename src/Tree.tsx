import React, { FC, ReactNode } from 'react';
import cn from './utils/classNames';
import { TreeContextProvider } from './context/TreeContextProvider';
import { TreeNode } from './TreeNode';
import { ITreeItem, SelectionType } from './types';
import s from './styles/Tree.module.sass';

export interface ITreeProps {
  nodes: ITreeItem[];
  /**
   * Тип элементов, доступных для выбора:
   * дочерние ('childs'), родительские ('parents'), все ('all').
   * Для отключения возможности выбора используется свойство 'none' (установлено по-умолчанию).
   */
  selectionType?: SelectionType;
  /** Разрешен ли выбор нескольких элементов. */
  multipleSelection?: boolean;
  /**
   * Отключить выбор для заданных элементов.
   */
  disabledIds?: ITreeItem['id'][];
  /** Класс контейнера дерева. */
  containerClassName?: string;
  /** Класс узла дерева. */
  nodeClassName?: string;
  /** Класс выбранного узла дерева. */
  nodeActiveClassName?: string;
  nodeContentClassName?: string;
  /** Класс контейнера иконки. */
  nodeIconBoxClassName?: string;
  /** Класс иконки. */
  nodeIconClassName?: string;
  /** Класс текста узла дерева. */
  nodeLabelClassName?: string;
  /** Функция, которая будет вызвана при открытии элемента. */
  onNodeExpand?: (node: ITreeItem) => void;
  /**
   * Функция, которая будет вызвана при выборе очередного элемента.
   * selectedNodes: массив выбранных в текущий момент элементов.
   */
  onSelect?: (selectedNodes: ITreeItem[]) => void;
  /** Функция для отрисовки дополнительных элементов внутри узла. */
  renderNodeData?: (node: ITreeItem, selected: boolean) => ReactNode;
  /** Функция для отрисовки иконки узла. */
  renderNodeIcon?: (
    expanded: boolean,
    selected: boolean,
    isParentEl: boolean,
    node: ITreeItem
  ) => ReactNode;
  /** Элемент для отображения загрузки. */
  loader?: ReactNode;
  /** Элемент для отображения отсутствия данных. */
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
