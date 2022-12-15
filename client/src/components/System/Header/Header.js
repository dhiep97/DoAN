import { Component } from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { UilSearch } from '@iconscout/react-unicons';

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
                <div className="header-search">
                    <input type="text" placeholder="Search..." />
                    <UilSearch />
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