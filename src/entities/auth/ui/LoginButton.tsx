import { Button } from "@/shared/ui/button";

interface ButtonProps {
    children: React.ReactNode,
    onClick?: () => void
}
// entities/auth/ui 에 로그인 버튼, 컨테이너 를 넣고
// feature에서 entities를 참조할 수 있음
// feature/login
// feature/register
const LoginButton = ({ children, onClick }: ButtonProps) => {
    return (
        <Button type="submit" className="w-full h-12 mt- cursor-pointer bg-emerald-600 hover:bg-emerald-700" onClick={onClick}>
            {children}
        </Button>
    )
}

export default LoginButton;