'use client'

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { createUser } from "@/actions/user";
import { ChangeEvent, useState, useRef, useEffect} from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useFormState } from "react-dom";
import FormButton from "./form-button";
import { useToast } from "@/hooks/use-toast";
import ProviderLoginList from "./provider-login-list";

export default function SignUpForm() {

    const [formState, formAction]     = useFormState(createUser.bind(null, ), { errors: {}, success: false });
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef                = useRef<HTMLInputElement | null>(null);
    const formRef                     = useRef<HTMLFormElement | null>(null); 
    const { toast }                   = useToast();

    const handleInputFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const file = event.target.files?.[0];

        if(file) {

            const fileReader = new FileReader();

            fileReader.onload = (event: ProgressEvent<FileReader>) => {

                if(event.target) {
                    
                    setPreviewUrl(event.target.result);

                }
                

            };

            fileReader.readAsDataURL(file);
        }
    };

    const handleRemoveInputFile = () => {

        setPreviewUrl(null);

        if(fileInputRef.current) {

            fileInputRef.current.value = '';

        }

    }

    useEffect(() => {

        // reset form and pop up message after successful submition
        if(formState.success === true) {

            if(formRef) {

                setPreviewUrl(null);

                formRef.current?.reset();

                console.log('You have created your profile successfully.');

                if(fileInputRef.current) {

                    fileInputRef.current.value = '';
                    
                }

                // show popup message
                toast({
                    title: "You have registered successfully!",
                });

            }
        }

       
    

    }, [formState.success]);


    return (
        <div className="bg-white border-2 border-[#ADADAD] rounded-[10px] px-[30px] md:px-[50px] py-[50px] border-dashed">
            <h2 className="font-balthazar text-[45px] text-center mb-[40px]">Sign Up</h2>
            <form action={formAction} ref={formRef}>
                <div className="mb-[15px]">
                    <label 
                        htmlFor="name" 
                        className="block mb-3">Name:</label>
                    <Input
                        className={`bg-light h-[45px] placeholder:text-[#888888] rounded-[5px] px-[15px] shadow-none border-transparent ${formState.errors.name ? 'border border-danger' : ''}`}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"/>

                    {formState.errors.name && 
                        <p className="text-danger text-[12px]">{formState.errors.name[0]}</p>
                    }
                </div>
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
                <div className="mb-[15px]">
                    <label 
                        htmlFor="avatar" 
                        className="block mb-3">Avatar:</label>
                    <div 
                        className={`w-[70px] h-[70px] rounded-full border border-dashed bg-light relative ${formState.errors.avatar ? 'border-danger' : 'border-dark'}`}>
                        
                        {previewUrl &&

                            <>
                                <Image 
                                src={previewUrl as string} 
                                alt="Preview" 
                                width="70" 
                                height="70" 
                                className="rounded-full object-cover object-center w-full h-full"/>

                                <Button 
                                    variant="outline" 
                                    size="icon" 
                                    title="Remove"
                                    className="absolute top-[-13px] right-[-10px] z-[2] rounded-full"
                                    onClick={handleRemoveInputFile}>
                                    <X/>
                                </Button>
                            </>
                        }
                        <Input
                            className="leading-[35px] bg-light placeholder:text-[#888888] px-[15px] shadow-none border-transparent opacity-0 absolute top-0 left-0 w-full h-full rounded-full cursor-pointer"
                            type="file"
                            name="avatar"
                            accept="image/png, image/gif, image/jpeg"
                            id="avatar"
                            ref={fileInputRef}
                            onChange={handleInputFileChange}/>

                    
                    </div>

                    {formState.errors.avatar && 
                        <p className="text-danger text-[12px]">{formState.errors.avatar[0]}</p>
                    }
                    
                </div>
                <FormButton>Submit</FormButton>
            </form>
            <div className="pt-10">
                <p className="text-center text-dark mb-[20px]">Or login using</p>
                <ProviderLoginList/>
            </div>
        </div>
    );
}