import { Badge, Card, Skeleton, Text, Group } from "@mantine/core";

export default function DashLoading() {
    return (
        <>
            <DashSkelton />
            <DashSkelton />
            <DashSkelton />
            <DashSkelton />
            <DashSkelton />
            <DashSkelton />
            <DashSkelton />
            <DashSkelton />
            <DashSkelton />
        </>
    )
}


function DashSkelton() {
    return (
        <Skeleton >
            <Card shadow="sm" p="lg" >
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
        </Skeleton>
    )
}