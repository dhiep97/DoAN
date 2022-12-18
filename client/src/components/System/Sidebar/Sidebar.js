import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Sidebar.scss';
import * as actions from "../../../store/actions";
import { Link } from 'react-router-dom';
import { UilDashboard, UilUser, UilUserMd, UilSchedule, UilClipboardAlt, UilHospital, UilNewspaper, UilSignOutAlt } from '@iconscout/react-unicons';
import logo from '../../../assets/Logo/logo.svg';
class Sidebar extends Component {

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
        const { processLogout } = this.props;
        return (
            <div className="sidebar-container">
                <div className="sidebar-top">
                    <Link to="/system/dashboard" style={{ textDecoration: "none" }}>
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="sidebar-center">
                    <ul>
                        <p className='title'>Hệ thống</p>
                        <Link to="/system/dashboard" style={{ textDecoration: "none" }}>
                            <li>
                                <UilDashboard className="icon" />
                                <span>Tổng hợp</span>
                            </li>
                        </Link>
                        <p className='title'>Quản lý</p>
                        <Link to="/system/user-manage" style={{ textDecoration: "none" }}>
                            <li>
                                <UilUser className="icon" />
                                <span>Người dùng</span>
                            </li>
                        </Link>
                        <Link to="/system/doctor-manage" style={{ textDecoration: "none" }}>
                            <li>
                                <UilUserMd className="icon" />
                                <span>Bác sĩ</span>
                            </li>
                        </Link>
                        <Link to="/system/schedule-manage" style={{ textDecoration: "none" }}>
                            <li>
                                <UilSchedule className="icon" />
                                <span>Kế hoạch khám bệnh</span>
                            </li>
                        </Link>
                        <Link to="/system/specialty-manage" style={{ textDecoration: "none" }}>
                            <li>
                                <UilClipboardAlt className="icon" />
                                <span>Chuyên khoa</span>
                            </li>
                        </Link>
                        <Link to="/system/clinic-manage" style={{ textDecoration: "none" }}>
                            <li>
                                <UilHospital className="icon" />
                                <span>Phòng khám</span>
                            </li>
                        </Link>
                        <Link to="/system/handbook-manage" style={{ textDecoration: "none" }}>
                            <li>
                                <UilNewspaper className="icon" />
                                <span>Cẩm nang</span>
                            </li>
                        </Link>
                        <Link to="/system/users-manage" style={{ textDecoration: "none" }}>
                            <li>
                                <UilNewspaper className="icon" />
                                <span>Test</span>
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
        
    };
};


const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);