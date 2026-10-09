import { useEffect, useState } from 'react';
import { AppShell, Button, Group, Title } from '@mantine/core';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { RoutePath } from '@/constants';
import { UserService } from '@/services';

export const Layout = () => {
  const navigate = useNavigate();
  const logout = () => undefined;
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);

  useEffect(() => {
    setIsUserAuthorized(UserService.isAuthorized());
  }, []);

  const buttonParams = [
    {
      isVisible: true,
      label: 'Home',
      props: { onClick: () => navigate(RoutePath.root), variant: 'outline' },
    },
    {
      label: 'Log in',
      props: { onClick: () => navigate(RoutePath.signIn), variant: 'outline' },
      isVisible: !isUserAuthorized
    },
    {
      label: 'Sign up',
      props: { onClick: () => navigate(RoutePath.signUp) },
      isVisible: !isUserAuthorized,
    },
    {
      label: 'Log out',
      props: { onClick: () => logout, variant: 'outline', color: 'red' },
      isVisible: isUserAuthorized,
    },
  ].filter(({ isVisible }) => isVisible);

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
            {buttonParams.map(({label, props}) => (
              <Button {...props}>{label}</Button>
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
