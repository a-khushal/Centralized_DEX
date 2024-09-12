"use client"
import { useRouter } from "next/navigation";
import { PrimaryButton } from "./components/Buttons";
import { signIn, useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="font-bold text-5xl mt-40">
        A TipLink like application
        <div className="flex justify-center items-center w-full mt-10">
          <PrimaryButton onClick={() => {
            session.data?.user ? router.push("/dashboard") : signIn()
          }}>
            Go to Dashboard
          </PrimaryButton>
        </div>  
      </div>
    </main>
  );
}