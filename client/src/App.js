import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIsAuthenticated, userIsNotAuthenticated } from './components/IntlProviderWrapper/authentication';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import { history } from './redux'
import Home from './pages/Home/Home';
import System from './pages/System/System';
import DetailDoctor from './components/DetailDoctor/DetailDoctor';
import HomePage from './components/HomePage/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Doctor from './pages/Doctor/Doctor';
import DetailSpecialty from './components/DetailSpecialty/DetailSpecialty';
import DetailMedicalFacility from './components/DetailMedicalFacility/DetailMedicalFacility';
class App extends Component {
    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    }

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Router history={history}>
                <div className="main-container">
                    <div className="content-container">
                        <Switch>
                            <Route path='/' exact component={(Home)} />
                            <Route path='/home' exact component={(HomePage)} />
                            <Route path='/login' component={userIsNotAuthenticated(Auth)} />
                            <Route path='/system' component={userIsAuthenticated(System)} />
                            <Route path='/doctor' component={userIsAuthenticated(Doctor)} />
                            <Route path='/detail-doctor/:id' component={(DetailDoctor)} />
                            <Route path='/detail-specialty' component={(DetailSpecialty)} />
                            <Route path='/detail-medical-facility' component={(DetailMedicalFacility)} />
                        </Switch>
                    </div>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme='dark'
                    />
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