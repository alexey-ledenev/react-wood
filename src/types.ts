export interface ITreeItem {
  id: string | number;
  label: string;
  childs?: ITreeItem[] | null;
}
