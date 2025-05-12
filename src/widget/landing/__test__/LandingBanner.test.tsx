import { screen, render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LandingBanner from "../LandingBanner";

const mockNavigate = vi.fn();
let mockPathName = "/";

vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>()
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: mockPathName })
    }

});

describe("LandingBanner Component Test", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockPathName = "/"
    })

    test("should render with correct banner text", () => {
        render(
            <MemoryRouter>
                <LandingBanner />
            </MemoryRouter>
        )

        const headerElement = screen.getByText("매일 매일 꾸준한 기술 면접 준비");
        const pElement = screen.getByText("AI와 기술 면접을 해보세요")
        const buttomElement = screen.getByRole("button", { name: '무료로 시작하기' })

        expect(headerElement).toBeInTheDocument();
        expect(pElement).toBeInTheDocument();
        expect(buttomElement).toBeInTheDocument();
    })

    test("should navigate to /login when the button is clicked", async () => {
        render(
            <MemoryRouter>
                <LandingBanner />
            </MemoryRouter>
        )
        const buttonElement = screen.getByRole("button", { name: '무료로 시작하기' })
        await userEvent.click(buttonElement);
        expect(mockNavigate).toHaveBeenCalledTimes(1);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    })
})