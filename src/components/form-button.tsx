'use client'

import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
    children: React.ReactNode
}

export default function FormButton({ children } : FormButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button 
            type="submit" 
            className={`bg-dark text-white font-bold text-[16px] leading-none h-auto py-[14.5px] px-[29.5px] mt-[40px] ${pending ? 'is-loading' : ''}`}>
                {children}
        </Button>
    );
}