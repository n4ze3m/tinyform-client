import { useState, useEffect } from "react";
import {
  Text,
  Collapse,
  Group,
  ActionIcon,
  Paper,
  ScrollArea,
  Tabs,
} from "@mantine/core";
import { Code, Trash } from "tabler-icons-react";
import { Prism } from "@mantine/prism";
import DetailsLoading from "./components/DetailsLoading";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFormSnippet, getUsersSubmissions } from "../../services/get";
import DetailTable from "./components/DetailTable";
import { showNotification } from "@mantine/notifications";
import { deleteUserForm, deleteUserSubmission } from "../../services/delete";
import { Photo, CircleOff,ClipboardList, Settings } from "tabler-icons-react";
const { Tab } = Tabs;


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

  const deleteSubs = async (id: string) => {
    try {
      await deleteUserSubmission(params.id!, id);
      showNotification({
        title: "Success",
        message: "Submission deleted",
      });
      await fetchData();
    } catch (e: any) {
      const message = e?.response?.data?.error || "Something went wrong";
      showNotification({
        title: "Oh no!",
        message,
        color: "red",
        autoClose: 5000,
      });
    }
  };

  const formDelete = async () => {
    try {
      await deleteUserForm(params.id!);
      showNotification({
        title: "Form deleted",
        message: "Form deleted successfully",
      });
      navigator("/dashboard/");
    } catch (e: any) {
      const message = e?.response?.data?.error || "Something went wrong";
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
      {loading && <DetailsLoading />}
      {!loading && (
        <>
          <Group position="apart">
            <Text size="lg" weight={700}>
              {` ???? ${name}`}
            </Text>
            <Group>
              <ActionIcon
                size="sm"
                color="teal"
                onClick={() => setOpen((o) => !o)}
              >
                <Code />
              </ActionIcon>
              <ActionIcon onClick={formDelete} color="red" size="sm">
                <Trash />
              </ActionIcon>
            </Group>
          </Group>
          <Collapse in={opened}>
            <Prism my="md" mb="md" language="markdown">
              {html}
            </Prism>
          </Collapse>
          <ScrollArea>
            <Tabs variant="outline" grow sx={{ minWidth: 800 }}>
              <Tab label="Submissions" mt={30} icon={<ClipboardList size={14} />}>
                <Paper withBorder shadow="md" p={10} mt={20} radius="sm">
                  {/* <ScrollArea> */}
                  <DetailTable
                    onDelete={deleteSubs}
                    data={data}
                    header={header}
                  />
                  {/* </ScrollArea> */}
                </Paper>
              </Tab>
              <Tab label="Spam" mt={30} icon={<CircleOff size={14} />}>
              <Paper withBorder shadow="md" p={10} mt={20} radius="sm">
                  {/* <ScrollArea> */}
                  <DetailTable
                    onDelete={deleteSubs}
                    data={data}
                    header={header}
                  />
                  {/* </ScrollArea> */}
                </Paper>
              </Tab>
              <Tab label="Trash" mt={30} icon={<Trash size={14} />}>
              <Paper withBorder shadow="md" p={10} mt={20} radius="sm">
                  {/* <ScrollArea> */}
                  <DetailTable
                    onDelete={deleteSubs}
                    data={data}
                    header={header}
                  />
                  {/* </ScrollArea> */}
                </Paper>
              </Tab>
              <Tab label="Settings" mt={30} icon={<Settings size={14} />}></Tab>
            </Tabs>
          </ScrollArea>
        </>
      )}
    </>
  );
}
