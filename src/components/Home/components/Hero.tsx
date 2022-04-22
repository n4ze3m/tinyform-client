import React from 'react';
import { createStyles, Container, Text, Button, Group, useMantineTheme } from '@mantine/core';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        boxSizing: 'border-box',
    },

    inner: {
        position: 'relative',
        paddingTop: 50,
        paddingBottom: 120,

        [BREAKPOINT]: {
            paddingBottom: 80,
            paddingTop: 80,
        },
    },

    title: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: 62,
        fontWeight: 900,
        lineHeight: 1.1,
        margin: 0,
        padding: 0,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [BREAKPOINT]: {
            fontSize: 42,
            lineHeight: 1.2,
        },
    },

    description: {
        marginTop: theme.spacing.xl,
        fontSize: 24,

        [BREAKPOINT]: {
            fontSize: 18,
        },
    },

    controls: {
        marginTop: theme.spacing.xl * 2,

        [BREAKPOINT]: {
            marginTop: theme.spacing.xl,
        },
    },

    control: {
        height: 54,
        paddingLeft: 38,
        paddingRight: 38,

        [BREAKPOINT]: {
            height: 54,
            paddingLeft: 18,
            paddingRight: 18,
            flex: 1,
        },
    },

    githubControl: {
        borderWidth: 2,
        borderColor: theme.colorScheme === 'dark' ? 'transparent' : theme.colors.dark[9],
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : 'transparent',

        '&:hover': {
            backgroundColor: `${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0]
                } !important`,
        },
    },
}));

export function HeroTitle() {
    const { classes, cx } = useStyles();
    const theme = useMantineTheme();

    return (
        <div className={classes.wrapper}>
            <Container className={classes.inner}>
                <h1 className={classes.title}>
                    Open Source{' '}
                    <Text component="span" variant="gradient" gradient={{ from: 'green', to: 'teal' }} inherit>
                        Form API
                    </Text>{' '}
                    For your frontend.
                </h1>

                <Text className={classes.description} color="dimmed">
                   No backend ? No problem Amigo. We can help you build your own form API with simple and easy method.
                </Text>

                <Group className={classes.controls}>
                    <Button
                        size="xl"
                        className={classes.control}
                        variant="gradient"
                        gradient={{ from: 'green', to: 'teal' }}
                    >
                        Get started
                    </Button>

                    <Button
                        component="a"
                        href="https://github.com/n4ze3m/tinyform"
                        size="xl"
                        variant="outline"
                        className={cx(classes.control, classes.githubControl)}
                        color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
                    >
                        GitHub
                    </Button>
                </Group>
            </Container>
        </div>
    );
}