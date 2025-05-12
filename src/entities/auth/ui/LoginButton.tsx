import { Button } from "@/shared/ui/button";

interface ButtonProps {
    children: React.ReactNode,
    onClick?: () => void
}

const LoginButton = ({ children, onClick }: ButtonProps) => {
    return (
        <Button type="submit" className="w-full h-12 mt- cursor-pointer bg-emerald-600 hover:bg-emerald-700" onClick={onClick}>
            {children}
        </Button>
    )
}

export default LoginButton;