import type { Meta, StoryObj } from '@storybook/react';
import ChatPopover from './ChatPopover';
import React from 'react';
import { Popover } from '../ui/popover';

const meta: Meta<typeof ChatPopover> = {
    component: ChatPopover,
    decorators: (Story) => (
        <Popover>
            <Story />
        </Popover>
    )
};

export default meta;
type Story = StoryObj<typeof ChatPopover>;

const HoverWrapper: React.FC = () => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div
            className="w-80 p-5 border rounded"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative">
                호버호버호버
                <ChatPopover
                    isVisible={isHovered}
                    onEdit={() => console.log('수정')}
                    onDelete={() => console.log('삭제')}
                />
            </div>
        </div>
    );
};

export const Default: Story = {
    render: () => <HoverWrapper />
};