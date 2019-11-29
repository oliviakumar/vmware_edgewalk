import React from 'react';

const routednav = (props) => (
    <header style={{backgroundColor: 'lavender', opacity: '.7'}}>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/team">Team Edgewalk</a></li>
                <li><a href="/about">Project FaceX</a></li>
                <li><a href="/logs">Security Logs</a></li>
            </ul>
        </nav>
    </header>
);

export default routednav;
