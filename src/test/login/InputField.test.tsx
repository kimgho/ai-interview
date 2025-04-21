import { screen, render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';

import InputField from '@/components/login/InputField';
describe("InputField Component Test", () => {

    test("should render with label and input field", () => {
        render(<InputField id="username-input" label="사용자 이름" />);
        const inputElement = screen.getByLabelText("사용자 이름");

        const labelElement = screen.getByText("사용자 이름");

        expect(inputElement).toBeInTheDocument();
        expect(labelElement).toBeInTheDocument();

        expect(inputElement).toHaveAttribute('type', 'text');
    });

    test("should render with the correct placeholder", () => {
        const placeholderText = "이름을 입력하세요";
        render(<InputField id="name-input" label="이름" placeholder={placeholderText} />);

        const inputElement = screen.getByPlaceholderText(placeholderText);

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('placeholder', placeholderText);
    });

    test("should render with the specified type", () => {
        render(<InputField id="password-input" label="비밀번호" type="password" />);

        const inputElement = screen.getByLabelText("비밀번호");

        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute('type', 'password');
    });

    test("should render the rightElement when provided", () => {
        const rightElementContent = <span>오른쪽 내용</span>;

        render(<InputField id="extra-input" label="추가 정보" rightElement={rightElementContent} />);

        const renderedRightElement = screen.getByText("오른쪽 내용");

        expect(renderedRightElement).toBeInTheDocument();
    });

    test("should not render rightElement if not provided", () => {
        render(<InputField id="simple-input" label="단순 입력" />);

        const rightElementContent = screen.queryByText("오른쪽 내용");

        expect(rightElementContent).not.toBeInTheDocument();
    });

});