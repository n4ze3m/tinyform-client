import { Table, Text, TextInput } from "@mantine/core";
import Empty from "../../Common/Empty";

interface DProps {
    header: string[];
    data: any[];
}


export default function DetailTable(props: DProps) {
    if(props.data.length === 0) {
        return <Empty
        text="Oh! No submissions yet!"
        />
    }
    return (
        <Table verticalSpacing="xs">
            <thead>
                <tr>
                    <th>#</th>
                    {
                        props.header.map((h, i) => (
                            <th key={i}>{h}</th>
                        ))
                    }
                    <th>created at</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.map((d, i) => (
                        <tr key={i}>
                            <Td data={i + 1} />
                            {
                                props.header.map((h, i) => (
                                    <Td key={i} data={d[h]} />
                                ))
                            }
                            <Td data={d['created_at']} />
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}


function Td(props: { data: any }) {


    const isUrl = (url: string) => {
        const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
        return regex.test(url);
    }

    if (isUrl(props.data)) {
        return (
            <td>
                <Text<'a'> component="a" href={props.data} target="_blank" rel="noopener noreferrer" color="blue">
                    <TextInput value={props.data} readOnly />
                </Text>
            </td>
        )
    } else {
        return <td>
          {props.data}
        </td>
    }

}