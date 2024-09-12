"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { BlueButton, LightButton } from "../components/Buttons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Image from 'next/image'
import { TokenWithBalance, useTokens } from "../api/hooks/useTokens";
import Swap from "./Swap";

export type Tabs = "tokens" | "send" | "addfunds" | "withdraw" | 'swap';

export default function ProfileCard({ publicKey }: {
    publicKey: string
}) {
    const session = useSession();
    const router = useRouter();
    const { loading, tokenBalances } = useTokens(publicKey);
    const [tab, setTab] = useState<Tabs>("tokens");

    if(session.status === 'loading' || loading) {
        return <div className="pt-10 flex justify-center items-center h-50%">
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }

    if(!session.data?.user) {
        router.push("/");
        return null;
    }

    return <div className="pt-10 flex justify-center">
        <div className="">
            <div className="max-w-4xl shadow-lg rounded-2xl bg-white w-full p-12">
                <Greeting image={session.data?.user?.image ?? ""} name={session.data?.user?.name ?? ""}/>
                <Balance publicKey={publicKey} totalBalance={tokenBalances?.totalBalance ?? 0} tab={tab} setTab={setTab}/>
            </div>
            <div className="max-w-4xl p-4 bg-gray-100 rounded-2xl mt-4 flex justify-center">
                { 
                    tab == "tokens" ? 
                    <Tokens loading={loading} tokenBalances={tokenBalances}/> : 
                    ((tab == "send" || tab == "addfunds" || tab == "withdraw") ?  
                    <div>We dont yet support this feature</div> : <Swap/>)
                }
            </div>
        </div>
    </div> 
}

function Greeting({ image, name }: {image: string, name: string}) {
    return <div className="flex">
        <Image src={image} alt="img" className="rounded-full" width={72} height={72} />
        <div className="text-2xl font-bold flex justify-center items-center pl-5">
            Welcome back, {name}!
        </div>
    </div>
}

function Balance({ publicKey, totalBalance, tab, setTab }: { publicKey: string, totalBalance: number, tab: Tabs, setTab: Dispatch<SetStateAction<Tabs>> }) {
    const [activeTab, setActiveTab] = useState<Tabs>("tokens");
    const [copied, setCopied] = useState(false);
    const tabButtons: { id: Tabs, name: string }[] = [
        { id: "tokens", name: "Tokens" },
        { id: "send", name: "Send" },
        { id: "addfunds", name: "Add Funds" },
        { id: "withdraw", name: "Withdraw" },
        { id: "swap", name: "Swap" }
    ];

    useEffect(() => {
        if(copied) {
            let timeout = setTimeout(() => {
                setCopied(false);
            }, 3000);
            return () => {
                clearTimeout(timeout);
            }
        }
    }, [copied])

    return <div>
        <div className="text-sm text-slate-400 flex pt-5 justify-start items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3" />
            </svg>
            <div className="pl-2">CDEX Account Assets</div>
        </div>
        <div className="mt-5">
            <div className="flex justify-between items-center">
                <div className="text-5xl font-bold">${totalBalance === 0 ? "0.00" : totalBalance?.toFixed(2).toString()}<span className="text-4xl font-bold text-gray-500 ml-2">USD</span></div>
                <LightButton onClick={() => {
                    navigator.clipboard.writeText(publicKey);
                    setCopied(true);
                }}>
                    <div className="flex justify-center items-center">
                        <div className="pr-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Zm3.75 11.625a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                        </div>
                        {copied ? <span>Copied</span> : <span>Your Wallet Address</span>}
                    </div>
                </LightButton>
            </div>
            <div className="flex pt-6">
                {tabButtons.map((tab, index) => (
                    <BlueButton key={index} 
                        onClick={() => 
                        { setActiveTab(tab.id); setTab(tab.id)} } 
                        activeTab={activeTab} tab={tab.id}
                    >
                        {tab.name}
                    </BlueButton>
                ))}
            </div>
        </div>
    </div>
}

function Tokens({ loading, tokenBalances}: {
    tokenBalances: {
        totalBalance: number,
        tokens: TokenWithBalance[]
    } | null,
    loading: boolean,
}) {
    return <div className="w-full p-3">
        <div className="">
            <div className="ml-4">
                <div className="text-lg font-semibold hover:cursor-pointer mb-2">Tokens</div>
                <hr />
            </div>
            <div className="mt-2">
                {
                    loading ? "loading..."
                    : 
                    <div>
                        {
                            tokenBalances ? tokenBalances.tokens.map(token => (
                                <div key={token.name}>
                                    <div className="flex justify-between w-full">
                                        <div className="flex">
                                            <Image src={token.image} className="rounded-full m-3" height={50} width={50} alt={token.name}/>
                                            <div className="mt-3">
                                                <div>{token.name}</div>
                                                <div>1 {token.name} = ~${token.price}</div>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <div className="font-semibold flex justify-end">
                                                {token.balance == "0" ? "0.00" : token.balance.toString().slice(0, 7)}
                                            </div>
                                            <div className="flex justify-end">
                                                {token.usdBalance == '0' ? "0.00" : token.usdBalance.toString().slice(0, 7)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) 
                            : 
                            "null"
                        }
                    </div> 
                }
            </div>
        </div>
    </div>
}