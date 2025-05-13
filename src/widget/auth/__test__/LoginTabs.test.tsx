import { screen, render, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from 'react-router-dom';

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

    let user: ReturnType<typeof userEvent.setup>;
    beforeEach(() => {
        user = userEvent.setup();
    });


    test('should render correctly with login tab active by default', async () => {
        render(
            <MemoryRouter>
                <LoginTabs />
            </MemoryRouter>
        );

        expect(screen.getByText('로그인')).toBeInTheDocument();
        expect(screen.getByText('회원가입')).toBeInTheDocument();


        await waitFor(() => {
            expect(screen.queryByText('Mock Register Form')).not.toBeInTheDocument();
        }, { timeout: 4000 });

        const loginTabElement = screen.getByRole('tab', { name: '로그인' });
        const registerTabElement = screen.getByRole('tab', { name: '회원가입' });

        expect(loginTabElement).toHaveAttribute('data-state', 'active');
        expect(registerTabElement).toHaveAttribute('data-state', 'inactive');
    });


    test("should render correctly with register tab when user click register tab", async () => {
        render(
            <MemoryRouter>
                <LoginTabs />
            </MemoryRouter>
        );

        const registerTabElement = screen.getByRole('tab', { name: '회원가입' });
        const loginTabElement = screen.getByRole("tab", { name: '로그인' });


        await user.click(registerTabElement);


        await waitFor(() => {
            expect(screen.queryByText('Mock Login Form')).not.toBeInTheDocument();
        }, { timeout: 4000 });


        expect(loginTabElement).toHaveAttribute('data-state', 'inactive');
        expect(registerTabElement).toHaveAttribute('data-state', 'active');
    });
});