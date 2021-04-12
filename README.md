# React-Wood

[![NPM](https://img.shields.io/npm/v/react-wood?style=flat)](https://www.npmjs.com/package/react-wood)
[![npm bundle size](https://img.shields.io/bundlephobia/min/react-wood?color=success&label=minified&style=flat)](https://bundlephobia.com/result?p=react-wood)

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
import { Tree } from 'react-wood';

const nodes = [
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

const App = () => {
  return (
    <div>
      <Tree
        nodes={nodes}
        selectionType="child"
        multipleSelection={true}
      />
    </div>
  );
};
```

## License
MIT © [Alexey Ledenev](https://github.com/alexey-ledenev)
