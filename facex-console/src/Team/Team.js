import React, { Component } from 'react';

import Bio from '../Bio/Bio';
// import FullPost from '../../components/FullPost/FullPost';
// import NewPost from '../../components/NewPost/NewPost';
import './Team.css';

class Team extends Component {
    state = {
        names: ["Mushahid", "Tanja", "Olivia", "Chris"]
    }
    render () {
        return (
            <div>
                <section className="Bios">
                    {this.state.names.map(name => {
                        return <Bio name={name}/>;
                    })
                    }

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
