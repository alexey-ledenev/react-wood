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
  toggleExpanded: (node: ITreeItem) =>
    ({
      type: 'TOGGLE_EXPANDED',
      node,
    } as const),
  toggleSelected: (node: ITreeItem, allowMultiple: boolean) =>
    ({
      type: 'TOGGLE_SELECTED',
      node,
      allowMultiple,
    } as const),
};

type Actions = typeof actions;
type Action = ReturnType<Actions[keyof Actions]>;

export const treeReducer = (state: ITreeState, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_EXPANDED': {
      const nodeId = action.node.id;
      const expanded = !state.expandedIds[nodeId];
      return {
        ...state,
        expandedIds: { ...state.expandedIds, [nodeId]: expanded },
      };
    }
    case 'TOGGLE_SELECTED': {
      const { node } = action;
      const selected = state.selectedNodes[node.id] !== undefined;
      let selectedNodes: ITreeState['selectedNodes'] = {
        [node.id]: selected === true ? undefined : node,
      };
      if (action.allowMultiple) {
        selectedNodes = {
          ...state.selectedNodes,
          ...selectedNodes,
        };
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
