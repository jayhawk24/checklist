import React from 'react'

type Props = {
    children?: React.ReactNode;
}

const LayoutPage = ({ children }: Props) => {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {children}
        </main>
    )
}

export default LayoutPage