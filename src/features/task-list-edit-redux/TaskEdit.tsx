import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  editTask,
  getTaskToEdit,
  handlerInputChange,
  taskEdit,
} from "./TaskEditSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./TaskEditStyle.module.css";

const TaskEdit = (props: { id?: number }) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const data = useAppSelector(taskEdit);
  useEffect(() => {
    if (props.id !== undefined)
      dispatch(getTaskToEdit(props.id));
  }, [getTaskToEdit, props.id]);

  const handlerSubmitForm = async (e) => {
    e.preventDefault();
    dispatch(editTask({ task: data.editForm, idTask: props.id as number }));
    alert("elemento editado con exito!");
    router.push("/");
  };

  const setInputValue = (e) =>
    dispatch(
      handlerInputChange({
        name: e.target.name,
        value: e.target.value,
      })
    );

  return (
    <div>
      <div className={styles.container}>
        <p className={styles.legend}><i>tarea creada por: <b>{data.editForm.author}</b></i></p>
        <form onSubmit={handlerSubmitForm}>
          <div className={styles.formItem}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={data.editForm.name}
              onChange={setInputValue}
            />
          </div>
          <div className={styles.formItem}>
            <label>Description:</label>
            <textarea
              name="description"
              value={data.editForm.description}
              onChange={setInputValue}
            />
          </div>
          <button className={styles.sutBoton} type="submit">Editar Tarea</button>
        </form>
      </div>
    </div>
  );
};

export default TaskEdit;
