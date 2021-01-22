export interface ITreeItem {
  id: string | number;
  label: string;
  childs?: ITreeItem[] | null;
}

export enum SelectionType {
  Childs = 'childs',
  Parents = 'parents',
  All = 'all',
  None = 'none',
}
