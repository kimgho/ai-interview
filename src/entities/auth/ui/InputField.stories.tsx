import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
    component: InputField,
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Default: Story = {
    args: {
    },
};

export const emailField: Story = {
    args: {
        id: "email",
        label: "이메일",
        type: "email",
        placeholder: "name@example.com"
    }
}

export const passwordField: Story = {
    args: {
        id: "password",
        label: "비밀번호",
        type: "password"
    }
}

export const nameField: Story = {
    args: {
        id: "name",
        label: "이름",
        placeholder: "홍길동"
    }
}

export const confirmPasswordField: Story = {
    args: {
        id: "confirm-password",
        label: "비밀번호 확인",
        type: "password"
    }
}
