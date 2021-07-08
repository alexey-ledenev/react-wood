import { ITreeItem } from '../src';

export const MOCK_DATA: ITreeItem[] = [
  {
    id: '1',
    label: 'Parent 1',
    children: [
      { id: '11', label: 'Child 11' },
      { id: '12', label: 'Child 12' },
      { id: '13', label: 'Child 13' },
    ],
  },
  {
    id: '2',
    label: 'Parent 2',
    children: [
      { id: '21', label: 'Child 21' },
      {
        id: '22',
        label: 'Parent 22',
        children: [
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
    children: [
      {
        id: '31',
        label: 'Parent 31',
        children: [
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
