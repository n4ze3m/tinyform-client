import { Table, Text, Badge, ColorSwatch } from "@mantine/core";
import Empty from "../../Common/Empty";
import moment from "moment"

interface DProps {
    header: string[];
    data: any[];
}


export default function DetailTable(props: DProps) {
    if (props.data.length === 0) {
        return <Empty
            text="Oh! No submissions yet!"
        />
    }
    return (
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
            <thead>
                <tr>
                    <th>#</th>
                    {
                        props.header.map((h, i) => (
                            <th key={i}>{h}</th>
                        ))
                    }
                    <th>date</th>
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
                            <td>
                                {
                                    moment(d['created_at']).format("DD MMM YYYY hh:mm a")
                                }
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table>
    )
}







function Td(props: { data: any, isDate?: boolean }) {


    const isUrl = (url: string) => {
        const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
        return regex.test(url);
    }


    const isEmail = (email: string) => {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }


    const fileName = (url: string) => {
        try {
            var fname = new URL(url).pathname.split('/').pop();
            return "📁 " + fname
        } catch (e) {
            console.log(e)
            return "📁"
        }
    }

    const isColor = (color: string) => {
        const regex = /^#[0-9A-F]{6}$/i;
        return regex.test(color);
    }



    if (isUrl(props.data)) {
        return (
            <td>
                <Badge<'a'> component="a" href={props.data} target="_blank" rel="noopener noreferrer" color="yellow" radius="sm" >
                    {fileName(props.data)}
                </Badge >
            </td>
        )
    }  else if (isEmail(props.data)) {
        return (
            <td>
                <Text component="a" href={`mailto:${props.data}`} color="blue" >
                    {props.data}
                </Text>
            </td>
        )
    } else if (isColor(props.data)) {
        return (
            <td>
                <ColorSwatch
                color={props.data}
                />
            </td>
        )
    }
    
    else {
        return <td>
            {props.data}
        </td>
    }

}