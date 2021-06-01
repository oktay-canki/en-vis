import './styles.css';
import React, { useContext } from 'react';
import { MainContext } from '../../contexts/MainContext';

const Options = () => {

    const { encType, setEncType, act } = useContext(MainContext);

    return (
        <div className="col-10 bg-dark opt-container">
            <h5 className="col-12">Options</h5>
            <div className="row">
                <div className="col-12 col-lg-6 inp-row">
                    <label className="desc-label"> Type </label>
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        {encType ? (encType) : ('Choose A Type')}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                        <li><button className="dropdown-item" type="button"
                            onClick={() => { setEncType('The Shift Cipher') }}>The Shift Cipher</button></li>
                        <li><button className="dropdown-item" type="button"
                            onClick={() => { setEncType('The Substitution Cipher') }}>The Substitution Cipher</button></li>
                        <li><button className="dropdown-item" type="button"
                            onClick={() => { setEncType('The Affine Cipher') }}>The Affine Cipher</button></li>
                        <li><button className="dropdown-item" type="button"
                            onClick={() => { setEncType('The Vigenere Cipher') }}>The Vigenere Cipher</button></li>
                        <li><button className="dropdown-item" type="button"
                            onClick={() => { setEncType('The Hill Cipher') }}>The Hill Cipher</button></li>
                        <li><button className="dropdown-item" type="button"
                            onClick={() => { setEncType('The Permutation Cipher') }}>The Permutation Cipher</button></li>
                        <li><button className="dropdown-item" type="button"
                            onClick={() => { setEncType('The Stream Cipher') }}>The Stream Cipher</button></li>
                    </ul>
                </div>
                <div className="col-12 col-lg-6 inp-row">
                    <button className="btn btn-md btn-success btn-act"
                        onClick={() => act('enc')}>Encrypt</button>
                    <button className="btn btn-md btn-danger btn-act"
                        onClick={() => act('dec')}>Decrypt</button>
                </div>
            </div>
        </div>
    )
}

export default Options;