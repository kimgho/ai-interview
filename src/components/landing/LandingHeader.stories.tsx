import type { Meta, StoryObj } from '@storybook/react';
import LandingHeader from './LandingHeader';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof LandingHeader> = {
    component: LandingHeader,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        )
    ]
};

export default meta;
type Story = StoryObj<typeof LandingHeader>;

export const Default: Story = {
    args: {
    },
};