import { useState, useEffect } from "react";
import {
  Button,
  Text,
  Collapse,
  Group,
  ActionIcon,
  Paper,
  ScrollArea,
} from "@mantine/core";
import { Code, Trash } from "tabler-icons-react";
import { Prism } from "@mantine/prism";
import DetailsLoading from "./components/DetailsLoading";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFormSnippet, getUsersSubmissions } from "../../services/get";
import DetailTable from "./components/DetailTable";

export default function DetailsBody() {
  const [opened, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState("");
  const [header, setHeader] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  let navigator = useNavigate();
  let params = useParams();

  const fetchData = async () => {
    try {
      const htmlResponse = await getUserFormSnippet(params.id!);
      const tableResponse = await getUsersSubmissions(params.id!);
      console.log(tableResponse.data);
      setHtml(htmlResponse.data);
      setName(tableResponse.data.name);
      if (tableResponse.data?.header != null) {
        setHeader(tableResponse.data.header);
      }

      if (tableResponse.data?.rows != null) {
        setData(tableResponse.data.rows);
      }
      setLoading(false);
    } catch (e) {
      navigator("/dashboard/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && <DetailsLoading />}
      {!loading && (
        <>
          <Group position="apart">
            <Text size="lg" weight={700}>
              {` 📝 ${name}`}
            </Text>
            <Group>
              <ActionIcon
                size="sm"
                color="teal"
                onClick={() => setOpen((o) => !o)}
              >
                <Code />
              </ActionIcon>
              <ActionIcon color="red" size="sm">
                <Trash />
              </ActionIcon>
            </Group>
          </Group>
          <Collapse in={opened}>
            <Prism my="md" mb="md" language="markdown">
              {html}
            </Prism>
          </Collapse>
          <Paper withBorder shadow="md" p={10} mt={30} radius="sm">
            <ScrollArea>
              <DetailTable data={data} header={header} />
            </ScrollArea>
            {/* <Pagination total={2} color="teal" size="sm" mt="md" mb="md" /> */}
          </Paper>
        </>
      )}
    </>
  );
}
