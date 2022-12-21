import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/Logo/logo.svg';
import hospital from '../../assets/Header/hospital.png';
import unnamed from '../../assets/Header/unnamed.webp';
import bmi from '../../assets/Header/bmi.png';
import examination from '../../assets/Header/examination.png';
import { Link } from 'react-router-dom';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
        }
    }

    isShowLogin = () => {
        this.setState({ isShow: true})
    }

    render() {
        let { isShow } = this.state;
        return (
            <>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className="home-header-menu">
                                {isShow === false ?
                                    <div onClick={()=>this.isShowLogin()}>
                                        <i className="fas fa-bars"></i>
                                    </div>
                                    :
                                    <div className="home-header-login-system">
                                        <Link to="/system">
                                            <p>Hệ thống</p>
                                        </Link>
                                        <Link to="/login">
                                            <p>Đăng nhập</p>
                                        </Link>
                                    </div>
                                }
                            </div>
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
                            <div className="title1">Chăm sóc sức khỏe toàn diện</div>
                            <div className="title1">Đặt lịch hẹn dễ dàng và miến phí</div>
                            <div className="search">
                                <i className="fas fa-search"></i>
                                <input type="text" placeholder="Tìm kiếm" />
                            </div>
                        </div>
                        <div className="content-down">
                            <div className="options">
                                <div className="option-child">
                                    <Link to="/more-specialty">
                                        <div className="icon-child"><img src={hospital} alt="" /></div>
                                        <div className="text-child">Khám chuyên khoa</div>
                                    </Link>
                                </div>
                                <div className="option-child">
                                    <Link to='/tinh-bmi'>
                                        <div className="icon-child"><img src={bmi} alt="" /></div>
                                        <div className="text-child">Đo chỉ số BMI</div>
                                    </Link>
                                </div>
                                <div className="option-child">
                                    <Link to='/tinh-bmr'>
                                        <div className="icon-child"><img src={unnamed} alt="" /></div>
                                        <div className="text-child">Đo nhu cầu calo (BMR)</div>
                                    </Link>
                                </div>
                                <div className="option-child">
                                    <Link to='more-doctor'>
                                        <div className="icon-child"><img src={examination} alt="" /></div>
                                        <div className="text-child">Khám bác sĩ</div>
                                    </Link>
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
