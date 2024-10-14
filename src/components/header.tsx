import { auth } from "@/lib/auth";

export default async function Header() {
    const session = await auth();

    console.log('header:', session);

    return (
        <header>
            This is the header
        </header>
    );
}