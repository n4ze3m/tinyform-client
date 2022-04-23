import { Card, Text, Group, Badge, createStyles } from "@mantine/core";

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

export default function DashCard() {
    const { classes } = useStyles();

    return (
        <Card shadow="sm" p="lg" className={classes.card}>
            <Text weight={500}>
                Lorem ipsum dolor sit amet
            </Text>
            <Group position="apart" style={{
                marginTop: '1rem'
            }}>
                <Text>
                    12/12/2020
                </Text>
                <Badge>
                    Active
                </Badge>
            </Group>
        </Card>
    )
}