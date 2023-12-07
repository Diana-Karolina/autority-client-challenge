// taskSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createTask } from './TaskCreateAPI';
import { AppState } from '../../app/store';

export interface ICreateTask {
  name: string;
  description: string;
  author: string;
}

const initialStateForm: ICreateTask = {
  author: "",
  description: "",
  name: ""
};

export interface initialState {
  form: ICreateTask,
  status: 'idle' | 'loading' | 'failed'
}

const initialState: initialState = {
  form: initialStateForm,
  status: 'idle'
}

interface handlerInputChangeProps {
  name: string;
  value: string;
}

export const addTaskAsync = createAsyncThunk(
  'create/CreateTaskAsync',
  async (formData: ICreateTask) => {
    const response = await createTask(formData);
    // The value we return becomes the `fulfilled` action payload
    return response
  }
)

export const createTaskSlice = createSlice({
  name: 'create-task',
  initialState: initialState,
  reducers: {
    handlerInputChange: (state, action: PayloadAction<handlerInputChangeProps>) => {
      state.form = {
        ...state.form,
        [action.payload.name]: action.payload.value
      }
    },
    resetForm: (state) => {
      state.form = {...initialStateForm}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.status = 'idle'
      })
  },
});

export const { handlerInputChange, resetForm } = createTaskSlice.actions;

export const taskForm = (state: AppState) => state.createTask

export default createTaskSlice.reducer;

