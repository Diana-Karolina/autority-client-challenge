import { ITaskEdit } from "./TaskEditSlice";

export const getTaskById = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:4000/todos/${id}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
};

export const putTask = async (data: ITaskEdit, id: number) => {
  try {
    const response = await fetch(`http://localhost:4000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        isComplete: false
      }),
    });
    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error creating task:", error);
  }
}