import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: [],
    loading: null,
    error: null
}

const DeletedReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TASK_DELETE_FETCH_START:
            return {
                ...state,
                loading: true,
            }

        case actionTypes.TASK_DELETE_FETCH_SUCCESS:
            return {
                ...state,
                tasks: action.deletedTasks,
                loading: false,
            }

        case actionTypes.TASK_DELETE_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.TASK_DELETE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.TASK_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.tasks,
            }
        case actionTypes.TASK_DELETE_ERROR:
            return {
                ...state,
                error: action.err,
                loading: false
            }
        default:
            return state
    }
}

export default DeletedReducer;