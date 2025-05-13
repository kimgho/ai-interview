import { Button } from "@/shared/ui/button";

interface ButtonProps {
    children: React.ReactNode,
    disabled?: boolean
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LoginButton = ({ children, disabled, onClick }: ButtonProps) => {
    return (
        <Button type="submit" className="w-full h-12 mt- cursor-pointer bg-emerald-600 hover:bg-emerald-700" disabled={disabled} onClick={onClick} >
            {children}
        </Button>
    )
}

export default LoginButton;