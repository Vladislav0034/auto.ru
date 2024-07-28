import type React from 'react';
import { useEffect } from 'react';
import {  createAutoThunk, deleteAutoThunk, editAutoThunk, getAutosThunk } from '../../redux/Autos/AutoAsyncActions';
import type { EditAutoType, AutoType } from '../../types/AutoTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useAutos(): {
  autos: AutoType[];
  AutosSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteHandler: (id: AutoType['id']) => void
  editHandler: ( obj: EditAutoType) => void
} {
  const autos = useAppSelector((state) => state.autos.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(getAutosThunk());
  }, [dispatch]);

   const AutosSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as unknown as AutoType;
    void dispatch(createAutoThunk(data));
  };

  const deleteHandler = (id: AutoType['id']): void => {
    void dispatch(deleteAutoThunk(id));
  }

  const editHandler = ( obj: EditAutoType): void => {
    void dispatch(editAutoThunk(obj));
  } 

  return { autos , AutosSubmitHandler, deleteHandler, editHandler  };
}