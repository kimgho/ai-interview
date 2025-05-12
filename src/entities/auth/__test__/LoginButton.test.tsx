import { screen, render, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import LoginButton from "../ui/LoginButton";

describe("LoginButton Test", () => {
    const buttonLabels = [
        '로그인',
        '회원가입',
    ];
    test.each(buttonLabels)("should render button with %s label", (label) => {
        render(<LoginButton>{label}</LoginButton>);

        const buttonElement = screen.getByText(label);

        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
        expect(buttonElement).toHaveAttribute("type", "submit");
    });
    test("should call onClick when clicked", () => {
        const handleClick = vi.fn();
        render(<LoginButton onClick={handleClick}>로그인</LoginButton>)
        const buttonLabel = screen.getByText("로그인");
        fireEvent.click(buttonLabel);
        expect(handleClick).toHaveBeenCalledTimes(1);
    })
})
