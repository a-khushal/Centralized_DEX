import { Connection } from "@solana/web3.js";
import axios from "axios"

let LAST_UPDATED: number | null = null;
let prices: {[key: string]: {
    price: string
}} = {}
const TOKEN_PRICE_REFRESH_INTERVAL = 60 * 1000;

export interface TokenDetails {
    name: string;
    mint: string;
    native: boolean;
    image: string;
    price?: number
}

export  const SUPPORTED_TOKEN: TokenDetails[] = [{
    name: "USDC", 
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    image: "https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png"
}, {
    name: "USDT", 
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    image: "https://img.cryptorank.io/coins/ton_bridged_usdt1701691219482.png",
}, {
    name: "SOL",
    mint: "", 
    native: true, 
    image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
}]


export const CONNECTION = new Connection("https://solana-mainnet.g.alchemy.com/v2/EspGgEsKtp6xdG1-P32lj9raEFUlgXNc");

export async function getSupportedTokens() {
    if(!LAST_UPDATED || new Date().getTime() - LAST_UPDATED < TOKEN_PRICE_REFRESH_INTERVAL) {
        try {
            const response = await axios.get("https://price.jup.ag/v6/price?ids=SOL,USDC,USDT");
            prices = response.data.data;
            LAST_UPDATED = new Date().getTime();
        } catch(e) {
            console.log(e);
        }
    } 
    return SUPPORTED_TOKEN.map(s => ({
        ...s, 
        price: prices[s.name].price
    }))
}