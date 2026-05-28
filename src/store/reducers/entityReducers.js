import { FETCH_USERS_SUCCESS, FETCH_PROJECTS_SUCCESS } from '../actions/taskActions';

const initialState = {
    byId: {},
    allIds: []
};

const normalizeUsers = (users) => users.reduce(
    (result, user) => ({
        byId: {
            ...result.byId,
            [user.id]: user
        },
        allIds: [...result.allIds, user.id]
    }),
    initialState
);

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return normalizeUsers(action.payload);

        default:
            return state;
    }
};

const normalizeProjects = (projects) => projects.reduce(
    (result, project) => ({
        byId: {
            ...result.byId,
            [project.id]: project
        },
        allIds: [...result.allIds, project.id]
    }),
    initialState
);

const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PROJECTS_SUCCESS:
            return normalizeProjects(action.payload);

        default:
            return state;
    }
};

export { projectsReducer, usersReducer };