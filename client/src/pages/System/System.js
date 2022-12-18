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
import ManageSchedule from '../../components/System/Schedule/ManageSchedule';
import Dashboard from '../../components/System/Dashboard/Dashboard';
import Sidebar from '../../components/System/Sidebar/Sidebar';
import SidebarDoctor from '../../components/System/Sidebar/SidebarDoctor';
import AddUserManage from '../../components/System/AddUser/AddUser'
import UserManager from '../../components/System/Users/ManageUser'

class System extends Component {

    componentDidMount() {
        
    }

    render() {
        let { userInfo } = this.props;
        return (
            
            <div className="system-container">
                <Router>
                    <div className="system-sidebar">
                        {userInfo.roleId === 'R1' ?
                            <Sidebar /> :  <SidebarDoctor />
                        }
                    </div>
                    <div className="system-router">
                        <Header/>
                        <Switch>
                            {/* <Route path='/home' component={props => <HomePage {...props} />} /> */}
                            <Route path='/system/dashboard' component={(Dashboard)} />
                            <Route path='/system/user-manage' component={(ManagerUser)} />
                            <Route path='/system/doctor-manage' component={(ManagerDoctor)} />
                            <Route path='/system/clinic-manage' component={(ManagerClinic)} />
                            <Route path='/system/handbook-manage' component={(ManagerHandbook)} />
                            <Route path='/system/specialty-manage' component={(ManagerSpecialty)} />
                            <Route path='/system/schedule-manage' component={(ManageSchedule)} />
                            <Route path='/system/add-user-manage' component={(AddUserManage)} />
                            <Route path='/system/users-manage' component={(UserManager)} />
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
