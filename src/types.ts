export type ID = string | number;

export interface ITreeItem {
  id: ID;
  label: string;
  children?: ITreeItem[] | null;
}

export enum SelectionType {
  Child = 'child',
  Parent = 'parent',
  All = 'all',
  None = 'none',
}
