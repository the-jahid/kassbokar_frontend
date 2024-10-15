'use client'

import { useSession } from "@clerk/nextjs"


export const getSession = () => {
    const { isLoaded, session } = useSession()

    return session?.id
}
