'use client'

import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

interface FormButtonProps {
    children: React.ReactNode
}

export default function FormButton({ children } : FormButtonProps) {
    const { pending } = useFormStatus();

    if(pending) {

        return (
            <Button 
                disabled
                type="submit" 
                className={`bg-dark text-white font-bold text-[16px] leading-none h-auto py-[14.5px] px-[29.5px] mt-[40px] ${pending ? 'is-loading' : ''}`}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                    Loading
            </Button>
        );
    }
    
    return (
        <Button 
            type="submit" 
            className={`bg-dark text-white font-bold text-[16px] leading-none h-auto py-[14.5px] px-[29.5px] mt-[40px] ${pending ? 'is-loading' : ''}`}>
                {children}
        </Button>
    );
}