import * as actionTypes from './actionTypes';
import axios from '../../axios-url';


//On deleted container js component mounted
export const deletedTaskFetchStart = () => {
    return {
        type: actionTypes.TASK_DELETE_FETCH_START
    }
}

export const deletedTaskFetchSuccess = tasks => {
    return {
        type: actionTypes.TASK_DELETE_FETCH_SUCCESS,
        deletedTasks: tasks
    }
}

export const deletedTaskFetchError = err => {
    return {
        type: actionTypes.TASK_DELETE_FETCH_ERROR,
        error: err
    }
}

export const deletedTaskFetch = () => {
    return dispatch => {
        dispatch(deletedTaskFetchStart());
        // setLoading(true);
        axios.get('/deleted.json')
            .then(res => {
                // setLoading(false);
                const fetchedData = [];
                for (let key of Object.keys(res.data)) {
                    fetchedData.push({
                        ...res.data[key],
                        id: key
                    })
                }
                // setTasks([...fetchedData]);
                dispatch(deletedTaskFetchSuccess(fetchedData));
            })
            .catch(err => {
                // setLoading(false);
                // setError(err);
                dispatch(deletedTaskFetchError(err));
                console.log("Error", err);
            });
    }
}


//On delete a task from deleted container js component
export const taskDeleteStart = () => {
    return {
        type: actionTypes.TASK_DELETE_START,
    }
}

export const taskDeleteSuccess = updatedTasks => {
    return {
        type: actionTypes.TASK_DELETE_SUCCESS,
        tasks: updatedTasks
    }
}

export const taskDeleteError = error => {
    return {
        type: actionTypes.TASK_DELETE_ERROR,
        err: error
    }
}

export const initDelete = (tasks, id) => {
    return dispatch => {
        dispatch(taskDeleteStart());
        const taskIndex = tasks.findIndex(task => task.id === id);
        console.log("Deleted js taskIndex", taskIndex);
        const updatedTasks = [...tasks];
        axios.delete('/deleted/' + id + '.json')
            .then(res => {
                // setLoading(false);
                updatedTasks.splice(taskIndex, 1);
                // setTasks([...updatedTasks]);
                console.log("Deleted js tasks", tasks);
                dispatch(taskDeleteSuccess(updatedTasks));
            })
            .catch(err => {
                // setLoading(false);
                // setError(err);
                dispatch(taskDeleteError(err));
                console.log(err.message);
            })
    }
}