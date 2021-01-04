import React, { useState } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import './form.css';

const FormComponent = props => {
    const [inputValue, setInputValue] = useState([]);

    const inputChangeHandler = event => {
        let inputValue = "";
        inputValue = event.target.value;
        setInputValue(inputValue);
    }
    const formSubmmit = event => {
        event.preventDefault();
        props.onFormSubmmit(inputValue);
        setInputValue([]);
    }

    return (
        <Aux>
            <div className="form-container">
                <form className="form" onSubmit={formSubmmit}>
                    <input className="input" value={inputValue} type="text" placeholder="Enter Todo Task"
                        onChange={inputChangeHandler} />
                    <Tooltip title="Submit">
                        <input type="submit" disabled={inputValue.length ? 0 : 1} className="button" value="SUBMIT"
                            onClick={formSubmmit} />
                    </Tooltip>
                </form>
            </div>
            <Tooltip title="Upload">
                <Button className="save" onClick={props.onSaveForm}>
                    <CloudUploadIcon fontSize="large" />
                </Button>
            </Tooltip>
        </Aux>
    )
}

export default FormComponent;