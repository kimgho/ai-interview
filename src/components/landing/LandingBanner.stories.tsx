import type { Meta, StoryObj } from '@storybook/react';
import LandingBanner from './LandingBanner';

const meta: Meta<typeof LandingBanner> = {
    component: LandingBanner,
};

export default meta;
type Story = StoryObj<typeof LandingBanner>;

export const Default: Story = {
    args: {
    },
};