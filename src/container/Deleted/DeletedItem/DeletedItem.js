import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from "@material-ui/core/Tooltip";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import './DeletedItem.css';

const DeletedItem = props => {
    return (
        <div className="deleteItemContainer">
            <p>Description: <span>{props.singleTask.desc}</span></p>
            <Tooltip title="Delete Permanantly" arrow>
                <Button className="Delete_Delete_Permanantly" onClick={() => props.onDelete(props.singleTask.id)}>
                    <DeleteForeverIcon fontSize="large"/>
                </Button>
            </Tooltip>
        </div>
    )
}

export default DeletedItem;