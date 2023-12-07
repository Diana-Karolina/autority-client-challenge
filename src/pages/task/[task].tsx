//este componente es {task} el cualllamaria a mi componente TaskEdite.tsx
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import TaskEdit from '../../features/task-list-edit-redux/TaskEdit'

const taskId: NextPage = () => {

  const router = useRouter()

  return (
    <div>
      <h1 className='sectionTitle'>Editar la tarea con el Id: {router.query.task}</h1>
      <div>
        <TaskEdit id={Number(router.query.task) || undefined}/>
      </div>
    </div>
  );
}

export default taskId