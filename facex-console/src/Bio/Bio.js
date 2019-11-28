import React from 'react';

import './Bio.css';

const bio = (props) => (
    <article className="Bio">
        <h1>{props.name}</h1>
        <div className="Info">
            <div className="Member">Member</div>
        </div>
    </article>
);

export default bio;
