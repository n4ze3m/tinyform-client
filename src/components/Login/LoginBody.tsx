import React from "react";
import Layout from "../Common/Layout";
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
} from '@mantine/core';
import { useNavigate } from "react-router-dom";


export default function LoginBody() {
    let navigate = useNavigate()
    return <Layout>

        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Welcome back!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor<'a'> href="#" size="sm" onClick={(event) => {
                    event.preventDefault()
                    navigate('/register')
                }}>
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="you@email.com" required />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <Button color="teal" fullWidth mt="xl">
                    Sign in
                </Button>
            </Paper>
        </Container>
    </Layout>;
}