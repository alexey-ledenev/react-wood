# React-Wood

[![NPM](https://img.shields.io/npm/v/react-wood?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/react-wood)
[![Build Size](https://img.shields.io/bundlephobia/min/react-wood?label=bundle%20size&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/result?p=react-wood)
![npm type definitions](https://img.shields.io/npm/types/react-wood?style=flat&colorA=000000&colorB=000000)

> 🌳 A tree view component for React.

## Installation
### With NPM
```sh
npm install react-wood
```

### With Yarn
```sh
yarn add react-wood
```

## Getting Started

```jsx
import { Tree, ITreeItem } from 'react-wood';

const nodes: ITreeItem[] = [
  {
    id: '1',
    label: 'Parent 1',
    children: [
      { id: '11', label: 'Child 11' },
      { id: '12', label: 'Child 12' },
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
        ],
      },
      { id: '23', label: 'Child 23' },
    ],
  }
];

const renderNodeIcon = (
  isNodeExpanded: boolean,
  isNodeSelected: boolean,
  isParentNode: boolean,
  node: ITreeItem
) => {
  if (isParentNode === true) {
    if (isNodeExpanded === true) {
      return <span>📂</span>;
    }
    return <span>📁</span>;
  }
  if (isNodeSelected === true) {
    return <span>✅</span>;
  }
  return <span title={node.label}>❎</span>;
};

const App = () => {
  const handleNodeExpand = (expandedNode: ITreeItem) => {
    // here you can make a request to get child nodes
    console.log('Expanded: ', expandedNode);
  };

  /**
   * @param selectedNodes An array of the currently selected items.
   */
  const handleSelect = (selectedNodes: ITreeItem[]) => {
    console.log('Selected nodes: ', selectedNodes);
  };

  return (
    <div className="my-app">
      <Tree
        nodes={nodes} // only this prop is required
        selectionType="child"
        multipleSelection={true}
        disabledIds={['12']}
        onNodeExpand={handleNodeExpand}
        onSelect={handleSelect}
        renderNodeIcon={renderNodeIcon}
        containerClassName="my-app-tree"
      />
    </div>
  );
};
```


## API
### Main component
```jsx
<Tree
  nodes={Array} // REQUIRED: Nodes array.
  selectionType={String} // Elements available for selection: 'child', 'parent', 'all', 'none' (default: 'none').
  multipleSelection={Boolean} // Is multiple selection allowed (default: false).
  disabledIds={Array} // Array of node ids. Disable selection of specified nodes (default: undefined).
  containerClassName={String} // Default: undefined.
  nodeClassName={String} // Default: undefined.
  nodeActiveClassName={String} // Default: undefined.
  nodeContentClassName={String} // Default: undefined.
  nodeIconBoxClassName={String} // Default: undefined.
  nodeIconClassName={String} // Default: undefined.
  nodeLabelClassName={String} // Default: undefined.
  onNodeExpand={Function} // Called when an item is expanded (default: undefined).
  onSelect={Function} // Called when an item is selected (default: undefined).
  renderNodeData={Function} // A function for drawing additional content inside nodes (default: undefined).
  renderNodeIcon={Function} // A function for drawing icons (default: Angle SVG icon).
  loader={Object} // A ReactNode for indicating nodes loading state (default: <div className="Wood-info Wood-info_loading">...</div>).
  noData={Object} // A ReactNode for indicating empty tree (default: <div className="Wood-info Wood-info_noData">No data</div>).
/>
```

### Nodes format
- Nodes should be a flat list of objects containing the following fields `id` (required), `label` (required), `children` (optional; uses for parent nodes).
- The `id` field should be `string` or `number`.
- The `label` field should be `string`.
- The `children` field should be `undefined` (for child nodes), `null` (for indicating the process of loading child nodes) or `an array of child nodes`.
Example:
```json
[
  {
    "id": 1,
    "label": "Parent 1",
    "children": [
      { "id": 11, "label": "Child 11" },
      { "id": 12, "label": "Child 12" },
    ],
  },
  {
    "id": 2,
    "label": "Parent 2",
    "children": [
      { "id": 21, "label": "Child 21" },
      {
        "id": 22,
        "label": "Parent 22",
        "children": [
          { "id": 221, "label": "Child 221" },
          { "id": 222, "label": "Child 222" },
        ],
      },
      { "id": 23, "label": "Child 23" },
    ],
  }
]
```

### Tree component props typings
Prop | Description | Type
------------ | ------------- | -------------
nodes | Tree nodes array (see `Nodes format`) | ITreeItem[]
selectionType? | Indicates the type of nodes available for selection | 'child', 'parent', 'all', 'none' (default: 'none')
multipleSelection? | Is multiple selection allowed | boolean (default: false)
disabledIds? | Disable selection of specified nodes | (string | number)[]
containerClassName? |  | string
nodeClassName? |  | string
nodeActiveClassName? |  | string
nodeContentClassName? |  | string
nodeIconBoxClassName? |  | string
nodeIconClassName? |  | string
nodeLabelClassName? |  | string
onNodeExpand? | Called when an item is expanded | (expandedNode: ITreeItem) => void
onSelect? | Called when an item is selected. Argument is array of the currently selected items | (selectedNodes: ITreeItem[]) => void
renderNodeData? | A function for drawing additional content inside nodes | (node: ITreeItem, isNodeSelected: boolean) => ReactNode
renderNodeIcon? | A function for drawing icons | (isNodeExpanded: boolean, isNodeSelected: boolean, isParentNode: boolean, node: ITreeItem) => ReactNode
loader? | A ReactNode for indicating nodes loading state | ReactNode
noData? | A ReactNode for indicating empty tree | ReactNode

## License
MIT © [Alexey Ledenev](https://github.com/alexey-ledenev)
