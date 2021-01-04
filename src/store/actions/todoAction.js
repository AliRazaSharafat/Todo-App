import * as actionTypes from './actionTypes';
import axios from '../../axios-url';

export const formStateHandler = (tasks, formState) => {
    const newStateObj = {};
    newStateObj.desc = formState;
    newStateObj.completed = false;
    newStateObj.deleted = false;
    newStateObj.id = Math.floor(Math.random() * (1000 - 100) + 100) / 100;  //generating random number
    const updatedTasks = Array.from(tasks);
    updatedTasks.push({ newStateObj });
    // setTasks([...tasks, newStateObj]);
    // setCount(() => ++count);
    return {
        type: actionTypes.TODO_TASK_FORM_STATE_HANDLER,
        todoTasks: updatedTasks
    }
}

//Todo Tasks fetch
export const tasksFetchStart = () => {
    return {
        type: actionTypes.TODO_TASK_FETCH_START
    }
}

export const tasksFetchSuccess = tasks => {
    return {
        type: actionTypes.TODO_TASK_FETCH_SUCCESS,
        todoTasks: tasks
    }
}

export const tasksFetchError = err => {
    return {
        type: actionTypes.TODO_TASK_FETCH_ERROR,
        error: err
    }
}

export const tasksFetch = () => {
    return dispatch => {
        dispatch(tasksFetchStart);
        axios.get('/tasks.json')
            .then(res => {
                // setLoading(false);
                const fetchedData = [];
                for (let key of Object.keys(res.data)) {
                    for (let element in res.data[key]) {
                        console.log("Element", element);
                        fetchedData.push({
                            ...res.data[key][element],
                            id: element
                        })
                    }
                }
                dispatch(tasksFetchSuccess(fetchedData));
                console.log("FetchedData length", fetchedData.length);
            })
            .catch(err => {
                dispatch(tasksFetchError(err));
                console.log("Error", err.message);
            });
    }
}

//OnTaskComplete 
export const taskCompleteStart = () => {
    return {
        type: actionTypes.TODO_TASK_COMPLETE_START
    }
}

export const taskCompleteSuccess = (tasks) => {
    return {
        type: actionTypes.TODO_TASK_COMPLETE_SUCCESS,
        todoTasks: tasks
    }
}

export const taskCompleteError = err => {
    return {
        type: actionTypes.TODO_TASK_COMPLETE_ERROR,
        error: err
    }
}

export const taskComplete = (tasks, id) => {
    return dispatch => {
        dispatch(taskCompleteStart());
        const taskIndex = tasks.findIndex(p => p.id === id);
        console.log("taskindex id", taskIndex);
        let isCompleted = tasks[taskIndex].completed;
        const updatedTasks = [...tasks]
        updatedTasks[taskIndex] = {
            ...tasks[taskIndex],
            completed: !isCompleted
        };
        axios.post('/completed.json', updatedTasks[taskIndex])
            .then(res => {
                updatedTasks.splice(taskIndex, 1);   //deleting index
                axios.get('/tasks.json')
                    .then(res => {
                        axios.delete('/tasks/' + Object.keys(res.data)[0] + '/' + id + '.json');
                    })
                dispatch(taskCompleteSuccess(updatedTasks));
            })
            .catch(err => {
                dispatch(taskCompleteError(err));
                console.log(err.message)
            });
    }
}

export const deleteCompletedTaskStart = () => {
    return {
        type: actionTypes.DELETE_COMPLETED_TASK_START,
    }
}

export const deleteCompletedTaskSuccess = tasks => {
    return {
        type: actionTypes.DELETE_COMPLETED_TASK_SUCCESS,
        todoTasks: tasks
    }
}

export const deleteCompletedTaskError = err => {
    return {
        type: actionTypes.DELETE_COMPLETED_TASK_ERROR,
        error: err
    }
}

export const deleteCompletedTask = (tasks, taskId) => {
    return dispatch => {
        dispatch(deleteCompletedTaskStart());
        const taskIndex = tasks.findIndex(p => p.id === taskId);
        let isDeleted = tasks[taskIndex].deleted;
        const updatedTasks = [...tasks]
        updatedTasks[taskIndex] = {
            ...tasks[taskIndex],
            deleted: !isDeleted
        };
        axios.post('/deleted.json', updatedTasks[taskIndex])
            .then(res => {
                updatedTasks.splice(taskIndex, 1);   //deleting index
                axios.get('/tasks.json')
                    .then(res => {
                        console.log("TodoContainer js Res.data.name on complete", Object.keys(res.data)[0]);
                        axios.delete('/tasks/' + Object.keys(res.data)[0] + '/' + taskId + '.json');
                    })
                dispatch(deleteCompletedTaskSuccess(updatedTasks));
            })
            .catch(err => {
                dispatch(deleteCompletedTaskError(err));
                console.log(err.message)
            });
    }
}

export const onSaveTaskStart = () => {
    return {
        type: actionTypes.SAVE_TASKS_START
    }
}

export const onSaveTaskSuccess = (tasks) => {
    return {
        type: actionTypes.SAVE_TASKS_SUCCESS,
        todoTasks: tasks
    }
}

export const onSaveTaskError = err => {
    return {
        type: actionTypes.SAVE_TASKS_ERROR,
        error: err
    }
}

export const onSaveTasks = tasks => {
    const tasksArray = Array.from(tasks);
    return dispatch => {
        dispatch(onSaveTaskStart());
        // uploading data to server
        // setLoading(true);
        axios.delete('/tasks.json');
        axios.post('/tasks.json', [...tasksArray])
            .then(res => {
                dispatch(onSaveTaskSuccess(tasks));
                // setLoading(false);
                console.log(res)
            })
            .catch(err => {
                // setLoading(false);
                // setError(err);
                dispatch(onSaveTaskError(err));
            });
    }
}