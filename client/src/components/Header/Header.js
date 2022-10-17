import React, { Component } from 'react';
import connect from 'react-redux';
import './Header.scss';
import logo from '../../assets/Logo/logo.png';

class Header extends Component {

    render() {
        return (
            <React.Fragment>
                <div className="header-container">
                    <div className="header-content">
                        <div className="left-content">
                            <img className="header-logo" src={logo} alt=""/>
                        </div>
                        <div className="right-content">
                            <button className="logout">
                                
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => { //redux
    return {
        language: state.app.language,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
