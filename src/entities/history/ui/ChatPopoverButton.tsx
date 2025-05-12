interface PopoverButtonProps {
    label: string;
    icon: React.ReactNode;
    onClick?: () => void;
    variant?: "default" | "danger";
}

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