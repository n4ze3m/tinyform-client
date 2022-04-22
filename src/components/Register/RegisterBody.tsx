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
export default function RegisterBody() {
    let navigate = useNavigate()
    return <Layout>

        <Container size={420} my={40}>
            <Title
                align="center"
                sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
            >
                Hello there!
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Already have an account?{' '}
                <Anchor<'a'> href="#" size="sm" onClick={(event) => {
                    event.preventDefault()
                    navigate('/login')
                }}>
                    Sign in
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Name" placeholder="Jane Doe" required />
                <TextInput label="Email" placeholder="jane.doe@email.com" required mt="md" />
                <PasswordInput label="Password" placeholder="Your password" required mt="md" />
                <Button color="teal" fullWidth mt="xl">
                    Sign up
                </Button>
            </Paper>
        </Container>
    </Layout>;
}