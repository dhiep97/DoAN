import { Component } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { NavLink } from 'react-router-dom';


class Header extends Component {
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* navigation */}
                <div className="navigation">
                    <NavLink activeClassName="active" to="/system" exact>Quản trị</NavLink>
                    <NavLink activeClassName="active" to="/system/user-manage">Quản lý người dùng</NavLink>
                    <NavLink activeClassName="active" to="/system/doctor-manage">Quản lý bác sĩ</NavLink>
                    <NavLink activeClassName="active" to="/system/specialty-manage">Quản lý chuyên khoa</NavLink>
                    <NavLink activeClassName="active" to="/system/clinic-manage">Quản lý phòng khám</NavLink>
                    <NavLink activeClassName="active" to="/system/handbook-manage">Quản lý bài viết</NavLink>
                </div>
                {/* language && logout */}
                <div className="languages">
                    <span className="welcome">
                        Xin chào,
                        {userInfo && userInfo.firstName && userInfo.lastName ? userInfo.firstName + ' ' + userInfo.lastName :''} !
                    </span>
                    <span className="language-vi">VN</span>
                    <span className="language-en">EN</span>
                    
                    <div className="btn-logout" onClick={processLogout} title="Log out">
                        <i className="fa fa-sign-out-alt"></i>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);