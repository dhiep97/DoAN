import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/Logo/logo.svg';
import hospital from '../../assets/Header/hospital.png';
import mobile from '../../assets/Header/mobile.png';
import examination from '../../assets/Header/examination.png';
import test from '../../assets/Header/test.png';
import mentalHealth from '../../assets/Header/mental-health.png';
import dental from '../../assets/Header/dental.png';
import { Link } from 'react-router-dom';

class HomeHeader extends Component {
    render() {
        return (
            <>
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
                                <Link to="/more-specialty">
                                    <div>
                                        <b>Chuyên khoa</b>
                                    </div>
                                    <div className="subs-title">Tìm bác sĩ chuyên khoa</div>
                                </Link>
                            </div>
                            <div className="child-content">
                                <Link to="/more-clinic">
                                    <div>
                                        <b>Cơ sở y tế</b>
                                    </div>
                                    <div className="subs-title">Chọn phòng khám</div>
                                </Link>
                            </div>
                            <div className="child-content">
                                <Link to="/more-doctor">
                                    <div>
                                        <b>Bác sĩ</b>
                                    </div>
                                    <div className="subs-title">Chọn bác sĩ</div>
                                </Link>
                            </div>
                            <div className="child-content">
                                <Link to="/more-handbook">
                                    <div>
                                        <b>Cẩm nang</b>
                                    </div>
                                    <div className="subs-title">Chọn xem cẩm nang</div>
                                </Link>
                            </div>
                        </div>
                        <div className="right-content">
                            <Link to="/support">
                                <div className="support">
                                    <i className="fas fa-question-circle"></i>
                                    Hỗ trợ
                                </div>
                            </Link>
                        </div>
                    </div>                
                </div>
                {this.props.isShowBanner === true &&
                    <div className="home-header-banner">
                        <div className="content-up">
                            <div className="title1">Nền tảng y tế</div>
                            <div className="title2">Chăm sóc sức khỏe toàn diện</div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Tìm kiếm" />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <div className="icon-child"><img src={hospital} alt="" /></div>
                                    <div className="text-child">Khám chuyên khoa</div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><img src={mobile} alt="" /></div>
                                    <div className="text-child">Khám từ xa</div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><img src={examination} alt="" /></div>
                                    <div className="text-child">Khám tổng quát</div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><img src={test} alt="" /></div>
                                    <div className="text-child">Xét nghiệm y học</div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><img src={mentalHealth} alt="" /></div>
                                    <div className="text-child">Sức khỏe tinh thần</div>
                                </div>
                                <div className="option-child">
                                    <div className="icon-child"><img src={dental} alt="" /></div>
                                    <div className="text-child">Khám nha khoa</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }

}

//chuyen redux vao component
const mapStateToProps = state => { //redux
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};


const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
