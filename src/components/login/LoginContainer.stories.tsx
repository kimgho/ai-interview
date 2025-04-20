import type { Meta, StoryObj } from '@storybook/react';
import LoginContainer from './LoginContainer';

const meta: Meta<typeof LoginContainer> = {
    component: LoginContainer,
};

export default meta;
type Story = StoryObj<typeof LoginContainer>;

export const Default: Story = {
};
