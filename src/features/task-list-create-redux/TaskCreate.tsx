//este componente se llama TaskCreate.tsx
import { useRouter } from "next/router";
import React from "react";
import styles from "./TaskCreate.module.css";
import {
  addTaskAsync,
  handlerInputChange,
  resetForm,
  taskForm,
} from "./TaskCreateSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

const CreateTask = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const data = useAppSelector(taskForm);

  const handlerSubmitForm = async (e) => {
    e.preventDefault();
    dispatch(addTaskAsync(data.form));
    router.push("/");
    dispatch(resetForm());
  };

  const setInputValue = (e) => {
    dispatch(
      handlerInputChange({
        name: e.target.name,
        value: e.target.value,
      })
    );
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handlerSubmitForm}>
        <div className={styles.formItem}>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={data.form.author}
            onChange={setInputValue}
          />
        </div>
        <div className={styles.formItem}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={data.form.name}
            onChange={setInputValue}
          />
        </div>
        <div className={styles.formItem}>
          <label>Description:</label>
          <textarea
            name="description"
            value={data.form.description}
            onChange={setInputValue}
          />
        </div>
        <button className={styles.sutBoton} type="submit">
          Crear Nueva Tarea
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
