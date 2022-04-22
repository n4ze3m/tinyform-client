import { Container } from "@mantine/core"
import React from "react"
import { HeaderMenu } from "./Header"

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {

    
    return <div>
        <HeaderMenu/>
        <Container>

        {children}
        </Container>
        </div>
}