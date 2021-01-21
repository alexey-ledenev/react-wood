import { ItemType, ITreeItem, IChildItem, IParentItem } from '../src';

const DEEP = 5;
const getId = () => `f${(~~(Math.random() * 1e8)).toString(16)}`;
const getChildNode = (n = ''): IChildItem => ({
  id: getId(),
  label: `Child ${n}`,
  type: ItemType.Item,
});
const getParentNode = (n = ''): IParentItem => ({
  id: getId(),
  label: `Parent ${n}`,
  type: ItemType.Folder,
  childs: [],
});

export const generateTreeData = (currentDeep = 0, deep = DEEP): ITreeItem[] => {
  const nodes: ITreeItem[] = [];
  for (let i = 0; i < deep; i++) {
    if (Math.random() > 0.5 && currentDeep < deep) {
      const p = getParentNode(`${currentDeep}-${i}`);
      p.childs = generateTreeData(i);
      nodes.push(p);
    } else {
      nodes.push(getChildNode(`${currentDeep}-${i}`));
    }
  }
  return nodes;
};

export const MOCK_DATA: ITreeItem[] = [
  {
    id: '1',
    label: 'Parent 1',
    type: ItemType.Folder,
    childs: [
      { id: '11', label: 'Child 11' },
      { id: '12', label: 'Child 12' },
      { id: '13', label: 'Child 13' },
    ],
  },
  {
    id: '2',
    label: 'Parent 2',
    type: ItemType.Folder,
    childs: [
      { id: '21', label: 'Child 21' },
      {
        id: '22',
        label: 'Parent 22',
        type: ItemType.Folder,
        childs: [
          { id: '221', label: 'Child 221' },
          { id: '222', label: 'Child 222' },
          { id: '223', label: 'Child 223' },
        ],
      },
      { id: '23', label: 'Child 23' },
    ],
  },
  {
    id: '3',
    label: 'Parent 3',
    type: ItemType.Folder,
    childs: [
      {
        id: '31',
        label: 'Parent 31',
        type: ItemType.Folder,
        childs: [
          { id: '311', label: 'Child 311' },
          { id: '312', label: 'Child 312' },
          { id: '313', label: 'Child 313' },
        ],
      },
      { id: '32', label: 'Child 32' },
      { id: '33', label: 'Child 33' },
    ],
  },
];
