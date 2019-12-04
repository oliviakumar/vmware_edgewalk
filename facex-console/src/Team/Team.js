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
        content: ["m_content", "t_content", "o_content", "c_content"]
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
            <div className="Team rpi">
                <RoutedNav/>
                {
                    // style={{backgroundColor: 'black', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}
                }
                <section>
                    <h1 className="title"> TEAM EDGEWALK </h1>

                    <section className="Bios" style={{backgroundColor: 'black'}}>
                        {this.state.names.map((name, i) => {
                            // console.log(name + `.jpg`);
                            return <Bio name={name} imgsrc={name} content={this.state.content[i]}/>;
                        })
                        }

                    </section>
                </section>
            </div>
        );
    }
}

export default Team;
