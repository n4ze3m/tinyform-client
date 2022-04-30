import {
  createStyles,
  Text,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Button,
  Avatar,
  Transition,
  Paper,
} from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
import { ChevronDown } from "tabler-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken } from "../../services/token";

const authLink = [
  {
    link: "/docs",
    label: "Docs",
    type: "link",
  },
  {
    link: "#2",
    label: "User",
    type: "image",

    links: [
      {
        link: "/logout",
        label: "Logout",
      },
    ],
  },
];

const noAthLink = [
  {
    link: "/docs",
    label: "Docs",
    type: "link",
  },
];

const authMobileLink = [
  {
    link: "/docs",
    label: "Docs",
    type: "link",
  },
  {
    link: "/logout",
    label: "Logout",
    type: "link",
  },
];

const useStyles = createStyles((theme) => ({
  inner: {
    height: 56,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dropdown: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface HeaderSearchProps {
  links: {
    link: string;
    label: string;
    type: string;
    links: { link: string; label: string }[];
  }[];
}

export function HeaderMenu() {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();
  const accesstoken = getAccessToken();
  let navigate = useNavigate();
  let links: any[] = [];
  let mobile: any[] = [];
  if (accesstoken) {
    links = authLink;
    mobile = authMobileLink;
  } else {
    links = noAthLink;
    mobile = noAthLink;
  }

  const mobileItems = mobile.map((item: any) => {
    return (
      <div className={classes.link} key={item.link}>
        <Text<typeof Link> component={Link} to={item.link}>
          {item.label}
        </Text>
      </div>
    );
  });

  const items = links.map((link) => {
    const menuItems = link.links?.map((item: any) => (
      <Menu.Item key={item.link} onClick={() => {}}>
        <Text<typeof Link> component={Link} to={item.link}>
          {item.label}
        </Text>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          delay={0}
          transitionDuration={0}
          placement="end"
          gutter={1}
          control={
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                {link.type === "image" && (
                  <Avatar radius="xl" size={20} className={classes.linkLabel} />
                )}
                {link.type === "button" && (
                  <Button color="teal">{link.label}</Button>
                )}
                {link.type === "link" && link.label}
                <ChevronDown size={12} />
              </Center>
            </a>
          }
        >
          {menuItems}
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.type === "image" && (
          <Avatar
            radius="xl"
            size={20}
            className={classes.linkLabel}
            src="https://vercel.com/api/www/avatar/tvTvBUaOycYrEUTRPEBO3dFS?&s=120"
          />
        )}
        {link.type === "button" && <Button color="teal">{link.label}</Button>}
        {link.type === "link" && link.label}
      </a>
    );
  });

  return (
    <Header height={56} mb={10}>
      <Container>
        <div className={classes.inner}>
          <Text<typeof Link>
            component={Link}
            to={accesstoken ? "/dashboard" : "/"}
            weight={700}
          >
            TinyForm
          </Text>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {mobileItems}
              </Paper>
            )}
          </Transition>
        </div>
      </Container>
    </Header>
  );
}
