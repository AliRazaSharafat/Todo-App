import React from 'react';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import './CompletedItem.css';

const CompletedItem = props => {


    return (
        <div className="completeItemContainer">
            <p><b>Task Description</b>: <span>{props.singleTask.desc}</span></p>
            <Tooltip title="Delete Permanantly" arrow>
                <Button className="Complete_Delete_Permanantly"
                    onClick={() => props.onDelete(props.singleTask.id)}>
                    <Delete fontSize="large"/>
                </Button>
            </Tooltip>
        </div>
    )
}

export default CompletedItem;