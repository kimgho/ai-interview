import InputField from "@/entities/auth/ui/InputField"
import LoginButton from "@/entities/auth/ui/LoginButton"
import { useLogin } from "../model/useLogin"


const LoginForm = () => {
    const { error, fieldError, formData, handleChange, handleSubmit, loading } = useLogin();
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
                id="email"
                label="이메일"
                type="email"
                placeholder="name@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={fieldError.email}
            />

            <InputField
                id="password"
                label="비밀번호"
                type="password"
                rightElement={
                    <a href="/forgot-password" className="text-sm text-emerald-600 hover:underline">
                        비밀번호 찾기
                    </a>
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={fieldError.password}
            />

            <LoginButton disabled={loading}>{loading ? '로그인중입니다..' : '로그인'}</LoginButton>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
    )
}

export default LoginForm