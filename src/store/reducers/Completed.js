import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: [],
    loading: null,
    error: null
}

const CompletedReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TASK_COMPLETE_FETCH_START:
            return {
                ...state,
                loading: true,
            }

        case actionTypes.TASK_COMPLETE_FETCH_SUCCESS:
            return {
                ...state,
                tasks: action.completedTasks,
                loading: false,
            }

        case actionTypes.TASK_COMPLETE_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.TASK_COMPLETE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.TASK_COMPLETE_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.tasks,
            }
        case actionTypes.TASK_COMPLETE_ERROR:
            return {
                ...state,
                error: action.err,
                loading: false
            }
        default:
            return state
    }
}

export default CompletedReducer;