import { Component } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { NavLink } from 'react-router-dom';
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            
            <div className="header-container">
                {/* navigation */}
                
                <div className="navigation">
                    <NavLink activeClassName="active" to="/home" exact >
                        <i className="fas fa-home"></i>
                    </NavLink>
                    <NavLink activeClassName="active" to="/system" exact>Quản trị</NavLink>
                    <NavLink activeClassName="active" to="/system/user-manage">Quản lý người dùng</NavLink>
                    <NavLink activeClassName="active" to="/system/doctor-manage">Quản lý bác sĩ</NavLink>
                    <NavLink activeClassName="active" to="/doctor/schedule-manage">Kế hoạch khám bệnh</NavLink>
                    <NavLink activeClassName="active" to="/system/specialty-manage">Chuyên khoa</NavLink>
                    <NavLink activeClassName="active" to="/system/clinic-manage">Phòng khám</NavLink>
                    <NavLink activeClassName="active" to="/system/handbook-manage">Cẩm nang</NavLink>
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