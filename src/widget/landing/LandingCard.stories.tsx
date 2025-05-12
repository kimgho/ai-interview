import type { Meta, StoryObj } from '@storybook/react';
import LandingCard from './LandingCard';

const meta: Meta<typeof LandingCard> = {
    component: LandingCard,
};

export default meta;
type Story = StoryObj<typeof LandingCard>;

export const Default: Story = {
    args: {
    },
};