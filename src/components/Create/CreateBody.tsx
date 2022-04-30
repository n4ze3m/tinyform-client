import {
  Container,
  Divider,
  Group,
  Paper,
  TextInput,
  Title,
  Select,
  ActionIcon,
  Button,
} from "@mantine/core";
import { X } from "tabler-icons-react";
import { useForm, formList } from "@mantine/form";
import { useState } from "react";
import { createForm } from "../../services/post";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
export default function CreateBody() {
  const form = useForm({
    initialValues: {
      name: "",
      url: "",
      fields: formList([
        {
          name: "email",
          type: "email",
        },
      ]),
    },
    validate: {
      name: (value) => {
        if (value.trim().length === 0) {
          return "Name is required";
        }
      },
      url: (value) => {
        if (value.trim().length === 0) {
          return
        } else if (!/^(http|https):\/\/[^ "]+$/.test(value)) {
          return "Url is invalid";
        }
      },
      fields: {
        name: (value) => {
          if (value.trim().length === 0) {
            return "Name is required";
          }
          const field = form.values.fields.filter(
            (field) => field.name === value
          );
          if (field.length > 1) {
            return "Field name must be unique";
          }

          if (value.toLowerCase() === "created_at") {
            return 'Field name cannot be "created_at"';
          }

          if (value.toLowerCase() === "_id") {
            return 'Field name cannot be "_id"';
          }
        },
        type: (value) => {
          if (value.length === 0) {
            return "Type is required";
          }
        },
      },
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      const response = await createForm(data);
      form.reset();
      setIsSubmitting(false);
      showNotification({
        title: "Yay!",
        message: "Form created successfully",
      });
      const slug = response.data?.slug;
      navigate(`/dashboard/form/details/${slug}`);
    } catch (e: any) {
      const message =
        e?.response?.data?.error || e?.message || "Something went wrong";
      showNotification({
        title: "Oh no!",
        message,
        color: "red",
        autoClose: 5000,
      });
      setIsSubmitting(false);
    }
  };

  const fields = form.values.fields.map((_, index) => (
    <Group key={index} mb="sm">
      <TextInput
        placeholder="Field name"
        sx={{ flex: 1 }}
        {...form.getListInputProps("fields", index, "name")}
      />

      <Select
        placeholder="Pick input type"
        sx={{ flex: 1 }}
        {...form.getListInputProps("fields", index, "type")}
        data={[
          { value: "text", label: "text" },
          { value: "email", label: "email" },
          { value: "file", label: "file" },
          { value: "checkbox", label: "checkbox" },
          { value: "color", label: "color" },
          { value: "date", label: "date" },
          { value: "datetime-local", label: "datetime-local" },
          { value: "month", label: "month" },
          { value: "number", label: "number" },
          { value: "radio", label: "radio" },
          { value: "range", label: "range" },
          { value: "tel", label: "tel" },
          { value: "time", label: "time" },
          { value: "url", label: "url" },
          { value: "week", label: "week" },
          { value: "message", label: "message" },
        ]}
      />
      <ActionIcon
        color="teal"
        variant="hover"
        onClick={() => form.removeListItem("fields", index)}
      >
        <X size={16} />
      </ActionIcon>
    </Group>
  ));
  return (
    <>
      <Paper shadow="xs" p="md">
        <Title align="center" sx={(theme) => ({ fontWeight: 900 })}>
          Create a new form
        </Title>
        <Container my="lg">
          <form
            onSubmit={form.onSubmit(async (values) => await onSubmit(values))}
          >
            <TextInput
              {...form.getInputProps("name")}
              placeholder="Name"
              mb="sm"
            />
            <TextInput
              {...form.getInputProps("url")}
              placeholder="Url"
              mb="md"
            />
            <Divider my="xs" label="Form Fields" mb="md" />

            {fields}

            <Button
              color="teal"
              size="sm"
              my="md"
              onClick={() =>
                form.addListItem("fields", {
                  name: "name",
                  type: "text",
                })
              }
            >
              Add field
            </Button>

            <Divider my="lg" />

            <Button
              fullWidth
              type="submit"
              color="teal"
              disabled={form.values.fields.length === 0}
              loading={isSubmitting}
            >
              Create form
            </Button>
          </form>
        </Container>
      </Paper>
    </>
  );
}
