import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import AutoService from "../../services/AutoService";
import type { EditAutoType, AutoDataType, AutoType} from "../../types/AutoTypes";
// eslint-disable-next-line import/no-duplicates
import { type ApiResponce } from "../../types/AutoTypes";


// eslint-disable-next-line import/prefer-default-export
export const getAutosThunk = createAsyncThunk<ApiResponce>(
    "autos/getAll",
    async () => {
        const data = await AutoService.getAutos();
        return data;
    });


 export const createAutoThunk = createAsyncThunk<AutoType, AutoDataType>('autos/create',
    async (data) => {
    const auto = await AutoService.addAuto(data);
    return auto;
    });
    

export const deleteAutoThunk = createAsyncThunk<AutoType['id'], AutoType['id']>('autos/delete',
    async (id) => {
        await AutoService.deleteAuto(id);
        return id;
});



export const editAutoThunk = createAsyncThunk<AutoType, EditAutoType>(
    'tasks/edit',
    async ({ id, data }) => {
      const auto = await AutoService.editAuto(id, data);
      return auto;
    }
);  