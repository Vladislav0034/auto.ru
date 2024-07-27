import React, { useContext } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import AutoCard from '../ui/AutoCard';
import AutoForm from '../ui/AutoForm';
import useTasks from '../hooks/useAutos';



export default function MainPage():JSX.Element {
  const { TasksSubmitHandler, autos, deleteHandler, editHandler } = useTasks();

  return (
    <>
    <AutoForm TasksSubmitHandler={TasksSubmitHandler}/>
    <SimpleGrid columns={3} spacing={5}>
      {autos.map((el) => (<AutoCard auto={el} key={el.id} deleteHandler={deleteHandler}
      editHandler={editHandler}/>))}
    </SimpleGrid>
    </>
  )
}