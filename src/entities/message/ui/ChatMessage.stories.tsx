import type { Meta, StoryObj } from '@storybook/react';
import { ChatMessage } from './ChatMessage';

const meta: Meta<typeof ChatMessage> = {
    component: ChatMessage,
};

export default meta;
type Story = StoryObj<typeof ChatMessage>;

export const Default: Story = {
    render: () => (
        <div className='flex flex-col max-w-md'>
            <div>
                <ChatMessage sender='LLM' timestamp='02:02' content='AI입니다람쥐' />
            </div>
            <div>
                <ChatMessage sender='USER' timestamp='02:02' content='사용자입니다람쥐' />
            </div>
        </div>
    )
}

export const AIMessage: Story = {
    args: {
        sender: "LLM",
        timestamp: "02:02",
        content: "AI답변입니다람쥐"
    },
};

export const UserMessage: Story = {
    args: {
        sender: 'USER',
        timestamp: "02:02",
        content: "사용자 답변입니다람쥐"
    }
}

export const longMessage: Story = {
    args: {
        sender: "LLM",
        timestamp: "02:10",
        content:
            "이건 어디까지 길어지는거에요?이건 어디까지 길어지는거에요?이건 어디까지 길어지는거에요?이건 어디까지 길어지는거에요?이건 어디까지 길어지는거에요?이건 어디까지 길어지는거에요?이건 어디까지 길어지는거에요?이건 어디까지 길어지는거에요?이건 어디까지 길어지는거에요?이건 어디까지 길어지는거에요?",
    },
}

export const multiLineMessage: Story = {
    args: {
        sender: "USER",
        timestamp: "02:02",
        content: "나는\n줄바꿈\n다람쥐\n입니다\n람쥐"
    }
}