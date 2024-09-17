import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Facebook, Mail } from "lucide-react";
import * as actions from '@/actions';
import * as userActions from '@/actions/user';

export default function SignUpForm() {
    return (
        <div className="bg-white border-2 border-[#ADADAD] rounded-[10px] px-[30px] md:px-[50px] py-[50px] border-dashed">
            <h2 className="font-balthazar text-[45px] text-center mb-[40px]">Sign Up</h2>
            <form action={userActions.createUser}>
                <div className="mb-[15px]">
                    <label 
                        htmlFor="name" 
                        className="block mb-3">Name:</label>
                    <Input
                        className="bg-light h-[45px] placeholder:text-[#888888] rounded-[5px] px-[15px] shadow-none border-transparent"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter your name"/>
                </div>
                <div className="mb-[15px]">
                    <label 
                        htmlFor="email" 
                        className="block mb-3">Email:</label>
                    <Input
                        className="bg-light h-[45px] placeholder:text-[#888888] rounded-[5px] px-[15px] shadow-none border-transparent"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"/>
                </div>
                <div className="mb-[15px]">
                    <label 
                        htmlFor="password" 
                        className="block mb-3">Password:</label>
                    <Input
                        className="bg-light h-[45px] placeholder:text-[#888888] rounded-[5px] px-[15px] shadow-none border-transparent"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"/>
                </div>
                <div className="mb-[15px]">
                    <label 
                        htmlFor="avatar" 
                        className="block mb-3">Avatar:</label>
                    <Input
                        className="leading-[35px] bg-light h-[45px] placeholder:text-[#888888] rounded-[5px] px-[15px] shadow-none border-transparent"
                        type="file"
                        name="avatar"
                        accept="image/png, image/gif, image/jpeg"
                        id="avatar"/>
                </div>
                <Button 
                    type="submit" 
                    className="bg-dark text-white font-bold text-[16px] leading-none h-auto py-[14.5px] px-[29.5px] mt-[40px]">Submit</Button>
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