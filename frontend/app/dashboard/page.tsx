import ProfileCard from "../components/ProfileCard";
import db from "@/app/db"
import { getServerSession } from "next-auth";
import { AuthOptions } from "../lib/AuthOptions";

async function getUserWallet() {
    const session = await getServerSession(AuthOptions);
    console.log(session?.user.uid);
    const userWallet = await db.solWallet.findFirst({
        where: {
            userId: session?.user?.uid
        }, 
        select: {
            publicKey: true
        }
    })

    if(!userWallet) {
        return {
            error: "No wallet found associated to the user"
        }
    }

    return { error: null, userWallet };
}

export default async function Dashboard() {
    const userWallet = await getUserWallet();

    if(userWallet.error || !userWallet.userWallet?.publicKey) {
        return <div>No solana wallet found</div>
    }

    return <div>
        <ProfileCard publicKey={userWallet.userWallet.publicKey}/>
    </div>
}