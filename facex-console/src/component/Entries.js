import React from 'react';
import Toggle from './Toggle';

const Entries = ({entries, viewDetail}) => {
    const entriesList = entries.length ? (
        entries.map(entry => {
            return (
                <div className="collection-item" key={entry.id}>
                    <span onClick={() => {viewDetail(entry.id)}}></span>
                    <Toggle details={entry.content}/>
                </div>
            )
        })
    ) : (
        <p className="center"> No entries yet </p>
    );
    return (
        <div className="entries collection">
            {entriesList}
        </div>
    )
}

export default Entries;
{
// <button onClick={() => console.log("clicked")}> view details </button>
}