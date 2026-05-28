// Task sagas for handling async operations
// TODO: Implement saga functions for task management

import { call, put, takeEvery, takeLatest, race, delay } from 'redux-saga/effects';
import { mockApi } from '../../api/mockApi';
import {
    FETCH_TASKS_REQUEST,
    fetchTasksSuccess,
    FETCH_USERS_REQUEST,
    fetchUsersSuccess,
    FETCH_PROJECTS_REQUEST,
    fetchProjectsSuccess
} from '../actions/taskActions';
import { setLoading, setError, clearError } from '../actions/uiActions';

// TODO: Import action types and action creators
// import { FETCH_TASKS_REQUEST, CREATE_TASK_REQUEST, ... } from '../actions/taskActions';

// TODO: Implement saga functions
// Requirements:
// 1. Handle fetch tasks with error handling
// 2. Handle create task with optimistic updates
// 3. Handle update task with optimistic updates  
// 4. Handle delete task with optimistic updates
// 5. Implement retry logic for failed requests
// 6. Handle race conditions (cancel previous requests)

// TODO: Implement fetchTasksSaga - use call, put, try-catch
// TODO: Implement createTaskSaga - optimistic updates with rollback
// TODO: Implement updateTaskSaga - similar to create
// TODO: Implement deleteTaskSaga - with confirmation handling

function* fetchTasksSaga(action) {
    try {
        yield put(setLoading('tasks', true));
        yield put(clearError('tasks'));

        const filters = action.payload || {};
        const response = yield call(mockApi.fetchTasks, filters);

        yield put(fetchTasksSuccess(response.data));

    } catch (error) {
        const message = error.message || 'Failed to fetch tasks.';
        yield put(setError('tasks', message));
    } finally {
        yield put(setLoading('tasks', false));
    }
}

function* fetchUsersSaga(action) {
    try {
        yield put(setLoading('users', true));
        yield put(clearError('users'));

        const response = yield call(mockApi.fetchUsers);
        yield put(fetchUsersSuccess(response.data));
    } catch (error) {
        const message = error.message || 'Failed to fetch users.';
        yield put(setError('users', message));
    } finally {
        yield put(setLoading('users', false));
    }
}

function* fetchProjectsSaga() {
    try {
        yield put(setLoading('projects', true));
        yield put(clearError('projects'));

        const response = yield call(mockApi.fetchProjects);
        yield put(fetchProjectsSuccess(response.data));
    } catch (error) {
        const message = error.message || 'Failed to fetch projects.';
        yield put(setError('projects', message));
    } finally {
        yield put(setLoading('projects', false));
    }
}

// TODO: Export watcher sagas using takeLatest/takeEvery

export default function* taskSagas() {
    yield takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga);
    yield takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga);
    yield takeLatest(FETCH_PROJECTS_REQUEST, fetchProjectsSaga);
}
