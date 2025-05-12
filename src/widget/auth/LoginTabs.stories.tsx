import type { Meta, StoryObj } from '@storybook/react';
import LoginTabs from './LoginTabs';

const meta: Meta<typeof LoginTabs> = {
    component: LoginTabs,
};

export default meta;
type Story = StoryObj<typeof LoginTabs>;

export const Default: Story = {
    args: {
    },
};