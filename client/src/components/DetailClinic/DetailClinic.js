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
                            <p>HiDuBooking l?? N???n t???ng Y t??? ch??m s??c s???c kh???e to??n di???n h??ng ?????u Vi???t Nam k???t n???i ng?????i d??ng v???i tr??n 150 b???nh vi???n - ph??ng kh??m uy t??n, h??n 1,000 b??c s?? chuy??n khoa gi???i v?? h??ng ngh??n d???ch v???, s???n ph???m y t??? ch???t l?????ng cao.</p>
                        </div>
                        <div className="detail-clinic-note1">
                            <p>T??? nay, ng?????i b???nh c?? th??? ?????t kh??m t???i <span>{dataDetailClinic.name}</span> th??ng qua h??? th???ng ?????t kh??m HiDuBooking.</p>
                            <li>Gi???m thi???u th???i gian ch??? ?????i x???p h??ng l??m th??? t???c kh??m.</li>
                            <li>???????c l???a ch???n kh??m v???i c??c b??c s?? chuy??n khoa gi??u kinh nghi???m</li>
                            <li>H??? tr??? ?????t kh??m tr???c tuy???n tr?????c khi ??i kh??m (mi???n ph?? ?????t l???ch)</li>
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