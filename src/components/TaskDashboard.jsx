// Main Dashboard Component
// TODO: Implement the main container component

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import FilterBar from './FilterBar';
import {
  setFilters,
  openTaskForm,
  closeTaskForm
} from '../store/actions/uiActions';

import {
  fetchProjectsRequest,
  fetchTasksRequest,
  fetchUsersRequest
} from '../store/actions/taskActions';


// TODO: Import selectors and actions
// import { 
//   selectAllTasks,
//   selectFilteredTasks,
//   selectTaskFormState,
//   selectUsers,
//   selectProjects,
//   selectFilters,
//   selectLoading,
//   selectErrors
// } from '../store/selectors';

// import {
//   fetchTasksRequest,
//   createTaskRequest,
//   updateTaskRequest,
//   deleteTaskRequest,
//   openTaskForm,
//   closeTaskForm,
//   setFilters
// } from '../store/actions';

const TaskDashboard = () => {
  const dispatch = useDispatch();

  // TODO: Connect to Redux state using useSelector
  const filters = useSelector((state) => state.ui.filters);
  const tasks = useSelector((state) =>
    state.entities.tasks.allIds.map((id) => state.entities.tasks.byId[id])
  );

  const users = useSelector((state) =>
    state.entities.users.allIds.map((userId) => state.entities.users.byId[userId])
  );
  const projects = useSelector((state) =>
    state.entities.projects.allIds.map((projectId) => state.entities.projects.byId[projectId])
  );
  const loading = useSelector((state) => state.ui.loading || { tasks: false, users: false, projects: false });

  const filteredTasks = tasks.filter((task) => {
    if (filters.status !== 'all' && task.status !== filters.status) return false;
    if (filters.projectId && task.projectId !== filters.projectId) return false;
    if (filters.assigneeId && task.assigneeId !== filters.assigneeId) return false;
    if (filters.taskType !== 'all' && task.taskType !== filters.taskType) return false;
    if (filters.search && !task.title?.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
  const taskForm = useSelector((state) => state.ui.taskForm || { isOpen: false, mode: 'create', taskId: null });


  // TODO: Fetch initial data on component mount
  useEffect(() => {
    dispatch(fetchTasksRequest(filters));
    dispatch(fetchUsersRequest());
    dispatch(fetchProjectsRequest());
  }, [dispatch, filters]);

  // TODO: Refetch tasks when filters change

  // TODO: Implement event handlers
  const handleCreateTask = () => {
    dispatch(openTaskForm('create'));
  };

  const handleEditTask = (taskId) => {
    dispatch(openTaskForm('edit', taskId));
  };

  const handleDeleteTask = (taskId) => {
    // TODO: Show confirmation and dispatch delete action
  };

  const handleFormSubmit = (formData) => {
    // TODO: Dispatch create or update action based on form mode
  };

  const handleFormClose = () => {
    dispatch(closeTaskForm());
  };

  const handleFiltersChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };

  return (
    <div className="task-dashboard">
      <header className="dashboard-header">
        <h1>Task Management Dashboard</h1>
        <button
          className="create-task-btn"
          onClick={handleCreateTask}
        >
          + Create Task
        </button>
      </header>

      {/* TODO: Show error messages */}
      {/* {errors.tasks && (
        <div className="error-banner">
          Error: {errors.tasks}
        </div>
      )} */}

      <FilterBar
        filters={filters}
        projects={projects}
        users={users}
        onFiltersChange={handleFiltersChange}
      />

      <TaskList
        tasks={filteredTasks}
        loading={loading.tasks}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />

      <TaskForm
        isOpen={taskForm.isOpen}
        mode={taskForm.mode}
        initialData={taskForm.taskId ? tasks.find(t => t.id === taskForm.taskId) : null}
        users={users}
        projects={projects}
        loading={loading.tasks}
        onSubmit={handleFormSubmit}
        onClose={handleFormClose}
      />
    </div>
  );
};

export default TaskDashboard;