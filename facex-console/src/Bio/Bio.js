import React from 'react';

import './Bio.css';

const bio = (props) => (
    <article className="Bio">
        <img className="img" src={require(`../logos/${props.name}.jpg`)}></img>
        <h1 className="name">{props.name}</h1>
        <div className="Info">
            <div className="Member">Member</div>
        </div>
    </article>
);

export default bio;
