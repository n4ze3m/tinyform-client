import { useState, useEffect } from 'react';
import { Button, Collapse, Group, Pagination, Paper, ScrollArea, Table } from '@mantine/core';
import { Code } from "tabler-icons-react";
import { Prism } from '@mantine/prism';
import DetailsLoading from "./components/DetailsLoading";
import { useNavigate, useParams } from "react-router-dom";
import { getUserFormSnippet,getUsersSubmissions } from "../../services/get";

export default function DetailsBody() {
  const [opened, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState('');
  let navigator = useNavigate();
  let params = useParams();

  const fetchData = async () => {
    try {

      const htmlResponse = await getUserFormSnippet(params.id!);
      const tableResponse = await getUsersSubmissions(params.id!)
      console.log(tableResponse.data)
      setHtml(htmlResponse.data);
      setLoading(false);

    } catch (e) {
      navigator("/dashboard/")
    }
  }


  useEffect(() => {
    fetchData();
  }, [])



  return (
    <>
      {
        loading && <DetailsLoading />
      }
      {
        !loading && (
          <>

            <Group position="right">
              <Button size="sm" color="teal" onClick={() => setOpen((o) => !o)}>
                <Code size={"20"} /> Snippet
              </Button>
            </Group>
            <Collapse in={opened}>
              <Prism my="md" mb="md" language="markdown">{html}</Prism>
            </Collapse>
            <Paper withBorder shadow="md" p={10} mt={30} radius="sm">
              <ScrollArea>
                <Table verticalSpacing="xs">
                  <thead>
                    <tr>
                      <th>Book title</th>
                      <th>Year</th>
                      <th>Author</th>
                      <th>Reviews</th>
                      <th>Reviews distribution</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>a</td>
                      <td>b</td>
                      <td>c</td>
                      <td>d</td>
                      <td>e</td>
                    </tr>
                    <tr>
                      <td>a</td>
                      <td>b</td>
                      <td>c</td>
                      <td>d</td>
                      <td>e</td>
                    </tr>
                    <tr>
                      <td>a</td>
                      <td>b</td>
                      <td>c</td>
                      <td>d</td>
                      <td>e</td>
                    </tr>
                    <tr>
                      <td>a</td>
                      <td>b</td>
                      <td>c</td>
                      <td>d</td>
                      <td>e</td>
                    </tr>
                  </tbody>
                </Table>
              </ScrollArea>
              <Pagination total={2} color="teal" size="sm" mt="md" mb="md" />
            </Paper>
          </>
        )
      }
    </>
  );
}