import React, { Component } from 'react';

import Bio from '../Bio/Bio';
// import FullPost from '../../components/FullPost/FullPost';
// import NewPost from '../../components/NewPost/NewPost';
import './Team.css';
import tanja from '../logos/Tanja.jpg';
import liv from '../logos/Olivia.jpg';
import mushahid from '../logos/Mushahid.jpg';
import chris from '../logos/Chris.jpg';

class Team extends Component {
    state = {
        names: ["Mushahid", "Tanja", "Olivia", "Chris"]
    }
    render () {
        return (
            <div>
                <section style={{backgroundColor: 'black'}}>
                    <h1 className="title"> TEAM EDGEWALK </h1>
                    <section className="Bios">
                        {this.state.names.map(name => {
                            console.log(name + `.jpg`);
                            return <Bio name={name} imgsrc={name}/>;
                        })
                        }

                    </section>
                </section>
{
                // <section>
                //     <FullPost />
                // </section>
                // <section>
                //     <NewPost />
                // </section>
}
            </div>
        );
    }
}

export default Team;
