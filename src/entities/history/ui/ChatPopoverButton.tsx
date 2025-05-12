interface PopoverButtonProps {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "danger";
}
//사이드바 종속
// feature/chat/ui?
// history를 entities로 빼면 /entities/history/ui
const ChatPopoverButton = ({ label, icon, onClick, variant = "default" }: PopoverButtonProps) => {
    const variantClasses = {
        default: "",
        danger: "text-red-500"
    };

    return (
        <button
            className={`flex items-center justify-between w-full p-2 text-sm rounded-md cursor-pointer hover:bg-accent ${variantClasses[variant]}`}
            onClick={onClick}
        >
            <span>{label}</span>
            {icon}
        </button>
    );
};

export default ChatPopoverButton