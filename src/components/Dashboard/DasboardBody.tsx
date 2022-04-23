import { Button, createStyles, Group, SimpleGrid } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "tabler-icons-react";
import Layout from "../Common/Layout";
import DashCard from "./components/DashCard";

const useStyles = createStyles((theme) => ({
  createButton: {

    display: 'flex',
    justifyContent: 'space-between',
  }
}))

export default function DasboardBody() {
  const { classes } = useStyles()
  let navigator = useNavigate()
  return (<Layout>
    <Group
      position="right"
    >

      <Button className={classes.createButton} color="teal" 
      onClick={() => navigator("/dashboard/form/create")}
      >
        <Plus /> New form
      </Button>
    </Group>
    <SimpleGrid spacing="xs" cols={3} style={{
      marginTop: '1rem'
    }}
      breakpoints={[
        { maxWidth: 980, cols: 1, spacing: 'md' },
        { maxWidth: 755, cols: 1, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >

      <DashCard />
      <DashCard />
      <DashCard />
      <DashCard />
      <DashCard />

    </SimpleGrid>
  </Layout>);
}