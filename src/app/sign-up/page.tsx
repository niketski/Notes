import SignUpForm from "@/components/sign-up-form";
import { signOut } from "next-auth/react";

export default function SignUpPage() {
    console.log(signOut);
    return (
        <main className="min-h-[100vh]">
            <section className="py-[60px]">
                <div className="mx-auto max-w-[1170px] px-[15px]">
                    <h1 className="font-balthazar text-[60px] text-dark mb-[100px]">notes</h1>
                    <div className="mx-auto max-w-[535px]">
                        <SignUpForm/>
                    </div>
                </div>
            </section>
        </main>
    );

}