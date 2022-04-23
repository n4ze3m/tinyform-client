import React from "react";
import Layout from "../Common/Layout";
import { useState } from 'react';
import { Button, Collapse, Group, Pagination, ScrollArea, Table } from '@mantine/core';
import { Code } from "tabler-icons-react";
import { Prism } from '@mantine/prism';
const demoCode = `import { Button } from '@mantine/core';

function Demo() {
  return <Button>Hello</Button>
}`;
export default function DetailsBody() {
  const [opened, setOpen] = useState(false);

  return (
    <Layout>
      <Group position="right">
        <Button color="teal" onClick={() => setOpen((o) => !o)}>
          <Code /> Snippet
        </Button>
      </Group>
      <Collapse in={opened}>
        <Prism my="md" mb="md" language="tsx">{demoCode}</Prism>
      </Collapse>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="xs">
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
      <Pagination total={2} color="teal" size="sm" mt="md" />
    </Layout>
  );
}