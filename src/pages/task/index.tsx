import { NextPage } from "next";
import React from "react";
import TaskCreate from "../../features/task-list-create-redux/TaskCreate";

const index: NextPage = () => {

  return (
    <div>
      <h1 className="sectionTitle">
        Crear nueva tarea
      </h1>
      <TaskCreate />
    </div>
  );
};

export default index;
