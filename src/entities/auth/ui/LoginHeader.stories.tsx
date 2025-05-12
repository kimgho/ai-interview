import type { Meta, StoryObj } from '@storybook/react';
import LoginHeader from './LoginHeader';

const meta: Meta<typeof LoginHeader> = {
    component: LoginHeader,
};

export default meta;
type Story = StoryObj<typeof LoginHeader>;

export const Default: Story = {
    args: {
    },
};