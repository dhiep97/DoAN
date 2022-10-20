import React, { Component } from 'react';
import './System.scss';
import { connect } from "react-redux";
import Header from '../../components/System/Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ManagerUser from '../../components/System/User/ManagerUser';
import ManagerClinic from '../../components/System/Clinic/ManagerClinic';
import ManagerDoctor from '../../components/System/Doctor/ManagerDoctor';
import ManagerHandbook from '../../components/System/HandBook/ManagerHandbook';
import ManagerSpecialty from '../../components/System/Specialty/ManagerSpecialty';


class System extends Component {
    render() {
        
    
        return (
            <Router>
                <Header />
                <Switch>
                    <Route path='/system/user-manage' component={(ManagerUser)} />
                    <Route path='/system/doctor-manage' component={(ManagerDoctor)} />
                    <Route path='/system/clinic-manage' component={(ManagerClinic)} />
                    <Route path='/system/handbook-manage' component={(ManagerHandbook)} />
                    <Route path='/system/specialty-manage' component={(ManagerSpecialty)} />
                </Switch>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
