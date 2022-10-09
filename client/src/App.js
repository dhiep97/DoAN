import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
class App extends Component {

    render() {
        return (
            <Router>
                <div className="main-container">
                    <div className="content-container">
                        <Switch>
                            <Route path="/login" exact component={Auth} /> 
                            <Route path="/home" exact component={Home} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;