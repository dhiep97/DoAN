import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailMedicalFacility.scss';
import HomeFooter from '../HomePage/HomeFooter';
import Information from '../HomePage/Information';
import HomeHeader from '../HomePage/HomeHeader';
import logo from '../../assets/Logo/logo.png'

class DetailMedicalFacility extends Component {

    render() {
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="title">
                    <div className="logo">
                        <img src={logo} alt=""/>
                    </div>
                    <div className="address">Bệnh viện K - Cơ sở Phan Chu Trinh</div>
                </div>
                <div className="introduce">
                    Giới thiệu
                    Địa chỉ: 9A - 9B Phan Chu Trinh, Hoàn Kiếm, Hà Nội

                    Thời gian làm việc: Thứ 2 đến thứ 7 (6h00 - 17h00)

                    Bệnh viện K được biết đến là cơ sở chuyên khoa đầu ngành về khám, điều trị và phòng chống ung thư của cả nước. Bệnh viện K Phan Chu Trinh là một trong ba cơ sở của Bệnh viện K Trung ương với chức năng, nhiệm vụ chính là:

                    Cấp cứu, khám bệnh, chữa bệnh, phòng bệnh
                    Phục hồi chức năng chuyên khoa ung bướu và các bệnh trong khả năng của bệnh viện cho người bệnh trong nước, nước ngoài.
                    Đào tạo và tham gia đào tạo cán bộ y tế, làm công tác chỉ đạo tuyến, tham gia phòng chống dịch bệnh theo nhiệm vụ được Bộ Y tế phân công.
                    Nghiên cứu khoa học, triển khai ứng dụng khoa học, công nghệ, kỹ thuật hiện đại để phục vụ người bệnh và phục vụ công tác nghiên cứu khoa học và đào tạo nhân lực y tế.
                    Người bệnh có thể lựa chọn một trong các mức khám theo yêu cầu sau:

                    Gói 1:
                    Khám Giáo sư, Phó Giáo sư - Chi phí: 500.000 đồng/lần khám
                    Gói 2:
                    Khám Tiến sĩ, Bác sĩ Chuyên khoa II - Chi phí: 300.000 đồng/lần khám
                    Gói 3:
                    Khám Thạc sĩ, Bác sĩ Chuyên khoa I - Chi phí: 200.000 đồng/ lần khám
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailMedicalFacility);