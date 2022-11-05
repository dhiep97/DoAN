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
import HomePage from '../../components/HomePage/HomePage';
import ManageSchedule from '../../components/System/Schedule/ManageSchedule';
import _ from 'lodash';
class System extends Component {

    componentDidMount() {
        
    }

    render() {
        const { userInfo, isLoggedIn } = this.props;
    
        return (
            <>
                <Router>
                    {isLoggedIn && <Header />}
                    <Switch>
                        {this.props.userInfo.roleId === 'R1' ?
                            <>
                                <Route path='/home' component={props => <HomePage {...props} />} />
                                <Route path='/system/user-manage' component={(ManagerUser)} />
                                <Route path='/system/doctor-manage' component={(ManagerDoctor)} />
                                <Route path='/system/clinic-manage' component={(ManagerClinic)} />
                                <Route path='/system/handbook-manage' component={(ManagerHandbook)} />
                                <Route path='/system/specialty-manage' component={(ManagerSpecialty)} />
                                <Route path='/doctor/schedule-manage' component={(ManageSchedule)} />
                            </>
                            : <Route path='/home' component={props => <HomePage {...props} />} />
                                || this.props.userInfo.roleId === 'R2' ?
                            <>
                                <Route path='/home' component={props => <HomePage {...props} />} />
                                <Route path='/doctor/schedule-manage' component={(ManageSchedule)} />
                            </> : ''
                        }
                    </Switch>
                </Router>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
