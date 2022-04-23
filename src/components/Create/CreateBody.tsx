import { Container, Divider, Group, Paper, Text, TextInput, Title, Select, ActionIcon, Button } from "@mantine/core";
import Layout from "../Common/Layout";
import { X } from 'tabler-icons-react';
import { useForm, formList } from "@mantine/form";
export default function CreateBody() {
    const form = useForm({
        initialValues: {
            name: '',
            url: '',
            fields: formList([
                {
                    name: 'email',
                    type: 'email'
                }
            ])
        },
        validate: {
            name: (value) => {
                if (value.trim().length === 0) {
                    return 'Name is required';
                }
            },
            url: (value) => {
                if (value.trim().length === 0) {
                    return 'Url is required';
                } else if (!/^(http|https):\/\/[^ "]+$/.test(value)) {
                    return 'Url is invalid';
                }
            },
            fields: {
                name: (value) => {
                    if (value.trim().length === 0) {
                        return 'Name is required';
                    }
                    const field = form.values.fields.filter((field) => field.name === value);
                    if (field.length > 1) {
                        return 'Field name must be unique';
                    }
                },
                type: (value) => {
                    if (value.length === 0) {
                        return 'Type is required';
                    }
                }
            }
        }
    });


    const fields = form.values.fields.map((_, index) => (
        <Group key={index} mb="sm">
            <TextInput
                placeholder="Field name"
                sx={{ flex: 1 }}
                {...form.getListInputProps('fields', index, 'name')}
            />

            <Select
                placeholder="Pick input type"
                sx={{ flex: 1 }}
                {...form.getListInputProps('fields', index, 'type')}
                data={[
                    { value: 'button', label: 'button' },
                    { value: 'checkbox', label: 'checkbox' },
                    { value: 'color', label: 'color' },
                    { value: 'date', label: 'date' },
                    { value: 'datetime-local', label: 'datetime-local' },
                    { value: 'email', label: 'email' },
                    { value: 'file', label: 'file' },
                    { value: 'hidden', label: 'hidden' },
                    { value: 'image', label: 'image' },
                    { value: 'month', label: 'month' },
                    { value: 'number', label: 'number' },
                    { value: 'password', label: 'password' },
                    { value: 'radio', label: 'radio' },
                    { value: 'range', label: 'range' },
                    { value: 'reset', label: 'reset' },
                    { value: 'search', label: 'search' },
                    { value: 'submit', label: 'submit' },
                    { value: 'tel', label: 'tel' },
                    { value: 'text', label: 'text' },
                    { value: 'time', label: 'time' },
                    { value: 'url', label: 'url' },
                    { value: 'week', label: 'week' },
                ]}
            />
            <ActionIcon
                color="teal"
                variant="hover"
                onClick={() => form.removeListItem('fields', index)}
            >
                <X size={16} />
            </ActionIcon>
        </Group>
    ))
    return (
        <Layout>
            <Paper shadow="xs" p="md">
                <Title
                    align="center"
                    sx={(theme) => ({ fontWeight: 900 })}
                >
                    Create a new form
                </Title>
                <Container my="lg">
                    <form onSubmit={form.onSubmit((values) => console.log("sadsa", values))}>
                        <TextInput      {...form.getInputProps('name')} placeholder="Name" mb="sm" />
                        <TextInput      {...form.getInputProps('url')} placeholder="Url" mb="md" />
                        <Divider my="xs" label="Form Fields" mb="md" />

                        {fields}

                        <Button
                            color="teal"
                            size="sm"
                            my="md"
                            onClick={() => form.addListItem('fields', {
                                name: 'name',
                                type: 'text'
                            })}
                        >
                            Add field
                        </Button>


                        <Divider my="lg" />

                        <Button
                            fullWidth
                            type="submit"
                            color="teal"
                        >

                            Create form

                        </Button>
                    </form>
                </Container>
            </Paper>
        </Layout>
    )
}