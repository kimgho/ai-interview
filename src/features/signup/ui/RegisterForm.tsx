import InputField from "@/entities/auth/ui/InputField";
import LoginButton from "@/entities/auth/ui/LoginButton"
import { useSignUp } from "../model/useSignUp"

const RegisterForm = () => {
    const { error, formData, handleChange, handleSubmit, loading, success, fieldError } = useSignUp();
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
                id="name"
                label="이름"
                placeholder="홍길동"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={fieldError.name}
            />

            <InputField
                id="register-email"
                label="이메일"
                type="email"
                placeholder="name@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={fieldError.email}
            />

            <InputField
                id="register-password"
                label="비밀번호"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={fieldError.password}
            />

            <InputField
                id="confirm-password"
                label="비밀번호 확인"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={fieldError.confirmPassword}
            />

            <LoginButton disabled={loading}> {loading ? '가입 중...' : '회원가입'}</LoginButton>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-600 text-sm mt-2">회원가입이 성공적으로 완료되었습니다!</p>}
        </form >
    )
}
export default RegisterForm