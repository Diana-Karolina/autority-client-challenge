//este componente se llama taskListSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkTask, deleteTask, getAll } from './taskListAPI';
import { AppState } from '../../app/store';


export interface ITask {
    id: number;
    name: string;
    description: string;
    author: string;
    isComplete: boolean;
    deletedAt: Date | null;
    createdAt: Date; 
    updatedAt: Date;
}

export interface initialState {
  tasks: ITask[];
  status: 'idle' | 'loading' | 'failed';
  isFetching: boolean
}

const initialState: initialState = {
  tasks: [],
  status: "idle",
  isFetching: false
}

export const getAllTasks = createAsyncThunk(
  'taskList/getAllTasks',
  async (): Promise<ITask[]> => {
    const response = await getAll();
    // The value we return becomes the `fulfilled` action payload
    return response
  }
)

export const deleteTaskAsync = createAsyncThunk(
  'taskList/deleteTask',
  async (idTask: number): Promise<number> => {
    const response = await deleteTask(idTask);
    return idTask;
  }
)

export const completeTask = createAsyncThunk(
  'taskList/completeTask',
  async (task: ITask): Promise<number>=> {
    const response = await checkTask(task);
    return task.id;
  }
)

// crear slice para tareas
export const taskSlice = createSlice({
  name: 'create-task',
  initialState: initialState,
  reducers: {
    completeTask: (state, action: PayloadAction<number>) => {
      
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.status = 'idle'
        state.isFetching = true
        if(action.payload) state.tasks = action.payload
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(e => e.id !== action.payload);
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        const task = state.tasks.find((t) => t.id === action.payload);
        if (task) task.isComplete = !task.isComplete;
      })
  },
});

export const taskAll = (state: AppState) => state.allTask

export const { } = taskSlice.actions;


export default taskSlice.reducer;
