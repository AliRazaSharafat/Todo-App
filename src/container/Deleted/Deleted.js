import React, { useEffect } from 'react';
import axios from '../../axios-url';
import DeletedItem from './DeletedItem/DeletedItem';
import Spinner from '../../component/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';
import { useDispatch, useSelector } from 'react-redux';

const Deleted = (props) => {

    const tasks = useSelector(state => state.deleted.tasks);
    const loading = useSelector(state => state.deleted.loading);
    const error = useSelector(state => state.deleted.error);

    const dispatch = useDispatch();
    const onFetchDeletedTasks = () => dispatch(actions.deletedTaskFetch());
    const OnTaskDelete = (tasks, id) => dispatch(actions.initDelete(tasks, id));


    useEffect(() => {
        onFetchDeletedTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onDeletePermanantlyHandler = id => {
        OnTaskDelete(tasks, id);
        console.log('Deleted js container', props.tasks);
    }

    let deletedTasksComponent = Object.keys(tasks).map(key => {
        return <DeletedItem
            key={Math.random}
            singleTask={tasks[key]}
            onDelete={onDeletePermanantlyHandler} />
    })

    if (loading) {
        deletedTasksComponent = <Spinner />
    }

    let errorFound = error ? <p style={{ color: 'white' }}>Error Found</p> : deletedTasksComponent;

    return (
        <div>
            {console.log("Deleted Js container", props.tasks)}
            {errorFound}
        </div>
    )
}

export default (withErrorHandler(Deleted, axios));