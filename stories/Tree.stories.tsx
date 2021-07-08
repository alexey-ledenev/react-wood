import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Tree, ITreeProps, SelectionType, ITreeItem } from '../src';
import { MOCK_DATA } from '../mock';

const meta: Meta = {
  title: 'Tree',
  component: Tree,
  argTypes: {
    selectionType: {
      control: {
        type: 'select',
        defaultValue: SelectionType.All,
        options: Object.values(SelectionType),
      },
    },
    renderNodeIcon: {
      table: { disable: true },
    },
    onNodeExpand: {
      table: { disable: true },
    },
    onSelect: {
      table: { disable: true },
    },
    renderNodeData: {
      table: { disable: true },
    },
  },
};

export default meta;

const Template: Story<ITreeProps> = (args) => <Tree {...args} />;

export const Default = Template.bind({});
Default.args = { nodes: MOCK_DATA };

export const WithCustomStyles = Template.bind({});
const renderNodeIcon = (
  isNodeExpanded: boolean,
  isNodeSelected: boolean,
  isParentNode: boolean,
  node: ITreeItem
) => {
  if (isParentNode === true) {
    if (isNodeExpanded === true) {
      return (
        <span role="img" aria-label="Folder" title="Click to close folder">
          📂
        </span>
      );
    }
    return (
      <span role="img" aria-label="Folder" title="Click to open folder">
        📁
      </span>
    );
  }
  if (isNodeSelected === true) {
    return (
      <span role="img" aria-label="Selected">
        ✅
      </span>
    );
  }
  return (
    <span role="img" aria-label="Not selected" title={node.label}>
      ❎
    </span>
  );
};
WithCustomStyles.args = {
  nodes: MOCK_DATA,
  selectionType: SelectionType.All,
  multipleSelection: true,
  containerClassName: 'tree-container',
  nodeClassName: 'tree-node',
  nodeActiveClassName: 'tree-node_active',
  nodeIconBoxClassName: 'tree-node__icon-box',
  nodeLabelClassName: 'tree-node__label',
  loader: (
    <span role="img" aria-label="Loading">
      💤
    </span>
  ),
  noData: (
    <span role="img" aria-label="No data">
      📭
    </span>
  ),
  renderNodeIcon,
};
