import { screen, render } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import RegisterForm from "@/components/login/RegisterForm";

describe('RegisterForm test', () => {
    test("should render correctly with register form", () => {
        render(<RegisterForm />)

        const buttonElement = screen.getByText("회원가입");

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
        expect(buttonElement).toHaveAttribute("type", "submit");

        expect(screen.getByText("이름")).toBeInTheDocument()
        expect(screen.getByText('이메일')).toBeInTheDocument()
        expect(screen.getByText('비밀번호')).toBeInTheDocument()
        expect(screen.getByText('비밀번호 확인')).toBeInTheDocument()
        expect(screen.getByText('회원가입')).toBeInTheDocument()

    })
})