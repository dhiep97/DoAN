import { Component } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { UilEstate } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        const { processLogout, userInfo } = this.props;
        return (
            
            <div className="header-container">
                <div className="header-home">
                    <Link to="/home">
                        <UilEstate className="icon"/>
                        <span>Trang chủ</span>
                    </Link>
                </div>
                <div className="languages">
                    <span className="welcome">
                        Xin chào, {userInfo && userInfo.firstName && userInfo.lastName ? userInfo.lastName + ' ' + userInfo.firstName : ''} !
                    </span>
                    
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
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);