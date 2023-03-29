import {
    createStyles,
    Header,
    Container,
    Title,
    Image,
    useMantineTheme
} from '@mantine/core';

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: 1,
        border: 0,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        margin: 0,
    },

}));


//Function Component - Site heading object with SpaceX image which will be rendered in the header prop of the AppShell
export function SiteHeader() {
    const { classes } = useStyles();
    const colorTheme = useMantineTheme().colorScheme

    return (
        <Header height={60} mah={60} className={classes.root}>
            <Container className={classes.header}>
                <Image maw={240} src={colorTheme === 'dark' ? '/LogoDark.png' : '/LogoLight.png'} alt="SpaceX Logo" />
            </Container>
        </Header>
    );
}