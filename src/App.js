import React, { useState } from 'react';
import './App.css';

function App() {
  const TODO = 'TODO';
  const DOING = 'DOING';
  const DONE = 'DONE';
  const PRIORITY_LOW = 'Low';
  const PRIORITY_MEDIUM = 'Medium';
  const PRIORITY_HIGH = 'High';

  const [value, setValue] = useState('');
  const [priority, setPriority] = useState(PRIORITY_LOW); // Default priority for new tasks
  const [tasks, setTasks] = useState([]);
  const [dragTask, setDragTask] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);
  const [filterPriorityTODO, setFilterPriorityTODO] = useState('All'); // Filter for TODO
  const [filterPriorityDOING, setFilterPriorityDOING] = useState('All'); // Filter for DOING
  const [filterPriorityDONE, setFilterPriorityDONE] = useState('All'); // Filter for DONE

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) { // Enter pressed
      if (updateItem) { // User is coming for an update
        const obj = {
          title: value,
          id: updateItem.id,
          status: updateItem.status,
          priority: priority
        };
        const copyTask = [...tasks];
        const filterList = copyTask.filter((item) => item.id !== updateItem.id);
        setTasks([...filterList, obj]);
        setUpdateItem(null);
      } else {
        const obj = {
          title: value,
          status: TODO,
          id: Date.now(),
          priority: priority // Add priority to new task
        };
        setTasks([...tasks, obj]);
      }
      setValue('');
    }
  };

  const handlePriorityChange = (taskId, newPriority) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, priority: newPriority } : task
    );
    setTasks(updatedTasks);
  };

  const handleFilterChangeTODO = (e) => {
    setFilterPriorityTODO(e.target.value);
  };

  const handleFilterChangeDOING = (e) => {
    setFilterPriorityDOING(e.target.value);
  };

  const handleFilterChangeDONE = (e) => {
    setFilterPriorityDONE(e.target.value);
  };

  const handleDrag = (e, task) => {
    setDragTask(task);
  };

  const handleDragNDrop = (status) => {
    const updatedTasks = tasks.map((item) => {
      if (dragTask.id === item.id) {
        return { ...item, status: status };
      }
      return item;
    });
    setTasks(updatedTasks);
    setDragTask(null);
  };

  const handleOnDrop = (e) => {
    const status = e.target.getAttribute('data-status'); // Get the status
    handleDragNDrop(status);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const deleteTask = (item) => {
    const updatedTasks = tasks.filter((task) => task.id !== item.id);
    setTasks(updatedTasks);
  };

  const updateTask = (task) => {
    setUpdateItem(task);
    setValue(task.title);
    setPriority(task.priority); // Set current task priority for editing
  };

  const filteredTasks = (status, filterPriority) => {
    return tasks.filter((task) => {
      return task.status === status && (filterPriority === 'All' || task.priority === filterPriority);
    });
  };

  return (
    <div className="App">
      <h1 className='heading'>Work Wave</h1>
      <input
        onChange={handleChange}
        type='text'
        value={value}
        onKeyDown={handleKeyDown}
        placeholder="Enter task title"
      />

      {/* Task Board */}
      <div className='board'>
        {/* TODO Column */}
        <div className='todo'
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
          data-status={TODO}
        >
          <h2 className='todo-col'>TODO</h2>
          <select onChange={handleFilterChangeTODO} value={filterPriorityTODO}>
            <option value="All">All</option>
            <option value={PRIORITY_LOW}>Low</option>
            <option value={PRIORITY_MEDIUM}>Medium</option>
            <option value={PRIORITY_HIGH}>High</option>
          </select>
          {filteredTasks(TODO, filterPriorityTODO).map((task) => (
            <div
              key={task.id}
              className='task-item'
              draggable
              onDrag={(e) => handleDrag(e, task)}
            >
              <div className="task-priority">
                <select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                  className="priority-dropdown"
                >
                  <option value={PRIORITY_LOW}>Low</option>
                  <option value={PRIORITY_MEDIUM}>Medium</option>
                  <option value={PRIORITY_HIGH}>High</option>
                </select>
              </div>
              {task.title}
              <div>
                <span className='btn' onClick={() => updateTask(task)}>✏️</span>
                <span className='btn' onClick={() => deleteTask(task)}>🗑️</span>
              </div>
            </div>
          ))}
        </div>

        {/* DOING Column */}
        <div className='doing'
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
          data-status={DOING}
        >
          <h2 className='doing-col'>DOING</h2>
          <select onChange={handleFilterChangeDOING} value={filterPriorityDOING}>
            <option value="All">All</option>
            <option value={PRIORITY_LOW}>Low</option>
            <option value={PRIORITY_MEDIUM}>Medium</option>
            <option value={PRIORITY_HIGH}>High</option>
          </select>
          {filteredTasks(DOING, filterPriorityDOING).map((task) => (
            <div
              key={task.id}
              className='task-item'
              draggable
              onDrag={(e) => handleDrag(e, task)}
            >
              <div className="task-priority">
                <select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                  className="priority-dropdown"
                >
                  <option value={PRIORITY_LOW}>Low</option>
                  <option value={PRIORITY_MEDIUM}>Medium</option>
                  <option value={PRIORITY_HIGH}>High</option>
                </select>
              </div>
              {task.title}
              <div>
                <span className='btn' onClick={() => updateTask(task)}>✏️</span>
                <span className='btn' onClick={() => deleteTask(task)}>🗑️</span>
              </div>
            </div>
          ))}
        </div>

        {/* DONE Column */}
        <div className='done'
          onDrop={handleOnDrop}
          onDragOver={onDragOver}
          data-status={DONE}
        >
          <h2 className='done-col'>DONE</h2>
          <select onChange={handleFilterChangeDONE} value={filterPriorityDONE}>
            <option value="All">All</option>
            <option value={PRIORITY_LOW}>Low</option>
            <option value={PRIORITY_MEDIUM}>Medium</option>
            <option value={PRIORITY_HIGH}>High</option>
          </select>
          {filteredTasks(DONE, filterPriorityDONE).map((task) => (
            <div
              key={task.id}
              className='task-item'
              draggable
              onDrag={(e) => handleDrag(e, task)}
            >
              <div className="task-priority">
                <select
                  value={task.priority}
                  onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                  className="priority-dropdown"
                >
                  <option value={PRIORITY_LOW}>Low</option>
                  <option value={PRIORITY_MEDIUM}>Medium</option>
                  <option value={PRIORITY_HIGH}>High</option>
                </select>
              </div>
              {task.title}
              <div>
                <span className='btn' onClick={() => updateTask(task)}>✏️</span>
                <span className='btn' onClick={() => deleteTask(task)}>🗑️</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
