import React, { useEffect } from 'react';
import Form from "../../component/form/form";
import Header from '../../component/header/header';
import ListElement from '../../component/list/listElement/ListElement';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios-url';
import Spinner2 from '../../component/UI/Spinner2/Spinner2';
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../store/actions/index';
import './TodoContainer.css';
import { useDispatch, useSelector } from 'react-redux';

const TodoContainer = props => {

    const tasks = useSelector(state => state.todo.tasks);
    const count = useSelector(state => state.todo.count);
    const loading = useSelector(state => state.todo.loading);
    const error = useSelector(state => state.todo.error);

    const dispatch = useDispatch();
    const onTasksFetch = () => dispatch(actions.tasksFetch());
    const onFormStateHandler = (tasks, formState) => dispatch(actions.formStateHandler(tasks, formState));
    const onTasksComplete = (tasks, id) => dispatch(actions.taskComplete(tasks, id));
    const onTasksDelete = (tasks, id) => dispatch(actions.deleteCompletedTask(tasks, id));
    const onTasksSave = (tasks) => dispatch(actions.onSaveTasks(tasks));

    useEffect(() => {
        onTasksFetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formStateHandler = formState => {
        onFormStateHandler(tasks, formState);
    }

    const onTaskCompleteHandler = taskId => {
        onTasksComplete(tasks, taskId);
    }


    const onTaskDeleteHandler = taskId => {
        onTasksDelete(tasks, taskId);
    }

    const onSaveFormHandler = () => {
        // uploading data to server
        // setLoading(true);
        // axios.delete('/tasks.json');
        // axios.post('/tasks.json', [...tasks])
        //     .then(res => {
        //         setLoading(false);
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         setLoading(false);
        //         setError(err);
        //     });
        onTasksSave(tasks);
    }
    console.log("Todocontainer js tasks", tasks);
    const data = Array.from(tasks);
    let listelement = data.map(key => {
        return <ListElement
            key={key.id}
            task={key}
            onComplete={onTaskCompleteHandler}
            onDelete={onTaskDeleteHandler}
        />
    })

    if (loading) {
        listelement = <Spinner2 />
    }

    let errorFound = error ? <p>Error Found</p> : listelement;

    return (
        <Aux>
            <div className="container">
                <Header number={count} />
                {errorFound}
                <Form onFormSubmmit={formStateHandler} onSaveForm={onSaveFormHandler} />
            </div>
        </Aux>
    )
}

export default withErrorHandler(TodoContainer, axios);