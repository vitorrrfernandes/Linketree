import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input (props: InputProps) {
    return (
        
        <input className="border 0 h-9 mb-2 bg-white rounded-md outline-none px-2" 
        {...props}
        />
        
    )
}