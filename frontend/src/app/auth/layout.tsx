import React from 'react'

type Props = {
    children?: React.ReactNode;
}

const LayoutPage = ({ children }: Props) => {
    return (
        <main className="flex h-full flex-col md:mt-0 mt-6 md:p-24 p-5">
            <div className="border border-secondary p-6 md:p-16 rounded-xl md:w-2/3">
                {children}
            </div>
        </main>
    )
}

export default LayoutPage