import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import AutoCard from '../ui/AutoCard';
import AutoForm from '../ui/AutoForm';
import useAutos from '../hooks/useAutos';
import { useAppSelector } from '../hooks/reduxHooks';

export default function AccountPage(): JSX.Element {
  const { AutosSubmitHandler, autos, deleteHandler, editHandler } = useAutos();
  const currentUser = useAppSelector((state) => state.auth.user);

  // Фильтрация задач для отображения только тех, которые принадлежат текущему пользователю
  const userAutos = autos.filter(auto => auto.userId === currentUser.id);

  return (
    <>
      <AutoForm AutosSubmitHandler={AutosSubmitHandler} />
      <SimpleGrid columns={3} spacing={5}>
        {userAutos.map((el) => (
          <AutoCard
            auto={el}
            key={el.id}
            deleteHandler={deleteHandler}
            editHandler={editHandler}
          />
        ))}
      </SimpleGrid>
    </>
  );
}