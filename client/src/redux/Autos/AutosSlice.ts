import { createSlice } from '@reduxjs/toolkit';
import type { AutoType } from '../../types/AutoTypes';
import { /* createTaskThunk, deleteTaskThunk, editTaskThunk, */getAutosThunk } from './AutoAsyncActions';

type InitialStateType = {
  data: AutoType[];
};

const initialState: InitialStateType = {
  data: [],
};

const AutosSlice = createSlice({
  name: 'Autos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAutosThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
    });

    /* builder.addCase(createTaskThunk.fulfilled, (state, { payload }) => {
      state.data.push(payload);
    }); */

   /* builder.addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.filter((el) => el.id !== payload);
    }); */

   /* builder.addCase(editTaskThunk.fulfilled, (state, { payload }) => {
      state.data = state.data.map((el) => {
        if (el.id === payload.id) {
          return payload;
        }
        return el;
      }); 
    }); */
  },
});

export default AutosSlice;
