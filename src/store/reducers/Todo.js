import * as actionTypes from '../actions/actionTypes';

const initialState = {
    tasks: [],
    count: 0,
    loading: null,
    error: null
}

const TodoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TODO_TASK_FORM_STATE_HANDLER:
            return {
                ...state,
                // count: state.count + 1,
                tasks: {
                    ...state.tasks,
                    tasks: action.todoTasks
                }
                //  state.tasks.push(action.formComponentState)
            }

        case actionTypes.TODO_TASK_FETCH_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.TODO_TASK_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.todoTasks,
                // count:tasks.length
            }
        case actionTypes.TODO_TASK_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.err
            }

        case actionTypes.TODO_TASK_COMPLETE_START:
            return {
                ...state,
                loading: true,
            }

        case actionTypes.TODO_TASK_COMPLETE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tasks: action.todoTasks
            }

        case actionTypes.TODO_TASK_COMPLETE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            }

        case actionTypes.DELETE_COMPLETED_TASK_START:
            return {
                ...state,
                loading: true,
            }

        case actionTypes.DELETE_COMPLETED_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.todoTasks
            }

        case actionTypes.DELETE_COMPLETED_TASK_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        case actionTypes.SAVE_TASKS_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.SAVE_TASKS_SUCCESS:
            return {
                ...state,
                loading: false,
                tasks: action.todoTasks
            }

        case actionTypes.SAVE_TASKS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }

        default:
            return state;
    }
}

export default TodoReducer;