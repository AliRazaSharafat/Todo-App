import React, { useEffect } from 'react';
import axios from '../../axios-url';
import CompletedItem from './CompletedItem/CompletedItem';
import Spinner from '../../component/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';

const Completed = props => {

    const tasks = useSelector(state => state.completed.tasks);
    const loading = useSelector(state => state.completed.loading);
    const error = useSelector(state => state.completed.error);

    const dispatch = useDispatch();
    const onCompletedTasksFetch = () => dispatch(actions.completedTaskFetch());
    const onDeleteCompletedTask = (tasks, id) => dispatch(actions.initComplete(tasks, id));

    useEffect(() => {
        onCompletedTasksFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDeletePermanantlyHandler = id => {
        onDeleteCompletedTask(tasks, id);
        console.log("Completed js ondelete id", id);
    }

    let completedTasksComponent = Object.keys(tasks).map(key => {
        return <CompletedItem key={key}
            singleTask={tasks[key]}
            onDelete={onDeletePermanantlyHandler} />
    })

    if (loading) {
        completedTasksComponent = <Spinner />
    }

    let errorFoundOrNot = error ? <p style={{ color: 'white' }}>Error Found</p> : completedTasksComponent

    return (
        <div>
            {console.log("Completed js container")}
            {errorFoundOrNot}
        </div>
    )
}

export default withErrorHandler(Completed, axios);