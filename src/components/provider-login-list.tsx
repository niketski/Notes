import { Button } from "./ui/button";
import * as actions from '@/actions'
import { Facebook, Mail } from "lucide-react";

export default function ProviderLoginList() {
    return (
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
    );
}