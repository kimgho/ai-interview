import type { Meta, StoryObj } from '@storybook/react';
import LandingGuide from './LandingGuide';

const meta: Meta<typeof LandingGuide> = {
    component: LandingGuide,
};

export default meta;
type Story = StoryObj<typeof LandingGuide>;

export const Default: Story = {
    args: {
    },
};