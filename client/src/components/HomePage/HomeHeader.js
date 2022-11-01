import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/Logo/logo.png';
import hospital from '../../assets/Header/hospital.png';
import mobile from '../../assets/Header/mobile.png';
import examination from '../../assets/Header/examination.png';
import test from '../../assets/Header/test.png';
import mentalHealth from '../../assets/Header/mental-health.png';
import dental from '../../assets/Header/dental.png';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import {Link} from 'react-router-dom'
class HomeHeader extends Component {

    changeLanguage = (language) => {
        //actions
        this.props.changeLanguageAppRedux(language);
    }

    render() {
        let language = this.props.language;

        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <Link to="/home">
                                <img className="header-logo" src={logo} alt="" />
                            </Link>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id="home-header.specialty" /></b>
                                </div>
                                <div className="subs-title"><FormattedMessage id="home-header.search-doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id="home-header.health-facility" /></b>
                                </div>
                                <div className="subs-title"><FormattedMessage id="home-header.select-room" /></div>
                            </div>
                            <div className="child-content">
                                    <div>
                                        <b><FormattedMessage id="home-header.doctor" /></b>
                                    </div>
                                    <div className="subs-title"><FormattedMessage id="home-header.select-doctor" /></div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b><FormattedMessage id="home-header.fee" /></b>
                                </div>
                                <div className="subs-title"><FormattedMessage id="home-header.check-health" /></div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="home-header.support" />
                            </div>
                            <div className={language === LANGUAGES.VI ? "language-vi active" : "language-vi"}>
                                <span onClick= {() =>this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? "language-en active" : "language-en"}>
                                <span onClick= {() =>this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                        </div>
                    </div>                
                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1"><FormattedMessage id="banner.title1" /></div>
                            <div className="title2"><FormattedMessage id="banner.title2" /></div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child"><img src={hospital} alt="" /></div>
                                    <div className="text-child"><FormattedMessage id="banner.specialized-examination" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><img src={mobile} alt="" /></div>
                                    <div className="text-child"><FormattedMessage id="banner.remote-examination" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><img src={examination} alt="" /></div>
                                    <div className="text-child"><FormattedMessage id="banner.general-examination" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><img src={test} alt="" /></div>
                                    <div className="text-child"><FormattedMessage id="banner.medical-test" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><img src={mentalHealth} alt="" /></div>
                                    <div className="text-child"><FormattedMessage id="banner.mental-health" /></div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><img src={dental} alt="" /></div>
                                    <div className="text-child"><FormattedMessage id="banner.dental-examination" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}

//chuyen redux vao component
const mapStateToProps = state => { //redux
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};


const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
