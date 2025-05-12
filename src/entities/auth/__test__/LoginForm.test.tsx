import { screen, render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import LoginForm from "@/features/login/ui/LoginForm";

describe('LoginForm Test', () => {
    test("should render correctly with login form", () => {
        render(<LoginForm />)

        const buttonElement = screen.getByText('로그인');

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeInstanceOf(HTMLButtonElement)
        expect(buttonElement).toHaveAttribute('type', 'submit')

        expect(screen.getByText("이메일")).toBeInTheDocument();
        expect(screen.getByText("비밀번호")).toBeInTheDocument();
        expect(screen.getByText("비밀번호 찾기")).toBeInTheDocument();
    })
})