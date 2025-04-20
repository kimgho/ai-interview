import InputField from "./InputField"
import LoginButton from "./LoginButton"

const RegisterForm = () => {
    return (
        <div className="space-y-4">
            <InputField
                id="name"
                label="이름"
                placeholder="홍길동"
            />

            <InputField
                id="register-email"
                label="이메일"
                type="email"
                placeholder="name@example.com"
            />

            <InputField
                id="register-password"
                label="비밀번호"
                type="password"
            />

            <InputField
                id="confirm-password"
                label="비밀번호 확인"
                type="password"
            />

            <LoginButton>회원가입</LoginButton>
        </div>
    )
}
export default RegisterForm