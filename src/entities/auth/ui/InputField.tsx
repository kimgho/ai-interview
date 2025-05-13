import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label"
import React from 'react';

interface InputFieldProps {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    rightElement?: React.ReactNode;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    error?: string;
}

const InputField = ({
    id,
    label,
    type = "text",
    placeholder = "",
    rightElement = null,
    name,
    value,
    onChange,
    disabled = false,
    error: validationError = undefined
}: InputFieldProps) => {
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
                    className="h-12 border-gray-300 rounded-md px-3 py-2"
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                />
            </div>
            {validationError && <p className="text-red-500 text-sm mt-1">{validationError}</p>}
        </div>
    )
}
export default InputField;