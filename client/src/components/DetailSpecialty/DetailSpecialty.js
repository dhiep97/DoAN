import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import HomeFooter from '../HomePage/HomeFooter';
import Information from '../HomePage/Information';
import HomeHeader from '../HomePage/HomeHeader';
import DoctorSchedule from '../DetailDoctor/DoctorSchedule/DoctorSchedule';
import DoctorInfo from '../DetailDoctor/DoctorInfo/DoctorInfo';
import ProfileDoctor from '../DetailDoctor/ProfileDoctor/ProfileDoctor';
import { getDetailSpecialtyById, getAllCodeService } from '../../services/userService';
import _ from 'lodash';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById({
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
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                });
            } 
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;
            let res = await getDetailSpecialtyById({
                id: id,
                location: location
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
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    }
    render() {
        let { arrDoctorId, dataDetailSpecialty } = this.state;
        let imageBase64 = '';
        if (dataDetailSpecialty.image) {
            imageBase64 = new Buffer.from(dataDetailSpecialty.image, 'base64').toString('binary');
        }
        console.log(dataDetailSpecialty)
        return (
            <div className="detail-specialty-container">
                <HomeHeader isShowBanner={false} />
                <div className="specialty-description" style={{ backgroundImage: `url(${imageBase64})` }}>
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                        <div className="specialty-description-img">
                            <div className="specialty-description-title">{dataDetailSpecialty.name}</div>
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                        </div>
                    }
                </div>
                
                <div className="detail-specialty-body">
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="specialty-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetails={true}
                                            />
                                        </div>
                                    </div>
                                    <div className="specialty-content-right">
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);