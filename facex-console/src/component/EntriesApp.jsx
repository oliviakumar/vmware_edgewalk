import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListEntriesComponent from './ListEntriesComponent.jsx';
import EntryComponent from './EntryComponent';

class EntriesApp extends Component {
    render() {
        return (
            <Router>
                    <h1> Application</h1>
                    <Switch>
                        <Route path="/" exact component={ListEntriesComponent} />
                        <Route path="/entries" exact component={ListEntriesComponent} />
                        <Route path="/entries/:id" component={EntryComponent} />
                    </Switch>
            </Router>
        )
    }
}

export default EntriesApp;