import InputField from "../../../entities/auth/ui/InputField"
import LoginButton from "@/entities/auth/ui/LoginButton"


const LoginForm = () => {
    return (
        <div className="space-y-4">
            <InputField
                id="email"
                label="이메일"
                type="email"
                placeholder="name@example.com"
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
            />

            <LoginButton>로그인</LoginButton>
        </div>
    )
}

export default LoginForm