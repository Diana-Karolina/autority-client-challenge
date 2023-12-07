// taskEditSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../../app/store';
import { getTaskById, putTask } from './TaskEditAPI';

export interface ITaskEdit {
  author: string,
  description: string,
  name: string
}
export interface initialState {
  editForm: ITaskEdit ,
  isSuccess: boolean,
  status: 'idle' | 'loading' | 'failed'
}

const initialState: initialState = {
  editForm: {
    author: "",
    description: "",
    name: ""
  },
  isSuccess: false,
  status: "idle"
};

interface handlerInputChangeProps {
  name: string;
  value: string;
}

export const getTaskToEdit = createAsyncThunk(
  'taskEdit/getTaskToEdit',
  async (idTask: number): Promise<ITaskEdit> => {
    const response = await getTaskById(idTask);
    // The value we return becomes the `fulfilled` action payload
    return response
  }
)

export const editTask = createAsyncThunk(
  'taskEdit/editTask',
  async (request: {task: ITaskEdit, idTask: number}): Promise<ITaskEdit> => {
    const response = await putTask(request.task, request.idTask);
    return response
  }
)

export const taskEditSlice = createSlice({
  name: 'taskEdit',
  initialState,
  reducers: {
    handlerInputChange: (state, action: PayloadAction<handlerInputChangeProps>) => {
      state.editForm = {
        ...state.editForm,
        [action.payload.name]: action.payload.value
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaskToEdit.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getTaskToEdit.fulfilled, (state, action) => {
        state.status = 'idle'
        if(action.payload) state.editForm = action.payload
      })
      .addCase(getTaskToEdit.rejected, (state, action) => {
        console.log(action.error)
      }),
    builder
      .addCase(editTask.fulfilled, (state) => {
        state.isSuccess = true;
      })
  },
});

export const { handlerInputChange} = taskEditSlice.actions;

export const taskEdit = (state: AppState) => state.editTask

export default taskEditSlice.reducer;
