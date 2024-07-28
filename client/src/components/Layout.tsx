import { Container } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './ui/NavBar';
// import Loader from './HOCs/Loader';
import { useAppSelector } from './hooks/reduxHooks';

export default function Layout(): JSX.Element {
  const status = useAppSelector((state) => state.auth.user.status);

  return (
    <Container maxW="container.xl">
      {/* <Loader isLoading={status === 'fetching'}> */}
        <>
          <NavBar />
          <Outlet />
        </>
      {/* </Loader> */}
    </Container>
  );
}
