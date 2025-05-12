
import { screen, render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from "vitest";
import LoginTabs from "../LoginTabs";

vi.mock('@/features/login/ui/LoginForm', () => ({
    default: () => {
        return <div>Mock Login Form</div>;
    },
}));

vi.mock('@/features/register/ui/RegisterForm', () => ({
    default: () => {
        return <div>Mock Register Form</div>;
    },
}));

describe('Login Tabs Test', () => {
    test('should render correctly with login tab active by default', async () => {
        render(<LoginTabs />);

        expect(screen.getByText('로그인')).toBeInTheDocument();
        expect(screen.getByText('회원가입')).toBeInTheDocument();

        await screen.findByText('Mock Login Form');

        await waitFor(() => {
            expect(screen.queryByText('Mock Register Form')).not.toBeInTheDocument();
        });
        const loginTabElement = screen.getByRole('tab', { name: '로그인' });
        const registerTabElement = screen.getByRole('tab', { name: '회원가입' });
        expect(loginTabElement).toHaveAttribute('data-state', 'active');
        expect(registerTabElement).toHaveAttribute('data-state', 'inactive')
    });

    test("should render correctly with register tab when user click register tab", async () => {
        render(<LoginTabs />);
        const registerTabElement = screen.getByRole('tab', { name: '회원가입' });
        const loginTabElement = screen.getByRole("tab", { name: '로그인' });

        userEvent.click(registerTabElement);

        await waitFor(() => {
            expect(screen.getByText('Mock Register Form')).toBeInTheDocument();
            expect(screen.queryByText('Mock Login Form')).not.toBeInTheDocument();
        });

        expect(loginTabElement).toHaveAttribute('data-state', 'inactive');
        expect(registerTabElement).toHaveAttribute('data-state', 'active')

    })
});