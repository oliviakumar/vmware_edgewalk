import React, { Component } from 'react';
import axios from 'axios';

import Bio from '../Bio/Bio';
// import FullPost from '../../components/FullPost/FullPost';
// import NewPost from '../../components/NewPost/NewPost';
import './Team.css';
import tanja from '../logos/Tanja.jpg';
import liv from '../logos/Olivia.jpg';
import mushahid from '../logos/Mushahid.jpg';
import chris from '../logos/Chris.jpg';
import RoutedNav from '../RoutedNav/RoutedNav';

class Team extends Component {
    state = {
        names: ["Mushahid", "Tanja", "Olivia", "Chris"],
        content: []
    }

    componentDidMount() {
        document.getElementById('banner').style.display = "none"
        const posts = axios.get('http://localhost:8080/content')
            .then(response => {
                // this.setState({content: response.data});
                {
                // console.log(`response:`, response.data.getElementById('content'));
                console.log(`response:`, JSON.stringify(response.data));
                }
            }

        );

    }
    render () {
        // const content = this.state.content.map(c => {
        //     return <Bio name={c}/>
        // })
        return (
            <div className="Team">
                <RoutedNav/>
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
            </div>
        );
    }
}

export default Team;
