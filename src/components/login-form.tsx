'use client'

import { useFormState } from "react-dom";
import ProviderLoginList from "./provider-login-list";
import { Input } from "./ui/input";
import FormButton from "./form-button";
import userLogin from "@/actions/user-login";
<<<<<<< HEAD
import { useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";


export default function LoginForm() {
    const [formState, formAction] = useFormState(userLogin, { errors: {}, success: false });
    const formRef = useRef<HTMLFormElement | null>(null);
    const { toast } = useToast();
    const router = useRouter();

    useEffect(() => {

        if(formState.success && formRef.current) {
            
            formRef.current.reset();

            // show popup message
            toast({
                title: "You have logged in successfully!",
            });
        }

    }, [formState.success]);
=======


export default function LoginForm() {
    const [formState, formAction]     = useFormState(userLogin, { errors: {}, success: false });
>>>>>>> 47e26c1fd5a370604d38f8d880cfa098d437e029
    
    return (
        <div className="bg-white border-2 border-[#ADADAD] rounded-[10px] px-[30px] md:px-[50px] py-[50px] border-dashed">
            <h2 className="font-balthazar text-[45px] text-center mb-[40px]">Login</h2>
<<<<<<< HEAD
            <form action={formAction} ref={formRef}>
=======
            <form action={formAction}>
>>>>>>> 47e26c1fd5a370604d38f8d880cfa098d437e029
                <div className="mb-[15px]">
                    <label 
                        htmlFor="email" 
                        className="block mb-3">Email:</label>
                    <Input
                        className={`bg-light h-[45px] placeholder:text-[#888888] rounded-[5px] px-[15px] shadow-none border-transparent ${formState.errors.email ? 'border border-danger' : ''}`}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"/>

                    {formState.errors.email && 
                        <p className="text-danger text-[12px]">{formState.errors.email[0]}</p>
                    }
                </div>
                <div className="mb-[15px]">
                    <label 
                        htmlFor="password" 
                        className="block mb-3">Password:</label>
                    <Input
                        className={`bg-light h-[45px] placeholder:text-[#888888] rounded-[5px] px-[15px] shadow-none border-transparent ${formState.errors.password ? 'border border-danger' : ''}`}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"/>
                    {formState.errors.password && 
                        <p className="text-danger text-[12px]">{formState.errors.password[0]}</p>
                    }
                </div>
                <FormButton>Submit</FormButton>

                {formState.errors._form &&
                    <p className="text-danger text-[12px] mt-[15px]">{formState.errors._form}</p>
                }
            </form>
            <div className="pt-10">
                <p className="text-center text-dark mb-[20px]">Or login using</p>
                <ProviderLoginList/>
            </div>
        </div>
    );
}