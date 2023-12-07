import { ITask } from "./taskListSlice";

export const getAll = async () => {
    const req = await fetch("http://localhost:4000/todos")
    const data = await req.json();
    return data.data;
}

export const deleteTask = async (taskId: number) => {
    const req = await fetch(`http://localhost:4000/todos/${taskId}`, {
      method: "DELETE",
    })
    const data = await req.json();
    return data;
}

export const checkTask = async (task: ITask) => {
    const response = await fetch(`http://localhost:4000/todos/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task.name,
        description: task.description,
        isComplete: !task.isComplete
      }),
    });
    const res = await response.json();
    return res.data;
}