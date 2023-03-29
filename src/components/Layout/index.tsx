import { AppShell, useMantineTheme } from '@mantine/core';
import { SiteHeader } from '../SiteHeader';

interface ILayoutProps {
    children?: JSX.Element
}

//Function Component - Renders an AppShell that will contain, header and body content. Also has scope for Navigation in future if reqired 
export function Layout({ children }: ILayoutProps) {
    const theme = useMantineTheme();
    return (
        <AppShell
            header={<SiteHeader />}
            styles={{
                main: {
                    background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[1],
                    padding: '10px 15px'
                },
            }}
        >
            {children}
        </AppShell>
    );
}