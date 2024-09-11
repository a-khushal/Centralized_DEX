
export interface TokenDetails {
    name: string;
    mint: string;
    native: boolean;
    image: string;
    price?: number
}

export  const SUPPORTED_TOKEN: TokenDetails[] = 
[{
    name: "SOL",
    mint: "", 
    native: true, 
    image: "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
},
{
    name: "USDC", 
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    native: false,
    image: "https://seeklogo.com/images/U/usd-coin-usdc-logo-CB4C5B1C51-seeklogo.com.png"
}, {
    name: "USDT", 
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    native: false,
    image: "https://img.cryptorank.io/coins/ton_bridged_usdt1701691219482.png",
}]