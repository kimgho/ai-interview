import type { Meta, StoryObj } from '@storybook/react';
import ChatHistoryItem from './ChatHistoryItem';
import { SidebarProvider } from '@/shared/ui/sidebar';

const meta: Meta<typeof ChatHistoryItem> = {
    component: ChatHistoryItem,
    decorators: (Story) => (
        <SidebarProvider>
            <Story />
        </SidebarProvider>
    )
};

export default meta;
type Story = StoryObj<typeof ChatHistoryItem>;

export const Default: Story = {
    args: {
        title: "기본 값입니다람쥐",
        timestamp: "2025-05-07",
        endedAt: null
    },
};

export const ActiveChat: Story = {
    args: {
        title: "현재 채팅중인 방입니다람쥐",
        timestamp: "2025-05-07",
        isActive: true,
        endedAt: null
    }
}

export const LongChat: Story = {
    args: {
        title: "매우 매우 긴 채팅방 제목입니다람쥐매우 매우 긴 채팅방 제목입니다람쥐매우 매우 긴 채팅방 제목입니다람쥐",
        timestamp: "2025-05-07",
        endedAt: null
    }
}

export const TerminatedChat: Story = {
    args: {
        endedAt: "2025-05-21",
        title: "종료된 인터뷰입니다.",
        timestamp: "2025-05-21"
    }
}