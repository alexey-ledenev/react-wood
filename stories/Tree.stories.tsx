import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Tree, ITreeProps, SelectionType } from '../src';
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
  },
};

export default meta;

const Template: Story<ITreeProps> = (args) => <Tree {...args} />;
export const Default = Template.bind({});
Default.args = {
  nodes: MOCK_DATA,
  selectionType: SelectionType.All,
  multipleSelection: true,
};
