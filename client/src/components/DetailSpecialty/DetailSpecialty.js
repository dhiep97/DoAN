import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import HomeFooter from '../HomePage/HomeFooter';
import Information from '../HomePage/Information';
import HomeHeader from '../HomePage/HomeHeader';
import images from '../../assets/outstanding-doctor/gorou.jpg'

class DetailSpecialty extends Component {

    render() {
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="description">
                    <span>
                        Thần kinh
                        Bác sĩ Thần kinh giỏi
                        Danh sách các giáo sư, bác sĩ chuyên khoa Thần kinh giỏi:
                        Các giáo sư, bác sĩ uy tín đầu ngành chuyên khoa Thần kinh đã và đang công tác tại các bệnh viện lớn như: Bệnh viện Bạch Mai, Bệnh viện Việt Đức, Bệnh viện 108, Bệnh viện Đại học Y Hà Nội, Bệnh viện 103.
                        Là thành viên hoặc lãnh đạo các tổ chức chuyên môn như: Hội Thần kinh Việt Nam, Hội Phẫu thuật Thần kinh...
                        Được nhà nước công nhận các danh hiệu Thầy thuốc nhân dân, thầy thuốc ưu tú, bác sĩ cao cấp.
                        Khám bệnh chuyên khoa Thần kinh
                        Bại Não   
                        Đau đầu, chóng mặt, buồn nôn   
                        Bệnh Pakison, bệnh tiền đình   
                        Bị co cơ, căng dây thần kinh       
                        Động kinh, có những cơn vãng ý thức   
                        Bị tê bì nửa mặt, chèn dây thần kinh
                        Bồn chồn, lo lắng, hồi hộp, chân tay run   
                        Có dấu hiệu tăng động    
                        Co rút cổ, đau đầu với mặt, chân tay, vã mồ hôi   
                        Chấn thương đầu, dây thần kinh
                        ...
                    </span>
                </div>
                <div className="info-doctor">
                    <div className="content-left">
                        <img src={images} alt="" />
                    </div>
                    <div className="content-right">
                        
                    </div>
                </div>
                <Information />
                <HomeFooter />
            </>
        )
    }
}

const mapStateToProps = state => { //redux
    return {
        
    };
};


const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);