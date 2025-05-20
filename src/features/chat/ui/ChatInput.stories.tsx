import type { Meta, StoryObj } from '@storybook/react';
import ChatInput from './ChatInput';

const meta: Meta<typeof ChatInput> = {
    component: ChatInput,
};

export default meta;
type Story = StoryObj<typeof ChatInput>;

export const Default: Story = {
    args: {
        isInterviewEnded: false
    },
};

export const Loading: Story = {
    args: {
        isLoading: true,
        isInterviewEnded: false
    }
}
export const Disable: Story = {
    args: {
        isInterviewEnded: true
    }
}