import { Card, Text, Group, Badge, createStyles } from "@mantine/core";
import { Form } from "../../../interface/home.interface";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    card: {
        transition: 'transform 150ms ease, box-shadow 100ms ease',
        cursor: 'pointer',

        '&:hover': {
            boxShadow: theme.shadows.md,
            transform: 'scale(1.02)',
        },

        '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 6,
        },
    }
}))

export default function DashCard(form: Form) {
    const { classes } = useStyles();
    const navigate = useNavigate()

    return (
        <Card shadow="sm" p="lg" className={classes.card}
            onClick={() => navigate(`/dashboard/form/details/${form.slug}`)}
        >
            <Text weight={500}>
                {form.name}
            </Text>
            <Group position="apart" style={{
                marginTop: '1rem'
            }}>
                <Text size="sm">
                    {moment(form.created_at).fromNow()}
                </Text>
                {/* <Badge>
                    Active
                </Badge> */}
            </Group>
        </Card>
    )
}