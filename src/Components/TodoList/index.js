import './styles.css';

import { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { TodoListItem } from '../TodoListItem';

export const TodoList = () => {
  const [taskEdit, setTaskEdit] = useState();
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const _tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!_tasks) return;
    setTasks([..._tasks]);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const HandleNewTask = e => {
    setNewTask(e.target.value)
  }

  const HandleFormSubmit = e => {
    e.preventDefault();

    if (taskEdit) {
      const index = tasks.findIndex(task => task.id === taskEdit.id);
      const newTasks = tasks;
      newTasks[index] = taskEdit;
      setTasks([...newTasks]);
      setTaskEdit();
    }

    if (!newTask) return;

    const taskObjt = {
      name: newTask,
      complete: false,
      id: uuidv4(),
    }

    setTasks([...tasks, taskObjt]);
    setNewTask("");
  }

  const HandleCheckedTask = _task => {
    const index = tasks.findIndex(task => task.id === _task.id);
    if (index < 0) return;
    const newTasks = tasks;
    if (newTasks[index].complete) {
      newTasks[index].complete = false;
    } else {
      newTasks[index].complete = true;
    }
    setTasks([...newTasks]);
  }

  const HandleDeleteTask = _task => {
    const index = tasks.findIndex(task => task.id === _task.id);
    if (index < 0) return;
    const newTasks = tasks;
    newTasks.splice(index, 1);
    setTasks([...newTasks]);
  }

  const HandleSetTaskEdit = _task => {
    setTaskEdit(_task);
  }

  const HandleTaskEdit = e => {
    const newTaskEdit = { ...taskEdit, name: e.target.value };
    setTaskEdit(newTaskEdit);
  }

  return (
    <section>
      <h2>Nova Tarefa</h2>

      <form onSubmit={HandleFormSubmit} className="FormSection">
        <input
          value={taskEdit ? taskEdit.name : newTask}
          type="text"
          placeholder="ex: natação hoje"
          onChange={taskEdit ? HandleTaskEdit : HandleNewTask}
          maxLength="30"
        />
        <button type='submit'> {taskEdit ? 'Atualizar' : 'Salvar'}</button>
      </form>

      <div className='content-tasks'>
        <ul>
          {tasks.map(task => (
            <TodoListItem
              task={task}
              key={task.id}
              onChecked={HandleCheckedTask}
              onDelete={HandleDeleteTask}
              onSetTaskEdit={HandleSetTaskEdit}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}