import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../components/System/Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../../components/System/Schedule/ManageSchedule';
import './Doctor.scss'
import SidebarDoctor from '../../components/System/Sidebar/SidebarDoctor';
import Sidebar from '../../components/System/Sidebar/Sidebar';
import ManagePatient from '../../components/Doctor/ManagePatient/ManagePatient'

class Doctor extends Component {

    componentDidMount() {
        
    }

    render() {
        const { userInfo, isLoggedIn } = this.props;
    
        return (
            <div className="doctor-container">
                <Router>
                    <div className="doctor-sidebar">
                    {userInfo.roleId === 'R2' ?
                            <SidebarDoctor /> : <Sidebar/>
                        }
                    </div>
                    <div className="doctor-router">
                        <Header/>
                        <Switch>
                            <Route path='/doctor/schedule-manage' component={(ManageSchedule)} />
                            <Route path='/doctor/patient-manage' component={(ManagePatient)} />
                        </Switch>
                    </div>
                </Router>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
