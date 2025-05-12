import LoginContainer from "@/entities/auth/ui/LoginContainer"
import LoginHeader from "@/entities/auth/ui/LoginHeader"
import LoginTabs from "@/widget/auth/LoginTabs"

const LoginPage = () => {
    return (
        <LoginContainer>
            <LoginHeader />
            <LoginTabs />
        </LoginContainer>
    )
}

export default LoginPage;