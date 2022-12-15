import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userIsAuthenticated, userIsNotAuthenticated } from './components/IntlProviderWrapper/authentication';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import { history } from './redux'
import Home from './pages/Home/Home';
import System from './pages/System/System';
import DetailDoctor from './components/DetailDoctor/DetailDoctor/DetailDoctor';
import HomePage from './components/HomePage/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Doctor from './pages/Doctor/Doctor';
import DetailSpecialty from './components/DetailSpecialty/DetailSpecialty';
import DetailClinic from './components/DetailClinic/DetailClinic';
import VerifyEmail from './components/DetailDoctor/VerifyEmail/VerifyEmail';
import DetailHandbook from './components/DetailHandbook/DetailHandbook';
import MoreSpecialty from './components/HomePage/Search/MoreSpecialty';
import MoreClinic from './components/HomePage/Search/MoreClinic';
import MoreDoctor from './components/HomePage/Search/MoreDoctor';
import MoreHandbook from './components/HomePage/Search/MoreHandbook';
import PrivacyPolicy from './components/HomePage/Support/PrivacyPolicy';
import TermsOfUse from './components/HomePage/Support/TermsOfUse';
import Support from './components/HomePage/Support/Support';

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
                <Switch>
                    <Route path='/' exact component={(Home)} />
                    <Route path='/home' exact component={(HomePage)} />
                    <Route path='/login' component={userIsNotAuthenticated(Auth)} />
                    <Route path='/system' component={userIsAuthenticated(System)} />
                    <Route path='/doctor' component={userIsAuthenticated(Doctor)} />
                    <Route path='/detail-doctor/:id' component={(DetailDoctor)} />
                    <Route path='/detail-specialty/:id' component={(DetailSpecialty)} />
                    <Route path='/detail-medical-facility/:id' component={(DetailClinic)} />
                    <Route path='/detail-handbook/:id' component={(DetailHandbook)} />
                    <Route path='/verify-booking' component={(VerifyEmail)} />
                    <Route path='/more-specialty' component={(MoreSpecialty)} />
                    <Route path='/more-doctor' component={(MoreDoctor)} />
                    <Route path='/more-clinic' component={(MoreClinic)} />
                    <Route path='/more-handbook' component={(MoreHandbook)} />
                    <Route path='/privacy-policy' component={(PrivacyPolicy)} />
                    <Route path='/terms-of-use' component={(TermsOfUse)} />
                    <Route path='/support' component={(Support)} />
                </Switch>
                <ToastContainer
                    position="bottom-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='dark'
                />
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