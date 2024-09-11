"use client"
import { useState } from "react"
import { SUPPORTED_TOKEN, TokenDetails } from "../lib/Tokens";

export default function Swap() {
    const [baseAsset, setBaseAsset] = useState(SUPPORTED_TOKEN[0]);
    const [quoteAsset, setQuoteAsset] = useState(SUPPORTED_TOKEN[1]);
    return <div>
        <SwapInputRow onSelect={(asset) => {
            setBaseAsset(asset)
        }} selectedToken={baseAsset}/>
        <SwapInputRow onSelect={(asset) => {
            setBaseAsset(asset)
        }} selectedToken={quoteAsset}/>
    </div>
}

function SwapInputRow({onSelect, selectedToken}: {
    onSelect: (asset: TokenDetails) => void,
    selectedToken: TokenDetails
}) {
    return <div className="border">
        <AssetSelector selectedToken={selectedToken}/>
    </div>
}

function AssetSelector({selectedToken}: {
    selectedToken: TokenDetails,

}) {
    return <div>
        <form className="max-w-sm mx-auto">
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option selected><img src={selectedToken.image} className="w-10"></img>{selectedToken.name}</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
            </select>
        </form>
    </div>
}