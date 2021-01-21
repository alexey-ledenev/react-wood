import { ITreeItem } from '../types';

export type ID = ITreeItem['id'];
export interface ITreeState {
  expandedIds: Record<ID, boolean>;
}
export const getInitialTreeState = (): ITreeState => ({
  expandedIds: Object.create(null),
});

export const actions = {
  toggleExpanded: (nodeId: ID) =>
    ({
      type: 'TOGGLE_EXPANDED',
      nodeId,
    } as const),
};

export type Actions = typeof actions;
export type Action = ReturnType<Actions[keyof Actions]>;

export const treeReducer = (state: ITreeState, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_EXPANDED':
      const expanded = state.expandedIds[action.nodeId];
      return {
        ...state,
        expandedIds: { ...state.expandedIds, [action.nodeId]: !expanded },
      };

    default:
      return state;
  }
};
