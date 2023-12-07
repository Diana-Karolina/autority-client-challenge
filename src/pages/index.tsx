import React from 'react';
import TaskList from '../features/tasks-list-redux/TaskList';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Home = () => {

  const router = useRouter();

  return (
    <div>
      <h1 className={styles.sectionTitle}>Todas las Tareas</h1>
      <button className={styles.button} onClick={() => router.push("/task")}>agregar tarea</button>
      <TaskList />
    </div>
  );
};

export default Home;
