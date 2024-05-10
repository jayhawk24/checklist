import React from 'react'

type Props = {
    children?: React.ReactNode;
}

const LayoutPage = ({ children }: Props) => {
    return (
        <main className="flex min-h-screen flex-col items-center md:p-24 p-5">
            {children}
        </main>
    )
}

export default LayoutPage