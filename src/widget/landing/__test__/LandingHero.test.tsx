import { screen, render } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import LandingHero from "../LandingHero";

const mockNavigate = vi.fn();
let mockPathName = "/";

vi.mock('react-router-dom', async (importOriginal) => {
    const acutual = await importOriginal<typeof import('react-router-dom')>();

    return {
        ...acutual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ pathname: mockPathName })
    }
})

describe('LandingHero Component Test', () => {
    beforeEach(() => {
        mockNavigate.mockClear();
        mockPathName = "/"
    })
    test("should render with correct text and button", () => {
        render(
            <MemoryRouter>
                <LandingHero />
            </MemoryRouter>
        )
        screen.debug();
        const headerByRole = screen.getByRole('heading', { level: 1, name: /AI와 함께하는.*기술 면접 준비/ });
        const startButtonElement = screen.getByRole("button", { name: "무료로 시작하기" })
        const guideButtonElement = screen.getByRole("button", { name: "사용 방법 알아보기" })

        expect(headerByRole).toBeInTheDocument()
        expect(startButtonElement).toBeInTheDocument();
        expect(guideButtonElement).toBeInTheDocument();
    })

    test("should navigate to login when the startButton is clicked", async () => {
        mockPathName = "/";
        render(
            <MemoryRouter>
                <LandingHero />
            </MemoryRouter>
        )
        const startButtonElement = screen.getByRole("button", { name: "무료로 시작하기" })
        await userEvent.click(startButtonElement)
        expect(mockNavigate).toHaveBeenCalledTimes(1)
        expect(mockNavigate).toHaveBeenCalledWith("/login")
    })

    test("should navigate to #how-it-works when the guide button is clicked", async () => {
        render(
            <MemoryRouter>
                <LandingHero />
            </MemoryRouter>
        )
        const guideButtonElement = screen.getByRole("button", { name: "사용 방법 알아보기" })
        await userEvent.click(guideButtonElement)
        expect(mockNavigate).toHaveBeenCalledTimes(1)
        expect(mockNavigate).toHaveBeenCalledWith("#how-it-works");
    })
})