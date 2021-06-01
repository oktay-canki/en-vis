import './styles.css';
import React from 'react';

const Table = ({ table, title }) => {

    return (
        table ? (
            <div className="col-10 row bg-dark tbl-container">
                <h5> { title } </h5>
                {
                    Object.keys(table).map((key) => {
                        return (
                            <div key={key} className="text-center col-4 col-sm-3 col-md-2 col-lg-1">
                                { key + " : " + table[key]}
                            </div>
                        )
                    })
                }
            </div>
        ) : (null)
    )
}

export default Table;