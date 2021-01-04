import * as actionTypes from './actionTypes';
import axios from '../../axios-url';


//On deleted container js component mounted
export const completedTaskFetchStart = () => {
    return {
        type: actionTypes.TASK_COMPLETE_FETCH_START
    }
}

export const completedTaskFetchSuccess = tasks => {
    return {
        type: actionTypes.TASK_COMPLETE_FETCH_SUCCESS,
        completedTasks: tasks
    }
}

export const completedTaskFetchError = err => {
    return {
        type: actionTypes.TASK_COMPLETE_FETCH_ERROR,
        error: err
    }
}

export const completedTaskFetch = () => {
    return dispatch => {
        dispatch(completedTaskFetchStart);
        axios.get('/completed.json')
            .then(res => {
                const fetchedData = [];
                for (let key of Object.keys(res.data)) {
                    console.log("Id", key);
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    })
                    dispatch(completedTaskFetchSuccess(fetchedData));
                    console.log("fetcted data", fetchedData);
                }
            })
            .catch(err => {
                dispatch(completedTaskFetchError(err));
                console.log("Error", err);
            });
    }
}


//On delete a task from deleted container js component
export const taskCompleteStart = () => {
    return {
        type: actionTypes.TASK_COMPLETE_START,
    }
}

export const taskCompleteSuccess = updatedTasks => {
    return {
        type: actionTypes.TASK_COMPLETE_SUCCESS,
        tasks: updatedTasks
    }
}

export const taskCompleteError = error => {
    return {
        type: actionTypes.TASK_COMPLETE_ERROR,
        err: error
    }
}

export const initComplete = (tasks, id) => {
    return dispatch => {
        dispatch(taskCompleteStart());
        const taskIndex = tasks.findIndex(task => task.id === id);
        console.log("Completed action", id);
        console.log("Completed action task[id]", tasks[0].id);
        console.log("Deleted js taskIndex", taskIndex);
        const updatedTasks = [...tasks];
        axios.delete('/completed/' + id + '.json')
            .then(res => {
                updatedTasks.splice(taskIndex, 1);
                console.log("Deleted js tasks", tasks);
                dispatch(taskCompleteSuccess(updatedTasks));
            })
            .catch(err => {
                dispatch(taskCompleteError(err));
                console.log(err.message);
            })
    }
}