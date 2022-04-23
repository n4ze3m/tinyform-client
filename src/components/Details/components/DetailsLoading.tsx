import { Button, Group, Paper, ScrollArea, Skeleton, Table } from "@mantine/core";

export default function DetailsLoading() {
    return (
        <>
            <Group position="right">
                <Skeleton width={120} height={25} />
            </Group>
            <Paper withBorder shadow="md" p={10} mt={30} radius="sm">

                <ScrollArea>
                    <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
                        <thead>
                            <tr>
                                {
                                    Array(5).fill(0).map((_, i) => (
                                        <th key={i}>
                                            <Skeleton>
                                                Lorem Ipsum
                                            </Skeleton>
                                        </th>
                                    ))
                                }

                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array(10).fill(0).map((_, i) =>
                                (<tr key={i}>
                                    {Array(5).fill(0).map((_, j) => (
                                        <td key={j}>
                                            <Skeleton>
                                                Lorem Ipsum
                                            </Skeleton>
                                        </td>
                                    ))}
                                </tr>)
                                )
                            }
                        </tbody>
                    </Table>
                </ScrollArea>
            </Paper>
        </>
    )
}