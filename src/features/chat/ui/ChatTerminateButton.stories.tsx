import ChatTerminateButton from '@/features/chat/ui/ChatTerminateButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ChatTerminateButton> = {
    component: ChatTerminateButton,
};

export default meta;
type Story = StoryObj<typeof ChatTerminateButton>;

export const Default: Story = {
    args: {
    },
};