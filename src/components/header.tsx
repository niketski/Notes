'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Header() {
    const { data, status } = useSession();

    useEffect(() => {

        console.log(data, status);

    }, [data?.user, status]);
    

    return (
        <header>
            This is the header
        </header>
    );
}