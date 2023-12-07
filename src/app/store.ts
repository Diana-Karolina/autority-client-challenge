import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from '../features/counter-reference-redux/counterSlice'
import createTaskReducer from '../features/task-list-create-redux/TaskCreateSlice'
import editTaskReducer from '../features/task-list-edit-redux/TaskEditSlice'
import allTaskReducer from '../features/tasks-list-redux/taskListSlice'

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, createTask: createTaskReducer, editTask: editTaskReducer, allTask: allTaskReducer},
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
