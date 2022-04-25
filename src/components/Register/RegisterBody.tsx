import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import { setTokens } from "../../services/token";
export default function RegisterBody() {
  let navigate = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate: {
      email: (value) => {
        if (value.length === 0) {
          return "Email is required";
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          return "Invalid email address";
        }
      },
      password: (value) => {
        if (value.length === 0) {
          return "Password is required";
        }
        if (value.length < 8) {
          return "Password must be at least 8 characters";
        }
      },
      name: (value) => {
        if (value.length === 0) {
          return "Name is required";
        }
      },
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (value: any) => {
    try {
      setIsLoading(true);
      const response = await register(value.name, value.email, value.password);
      const token = response.data.tokens;
      setTokens(token.access_token, token.refresh_token);
      setIsLoading(false);
      navigate("/dashboard");
      showNotification({
        title: "Welcome",
        message: "Registration successful",
      });
    } catch (e: any) {
      const message =
        e?.response?.data?.error || e?.message || "Something went wrong";
      showNotification({
        title: "Oh no!",
        message,
        color: "red",
        autoClose: 5000,
      });
    }
  };

  return (
    <>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Hello there!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{" "}
          <Anchor<"a">
            href="#"
            size="sm"
            onClick={(event) => {
              event.preventDefault();
              navigate("/login");
            }}
          >
            Sign in
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form
            onSubmit={form.onSubmit(async (values) => {
              await onSubmit(values);
            })}
          >
            <TextInput
              label="Name"
              placeholder="Jane Doe"
              {...form.getInputProps("name")}
              required
            />
            <TextInput
              label="Email"
              {...form.getInputProps("email")}
              placeholder="jane.doe@email.com"
              required
              mt="md"
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("password")}
            />
            <Button loading={isLoading} color="teal" type="submit"  fullWidth mt="xl">
              Sign up
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
