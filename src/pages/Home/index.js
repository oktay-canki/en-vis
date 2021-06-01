import './styles.css';
import React, { useContext } from 'react';
import MyInput from '../../components/Input';
import Options from '../../components/Options';
import Output from '../../components/Output';
import MyAlert from '../../components/Alert';
import { MainContext } from '../../contexts/MainContext';

const HomePage = () => {

    const { result, output } = useContext(MainContext);

    return (
        <div className="my-container">
            {
                result && <MyAlert />
            }
            <MyInput />
            <Options />
            <Output
                array={output} />
            <div id="results">
                {
                    result
                }
            </div>
        </div>
    )
}

export default HomePage;