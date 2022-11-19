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
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            let resProvince = await getAllCodeService('PROVINCE');

            if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
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
                let dataProvince = resProvince.data;
                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueVi: 'Toàn Quốc'
                    })
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
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
        let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
        return (
            <div className="detail-specialty-container">
                <HomeHeader isShowBanner={false} />
                <div className="specialty-description">
                    {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) &&
                        <>
                            <div className="specialty-description-title">{dataDetailSpecialty.name}</div>
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>
                        </>
                    }
                </div>
                
                <div className="detail-specialty-body">
                    <div className="search-province">
                        <select onChange={(event)=>this.handleOnChangeSelect(event)} >
                            {listProvince && listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                    )
                                })
                                
                            }
                        </select>
                    </div>
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