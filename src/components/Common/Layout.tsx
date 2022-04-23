import { Container } from "@mantine/core"
import { Outlet } from "react-router-dom"
import { HeaderMenu } from "./Header"



export default function Layout() {


    return (
        <div>
            <HeaderMenu />
            <Container>
                <Outlet />
            </Container>
        </div>
    )
}