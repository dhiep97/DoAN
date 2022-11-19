import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss';
import HomeFooter from '../HomePage/HomeFooter';
import Information from '../HomePage/Information';
import HomeHeader from '../HomePage/HomeHeader';
import { getDetailClinicById } from '../../services/userService';
import _ from 'lodash';
import DoctorSchedule from '../DetailDoctor/DoctorSchedule/DoctorSchedule';
import DoctorInfo from '../DetailDoctor/DoctorInfo/DoctorInfo';
import ProfileDoctor from '../DetailDoctor/ProfileDoctor/ProfileDoctor';

class DetailClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {}
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailClinicById({
                id: id,
            });
            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = []
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.Doctor_Infos;
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,
                });
            } 
        }
    }

    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        console.log(this.state)

        return (
            <div className="detail-clinic-container">
                <HomeHeader isShowBanner={false} />
                <div className="clinic-description-header">
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                        <>
                        <div className="clinic-image" style={{ backgroundImage: `url(${dataDetailClinic && dataDetailClinic.image ? dataDetailClinic.image : ''})` }}></div>
                        <div className="clinic-description-name">{dataDetailClinic.name}</div><div className="clinic-description-address">
                            <i className="fas fa-map-marker-alt"></i>
                            {dataDetailClinic.address}
                        </div>
                        <div className="detail-clinic-note">
                            <p>HiDuBooking là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.</p>
                        </div>
                        <div className="detail-clinic-note1">
                            <p>Từ nay, người bệnh có thể đặt khám tại <span>{dataDetailClinic.name}</span> thông qua hệ thống đặt khám HiDuBooking.</p>
                            <li>Giảm thiểu thời gian chờ đợi xếp hàng làm thủ tục khám.</li>
                            <li>Được lựa chọn khám với các bác sĩ chuyên khoa giàu kinh nghiệm</li>
                            <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch)</li>
                        </div>
                        </>
                    }
                </div>
                
                <div className="detail-clinic-body">
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="clinic-content-left">
                                        <div className="clinic-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetails={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="clinic-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule 
                                                doctorIdFromParent={item}
                                                
                                            />
                                        </div>
                                        <div className="doctor-info">
                                            <DoctorInfo 
                                                doctorIdFromParent = {item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="clinic-description">
                    {dataDetailClinic && !_.isEmpty(dataDetailClinic) &&
                        <>
                            <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}></div>
                        </>
                    }
                </div>
                <Information />
                <HomeFooter />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);