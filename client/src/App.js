import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIsAuthenticated, userIsNotAuthenticated } from './components/IntlProviderWrapper/authentication';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import { history } from './redux'
import Home from './pages/Home/Home';
import System from './pages/System/System'
class App extends Component {

    render() {
        return (
            <Router history={history}>
                <div className="main-container">
                    <div className="content-container">
                        <Switch>
                            <Route path='/' exact component={(Home)} />
                            <Route path='/login' component={userIsNotAuthenticated(Auth)} />
                            <Route path='/system' component={userIsAuthenticated(System)} />
                        </Switch>
                    </div>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);