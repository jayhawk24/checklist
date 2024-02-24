"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from 'react'

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
        }
    }
})

function Providers({ children }: { children: React.ReactNode }) {
    return (

        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
}

export default Providers