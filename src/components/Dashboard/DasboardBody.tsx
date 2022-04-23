import { Button, createStyles, Group, SimpleGrid } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "tabler-icons-react";
import { Form, HomeForm } from "../../interface/home.interface";
import { getUserForms } from "../../services/get";
import DashCard from "./components/DashCard";
import DashLoading from "./components/DashLoading";

const useStyles = createStyles((theme) => ({
  createButton: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}))

export default function DasboardBody() {
  const { classes } = useStyles()
  let navigator = useNavigate()
  const [data, setData] = useState<HomeForm>()
  const [loading, setLoading] = useState(true)


  const fetchData = async () => {
    const response = await getUserForms()
    const homeResponse: HomeForm = response.data
    setData(homeResponse)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (<>
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

      {
        loading && !data && <DashLoading />
      }
      {
        !loading && data && data.forms.map((form: Form) => {
          return <DashCard key={form._id} {...form} />
        })
      }
    </SimpleGrid>
  </>)
}