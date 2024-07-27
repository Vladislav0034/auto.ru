import type React from 'react';
import { useEffect } from 'react';
import { /* createAutoThunk, deleteAutoThunk, editAutoThunk, */ getAutosThunk } from '../../redux/Autos/AutoAsyncActions';
import type { EditAutoType, AutoType } from '../../types/AutoTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useAutos(): {
  tasks: AutoType[];
  TasksSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteHandler: (id: AutoType['id']) => void
  editHandler: ( obj: EditAutoType) => void
} {
  const autos = useAppSelector((state) => state.autos.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getAutosThunk());
  }, [dispatch]);

  /* const TasksSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as TaskType;
    void dispatch(createTaskThunk(data));
  };

  const deleteHandler = (id: TaskType['id']): void => {
    void dispatch(deleteTaskThunk(id));
  }

  const editHandler = ( obj: EditTaskType): void => {
    void dispatch(editTaskThunk(obj));
  } */

  return { autos /* , TasksSubmitHandler, deleteHandler, editHandler */ };
}