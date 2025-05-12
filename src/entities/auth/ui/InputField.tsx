import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label"

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    rightElement?: React.ReactNode;
}
// 로그인 회원가입 폼 에서 공통으로 사용
// entities/auth/ui
const InputField = ({ id, label, type = "text", placeholder = "", rightElement = null }: InputFieldProps) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label htmlFor={id} className="text-gray-700">
                    {label}
                </Label>
                {rightElement}
            </div>
            <div className="relative">
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    className="h-12 pl-10 border-gray-300 rounded-md"
                />
            </div>
        </div>
    )
}
export default InputField