import './styles.css';
import React, { useContext } from 'react';
import { MainContext } from '../../contexts/MainContext';

const Input = () => {

    const { text, setText, setResult, setOutput } = useContext(MainContext);

    const clear = () => {
        setText('');
        setResult(null);
        setOutput([]);
        let element = document.getElementById('inputText');
        element.value = '';
    }

    return (
        <div className="col-10 bg-dark input-container">
            <label htmlFor="inputText" className="form-label">Text To Encrypt</label>
            <textarea
                className="form-control input-text no-shadow"
                id="inputText"
                aria-describedby="inputTextDesc"
                cols={4}
                onChange={(e) => setText(e.target.value)}
                value={text}>
                
            </textarea>
            <div id="inputTextDesc" className="input-footer">
                <label>Enter the text you want to encrypt</label>
                <button className="btn btn-sm btn-danger btn-clear"
                    onClick={clear}>Clear</button>
            </div>
        </div>
    )
}

export default Input;