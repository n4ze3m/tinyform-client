import {
    TextInput,
    PasswordInput,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { login } from '../../services/auth';
import { setTokens } from '../../services/token';


export default function LoginBody() {
    let navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => {
                if (value.length === 0) {
                    return 'Email is required';
                }
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return 'Invalid email address';
                }
            },
            password: (value) => {
                if (value.length === 0) {
                    return 'Password is required';
                }
            }
        }
    })


    const onSubmit = async (values: any) => {
        try {
            setIsLoading(true)
            const response = await login(values.email, values.password);
            const token = response.data.tokens
            setTokens(token.access_token, token.refresh_token)
            setIsLoading(false)
            navigate('/dashboard')
            showNotification({
                title: 'Welcome',
                message: 'Login successful',
            })
        } catch (e: any) {
            setIsLoading(false)
            const message = e?.response?.data?.error || 'Something went wrong';
            console.log(e)
            showNotification({
                title: 'Oh no!',
                message,
                color: 'red',
                autoClose: 5000,
            })
        }
    }

    return <>

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
                <form onSubmit={form.onSubmit(async (values) => {
                    await onSubmit(values)
                    console.log("done")
                })}
                >
                    <TextInput label="Email" placeholder="you@email.com" required {...form.getInputProps('email')} />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps('password')} />
                    <Button color="teal" fullWidth mt="xl" type="submit"
                        loading={isLoading}
                    >
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    </>;
}