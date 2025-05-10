import type { Meta, StoryObj } from '@storybook/react';
import { ChatLoading } from './ChatLoading';

const meta: Meta<typeof ChatLoading> = {
    component: ChatLoading,
};

export default meta;
type Story = StoryObj<typeof ChatLoading>;

export const Default: Story = {
    args: {

    },
};