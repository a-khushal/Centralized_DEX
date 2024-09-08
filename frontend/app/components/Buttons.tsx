
export function PrimaryButton({ children, onClick }: {
    children: React.ReactNode,
    onClick: () => void
}) {
    return <button onClick={onClick} type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2">
        {children}
    </button>
}

export function BlueButton({ children, onClick }: {
    children: React.ReactNode,
    onClick: () => void
}) {
    return (
        <button type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-semibold rounded-lg text-md px-16 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
            { children }
        </button>
    )
}

export function LightBlueButton({ children, onClick }: {
    children: React.ReactNode,
    onClick: () => void
}) {
    return (
        <button type="button" className="py-2.5 px-16 me-2 mb-2 text-md font-semibold text-blue-700 focus:outline-none bg-blue-100 rounded-lg border border-gray-200 hover:bg-blue-200 focus:z-10 focus:ring-4 focus:ring-gray-100">
            {children}
        </button>
    )
}

export function LightButton({ children, onClick }: { 
    children: React.ReactNode,
    onClick: () => void
 }) {
    return <button type="button" className="text-gray-600 bg-gray-200 border border-gray-300 hover:bg-gray-300 rounded-full text-sm px-4 py-2.5" onClick={onClick}>
        { children }
    </button>

}