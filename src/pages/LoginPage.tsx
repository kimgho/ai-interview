import LoginContainer from "@/components/login/LoginContainer"
import LoginHeader from "@/components/login/LoginHeader"
import LoginTabs from "@/components/login/LoginTabs"

const LoginPage = () => {
    return (
        <LoginContainer>
            <LoginHeader />
            <LoginTabs />
        </LoginContainer>
    )
}

export default LoginPage;