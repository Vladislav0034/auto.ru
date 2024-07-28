import { Container } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
import { useAppSelector } from './hooks/reduxHooks';

export default function Layout(): JSX.Element {
  const status = useAppSelector((state) => state.auth?.user?.status || 'fetching');

  return (
    <Container maxW="container.xl">
      <>
        <NavBar />
        <Outlet />
      </>
    </Container>
  );
}