import {
    CREATE_TASK_SUCCESS,
    FETCH_TASKS_SUCCESS
} from '../actions/taskActions';

const initialState = {
    byId: {},
    allIds: []
};

const normalizeTasks = (tasks) => tasks.reduce(
    (result, task) => ({
        byId: {
            ...result.byId,
            [task.id]: task
        },
        allIds: [...result.allIds, task.id]
    }),
    initialState
);

export const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS:
            return normalizeTasks(action.payload);

        case CREATE_TASK_SUCCESS:
            return {
                byId: {
                    ...state.byId,
                    [action.payload.id]: action.payload
                },
                allIds: state.allIds.includes(action.payload.id)
                    ? state.allIds
                    : [action.payload.id, ...state.allIds]
            };

        default:
            return state;
    }
};

export default taskReducer;