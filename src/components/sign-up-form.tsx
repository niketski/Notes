'use client'

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Facebook, Mail } from "lucide-react";
import * as actions from '@/actions';
import { createUser } from "@/actions/user";
import { ChangeEvent, useState, useRef} from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useFormState } from "react-dom";
import FormButton from "./form-button";

export default function SignUpForm() {

    const [formState, formAction]     = useFormState(createUser.bind(null, ), { errors: {} });
    const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer | null>(null);
    const fileInputRef                = useRef<HTMLInputElement | null>(null);

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

    console.log(formState);
    console.log(formState.errors.name);
    return (
        <div className="bg-white border-2 border-[#ADADAD] rounded-[10px] px-[30px] md:px-[50px] py-[50px] border-dashed">
            <h2 className="font-balthazar text-[45px] text-center mb-[40px]">Sign Up</h2>
            <form action={formAction}>
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
                {/* <Button 
                    type="submit" 
                    className="bg-dark text-white font-bold text-[16px] leading-none h-auto py-[14.5px] px-[29.5px] mt-[40px]">Submit</Button> */}
            </form>
            <div className="pt-10">
                <p className="text-center text-dark mb-[20px]">Or Signup using</p>
                <div className="flex justify-center items-center">
                    <form action={actions.signIn.bind(null,  'facebook')}>
                        <Button 
                            type="submit"
                            className="bg-[#1877F2] text-white inline-flex items-center justify-center w-[40px] h-[40px] rounded-[5px] p-0 mr-[20px]">
                            <Facebook/>
                        </Button>
                    </form>
                    <form action={actions.signIn.bind(null, 'google')}>
                        <Button 
                            type="submit"
                            className="bg-[#DB4437] text-white inline-flex items-center justify-center w-[40px] h-[40px] rounded-[5px] p-0">
                            <Mail/>
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}