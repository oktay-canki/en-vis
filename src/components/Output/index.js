import './styles.css';
import React from 'react';

const Output = ({ array, title, type }) => {

    return (
        array.length ? (
            <div className="col-10 bg-dark out-container">
                <h5>{ title ? (title) : ('Output') } </h5>
                {
                    array.map((val) => {
                        if(val === 'break'){
                            return (
                                <div className="col-12 my-break"></div>
                            );
                        }
                        else if(type === 'pill'){
                            return (
                                <label className="my-pill"> { val } </label>
                            )
                        }
                        
                        return val;
                    })
                }
            </div>
        ) : (null)
    )
}

export default Output;