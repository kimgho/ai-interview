import { screen, render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import LandingHeader from "@/components/landing/LandingHeader";
import { MemoryRouter } from "react-router-dom";


const mockNavigate = vi.fn();
let mockPathName = '/';

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: mockPathName, search: '', hash: '', state: null })
    }
})



describe("LandingHeader Component Test", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockPathName = '/';
    })

    test("should render with correct title", () => {
        render(
            <MemoryRouter>
                <LandingHeader />
            </MemoryRouter>
        )

        const headerTitleElement = screen.getByText("AI Interview")
        expect(headerTitleElement).toBeInTheDocument()

        const loginButton = screen.getByRole('button', { name: '로그인' });
        expect(loginButton).toBeInTheDocument();

        const startButton = screen.getByRole('button', { name: '시작하기' });
        expect(startButton).toBeInTheDocument();
    })

    test("should navigate to /login when the Login button is clicked if user not logged in", async () => {
        mockPathName = "/";
        render(
            <MemoryRouter>
                <LandingHeader />
            </MemoryRouter>
        )
        const loginButton = screen.getByRole('button', { name: '로그인' });
        await userEvent.click(loginButton);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    })

    test("should not navigate when title is clicked from / path", async () => {
        mockPathName = "/";
        render(
            <MemoryRouter>
                <LandingHeader />
            </MemoryRouter>
        )
        const titleElement = screen.getByText("AI Interview")
        await userEvent.click(titleElement);
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})
