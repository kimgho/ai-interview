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
        onClick() {
            alert("로그인 버튼 누름")
        },
    },
};

export const Register: Story = {
    args: {
        children: '회원가입',
        onClick() {
            alert("회원가입 버튼 누름")
        },
    },
};