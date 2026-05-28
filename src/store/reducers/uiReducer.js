import { SET_FILTERS, CLEAR_FILTERS, SET_LOADING, SET_ERROR, CLEAR_ERROR, OPEN_TASK_FORM, CLOSE_TASK_FORM } from '../actions/uiActions'

const initialFilters = {
    projectId: null,
    assigneeId: null,
    status: 'all',
    taskType: 'all',
    search: ''
};

const initialState = {
    filters: initialFilters,
    taskForm: {
        isOpen: false,
        mode: 'create', // 'create' | 'edit'
        taskId: null
    },
    loading: {
        tasks: false,
        users: false,
        projects: false
    },
    errors: {
        tasks: null,
        users: null,
        projects: null,
        form: null
    }
}

const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_TASK_FORM:
            return {
                ...state,
                taskForm: {
                    isOpen: true,
                    mode: action.payload.mode,
                    taskId: action.payload.taskId
                }
            };

        case CLOSE_TASK_FORM:
            return {
                ...state,
                taskForm: {
                    isOpen: false,
                    mode: 'create',
                    taskId: null
                }
            };

        case CLEAR_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload]: null
                }
            };
        case SET_FILTERS:
            return {
                ...state,
                filters: {
                    ...state.filters,
                    ...action.payload
                }
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                filters: initialFilters
            };

        case SET_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.payload.key]: action.payload.value
                }
            };

        case SET_ERROR:
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload.key]: action.payload.error
                }
            };

        default:
            return state;
    }

}

export default uiReducer