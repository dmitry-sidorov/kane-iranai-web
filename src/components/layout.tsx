import { RoutePath } from '@/constants';
import { AppShell, Group, Title } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';

const appLinks = [
  { to: RoutePath.root, label: 'Home' },
  { to: RoutePath.signIn, label: 'Sign in' },
  { to: RoutePath.signUp, label: 'Sign up' },
];

export const Layout = () => {
  return (
    <AppShell padding="md" header={{ height: 60 }}>
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Title order={4}>
            <Link key={RoutePath.root} to={RoutePath.root}>
              Kane Iranai Web
            </Link>
          </Title>
          <Group gap="md">
            {appLinks.map(({label, to}) => (
              <Link key={to} to={to}>
                {label}
              </Link>
            ))}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
