import type { Meta, StoryObj } from '@storybook/react';
import LoginTabs from './LoginTabs';
import { MemoryRouter } from 'react-router';

const meta: Meta<typeof LoginTabs> = {
    component: LoginTabs,
    decorators: (Story) => (
        <MemoryRouter>
            <Story />
        </MemoryRouter>
    )
};

export default meta;
type Story = StoryObj<typeof LoginTabs>;

export const Default: Story = {
    args: {
    },
};