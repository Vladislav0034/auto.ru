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


/* export const createTaskThunk = createAsyncThunk<TaskType, TaskDataType>('tasks/create',
    async (data) => {
    const task = await TaskService.addTask(data);
    return task;
    });
    

export const deleteTaskThunk = createAsyncThunk<TaskType['id'], TaskType['id']>('tasks/delete',
    async (id) => {
        await TaskService.deleteTask(id);
        return id;
});



export const editTaskThunk = createAsyncThunk<TaskType, EditTaskType>(
    'tasks/edit',
    async ({ id, data }) => {
      const task = await TaskService.editTask(id, data);
      return task;
    }
);  */