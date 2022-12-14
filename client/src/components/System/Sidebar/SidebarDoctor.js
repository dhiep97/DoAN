import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Sidebar.scss';
import * as actions from "../../../store/actions";
import { Link } from 'react-router-dom';
import { UilAccessibleIconAlt,  UilSchedule, UilSignOutAlt } from '@iconscout/react-unicons';
import logo from '../../../assets/Logo/logo.svg';
class SidebarDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        const { processLogout, userInfo } = this.props;
        let imageBase64 = new Buffer.from(userInfo.image, 'base64').toString('binary');
        return (
            <div className="sidebar-container">
                <div className="sidebar-top">
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="sidebar-image">
                    <img src="" alt="" 
                        style={{ backgroundImage: `url(${imageBase64})` }}
                    />
                    <div className="fullName">{userInfo && userInfo.firstName && userInfo.lastName ? userInfo.lastName + ' ' + userInfo.firstName : ''}</div>
                </div>
                <div className="sidebar-center">
                    <ul>
                        {/* <p className='title'>Hệ thống</p>
                        <Link to="/system/dashboard" style={{ textDecoration: "none" }}>
                            <li>
                                <UilDashboard className="icon" />
                                <span>Tổng hợp</span>
                            </li>
                        </Link> */}
                        <p className='title'>Quản lý</p>
                        <Link to="/doctor/schedule-manage" style={{ textDecoration: "none" }}>
                            <li>
                                <UilSchedule className="icon" />
                                <span>Tạo lịch khám bệnh</span>
                            </li>
                        </Link>
                        <Link to="/doctor/patient-manage" style={{ textDecoration: "none" }}>
                            <li>
                                <UilAccessibleIconAlt className="icon" />
                                <span>Bệnh nhân khám bệnh</span>
                            </li>
                        </Link>
                        <Link to="" style={{ textDecoration: "none" }}>
                            <li onClick={processLogout} title="Log out">
                                <UilSignOutAlt className="icon" />
                                <span>Đăng xuất</span>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => { //redux
    return {
        userInfo: state.user.userInfo
    };
};


const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarDoctor);