"use client";
import { signIn, signOut, useSession } from "next-auth/react"
import PrimaryButton from "./PrimaryButton";

export default function Appbar() {
    const session = useSession();
    
    return <div className="bg-slate-200 w-screen px-10 flex justify-between py-2 items-center">
        <div className="text-xl font-semibold flex justify-center items-center">
            DCEX
        </div>
        <div>
            {session.data?.user ? <PrimaryButton onClick={() => signOut()}>Logout</PrimaryButton> : <PrimaryButton onClick={() => signIn()}>Signin</PrimaryButton>}
        </div>
    </div>
}