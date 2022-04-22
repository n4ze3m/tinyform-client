import { Card, Text, Group, Badge } from "@mantine/core";

export default function DashCard() {
    return (
        <Card shadow="sm" p="lg">
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