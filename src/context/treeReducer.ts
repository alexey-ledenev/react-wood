import { ITreeItem } from '../types';

type ID = ITreeItem['id'];
export interface ITreeState {
  expandedIds: Record<ID, boolean>;
  selectedNodes: Record<ID, ITreeItem | undefined>;
}
export const getInitialTreeState = (): ITreeState => ({
  expandedIds: Object.create(null),
  selectedNodes: Object.create(null),
});

export const actions = {
  toggleExpanded: (node: ITreeItem, cb?: (node: ITreeItem) => void) =>
    ({
      type: 'TOGGLE_EXPANDED',
      node,
      cb,
    } as const),
  toggleSelected: (
    node: ITreeItem,
    allowMultiple: boolean,
    cb?: (selectedNodes: ITreeItem[]) => void
  ) =>
    ({
      type: 'TOGGLE_SELECTED',
      node,
      allowMultiple,
      cb,
    } as const),
};

type Actions = typeof actions;
type Action = ReturnType<Actions[keyof Actions]>;

export const treeReducer = (state: ITreeState, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_EXPANDED': {
      const nodeId = action.node.id;
      const expanded = !state.expandedIds[nodeId];
      if (expanded === true && typeof action.cb === 'function') {
        action.cb(action.node);
      }
      return {
        ...state,
        expandedIds: { ...state.expandedIds, [nodeId]: expanded },
      };
    }
    case 'TOGGLE_SELECTED': {
      const nodeId = action.node.id;
      const selected = state.selectedNodes[nodeId] !== undefined;
      let selectedNodes;
      if (action.allowMultiple) {
        selectedNodes = {
          ...state.selectedNodes,
          [nodeId]: selected ? undefined : action.node,
        };
      } else {
        if (selected) return state;
        selectedNodes = { [nodeId]: action.node };
      }
      if (typeof action.cb === 'function') {
        const selectedNodesArr: ITreeItem[] = [];
        for (let id in selectedNodes) {
          if (selectedNodes[id] !== undefined)
            selectedNodesArr.push(selectedNodes[id] as ITreeItem);
        }
        action.cb(selectedNodesArr);
      }
      return {
        ...state,
        selectedNodes,
      };
    }

    default:
      return state;
  }
};
