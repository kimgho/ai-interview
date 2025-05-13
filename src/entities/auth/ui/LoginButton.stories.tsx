import type { Meta, StoryObj } from '@storybook/react';
import LoginButton from './LoginButton';

const meta: Meta<typeof LoginButton> = {
    component: LoginButton,
};

export default meta;
type Story = StoryObj<typeof LoginButton>;

export const Login: Story = {
    args: {
        children: '로그인',
        disabled: false
    },
};

export const Signup: Story = {
    args: {
        children: '회원가입',
        disabled: false
    },
};

export const loadingLogin: Story = {
    args: {
        children: '로그인중입니다..',
        disabled: true
    }
}

export const loadingSignup: Story = {
    args: {
        children: "회원가입중입니다..",
        disabled: true
    }
}