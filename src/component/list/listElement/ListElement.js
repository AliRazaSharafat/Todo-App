import React from 'react';
import DoneIcon from '@material-ui/icons/Done';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import './ListElement.css';

const ListElement = props => {
    console.log(props.task);

    return (
        <div className="ListElement">
            <div className="desc">
                <p>{props.task.desc}</p>
            </div>
            <div className="ButtonContainer">
                <Tooltip title="Complete Task" arrow>
                    <Button className="Complete_Task" onClick={() => props.onComplete(props.task.id)}>
                        <DoneIcon fontSize="large"/>
                    </Button>
                </Tooltip>
                <Tooltip title="Delete Task" arrow>
                    <Button className="Delete_Task" onClick={() => props.onDelete(props.task.id)}>
                        <DeleteOutlineIcon fontSize="large"/>
                    </Button>
                </Tooltip>
            </div>
        </div>
    )
}

export default ListElement;