import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import logo from '../../assets/Logo/logo.png';
import logoCCDV from '../../assets/Logo/logoCCDV.png';

class Information extends Component {

    render() {
        return (
            <div className="section-share section-information">
                <div className="info-left">
                    <img src={logo} alt="" />
                    <div className="info-company">Công ty Cổ phần Đồ Án Tốt Nghiêp</div>
                    <div className="address">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>59 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội</span>
                    </div>
                    <div className="check">
                        <i className="fas fa-check"></i>
                        <span>ĐKKD số: 7881312373. Sở KHĐT Hà Nội cấp ngày 19/09/2022</span>
                    </div>
                    <div className="img">
                        <img src={logoCCDV} alt="" />
                        <img src={logoCCDV} alt="" />
                    </div>
                </div>
                <div className="info-center">
                    <p>Liên hệ đối tác</p>
                    <p>Tuyển dụng</p>
                    <p>Câu hỏi thường gặp</p>
                    <p>Điểu khoản sử dụng</p>
                    <p>Chính sách bảo mật</p>
                    <p>Quy chế hoạt động</p>
                </div>
                <div className="info-right">
                    <div className="headquarters">
                        <p>Trụ sở tại Hà Nội</p>
                        <span>59 Giải Phóng, Đồng Tâm, Hai Bà Trưng, Hà Nội</span>
                    </div>
                    <div className="support">
                        <p>Hỗ trợ khách hàng</p>
                        <span>support@nuce.edu.vn</span>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Information);