import React from 'react';

import './NoData.css';

const nodata = (props) => (
    <article className="NoData">
        <h1 className="name">{props.name}</h1>
            <div className="Member Info">No Data</div>
    </article>
);

export default nodata;
