import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessageLoading } from './ChatMessageLoading';

const meta: Meta<typeof ChatMessageLoading> = {
    component: ChatMessageLoading,
};

export default meta;
type Story = StoryObj<typeof ChatMessageLoading>;

export const Default: Story = {
    args: {

    },
};