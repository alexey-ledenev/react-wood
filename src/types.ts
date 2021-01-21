export enum ItemType {
  Folder = 'FOLDER',
  Item = 'ITEM',
}

export interface ITreeItem {
  id: string | number;
  label: string;
  type?: ItemType;
  childs?: ITreeItem[] | null;
}

export interface IParentItem extends ITreeItem {
  type: ItemType.Folder;
  childs: ITreeItem[] | null;
}

export interface IChildItem extends Omit<ITreeItem, 'childs'> {
  type?: ItemType.Item;
}
