// TaskCreateApi.ts
// import axios from 'axios';
import { ICreateTask } from './TaskCreateSlice';

export const createTask = async (taskData: ICreateTask) => {
  try {
    const response = await fetch("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Task creada:", data);
    } else {
      console.error("Error creating task:", response.statusText);
    }
    return 200;
  } catch (error) {
    console.error("Error creating task:", error);
    return 500;
  }
};
