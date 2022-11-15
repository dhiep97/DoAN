import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { getProfileDoctorInfoById } from '../../../services/userService';
import { NumericFormat } from 'react-number-format';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        let data = await this.getInfoDoctor(this.props.doctorId)
        this.setState({
            dataProfile: data
        })
    }

    getInfoDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorInfoById(id);
            if (res && res.errCode === 0) {
                result = res.data;
                
            }
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.doctorId !== prevProps.doctorId) {
            // this.getInfoDoctor(this.props.doctorId)
        }
    }

    renderTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = moment(new Date(dataTime.date)).format('dddd - DD/MM/YYYY');
            let today = this.capitalizeFirstLetter(date);
            let time = dataTime.timeTypeData.valueVi;
            
            return (
                <>
                    <div className="">{time} - {today}</div>
                </>
            )
        }
    }
    render() {
        let { dataProfile } = this.state;
        let { isShowDescription, dataTime } = this.props;
        let nameVi = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName} `;
        }
        //console.log(dataTime)
        return (
            <div className="profile-doctor-container">
                <div className="info-doctor">
                    <div className="content-left"
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >
                    </div>
                    <div className="content-right">
                        <div className="up">
                            {nameVi}
                        </div>
                        <div className="down">
                            {isShowDescription === true ?
                                <>
                                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description &&
                                        <div>
                                            {dataProfile.Markdown.description}
                                        </div>
                                    }
                                </>
                                :
                                <>
                                    {this.renderTimeBooking(dataTime)}
                                    <>Tên phòng khám: {dataProfile && dataProfile.Doctor_Info && dataProfile.Doctor_Info.nameClinic &&
                                        <span>
                                            {dataProfile.Doctor_Info.nameClinic}
                                        </span>
                                    }</>
                                    <div>Địa chỉ: {dataProfile && dataProfile.Doctor_Info && dataProfile.Doctor_Info.addressClinic &&
                                        <span>
                                            {dataProfile.Doctor_Info.addressClinic}
                                        </span>
                                    }</div>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div className="price">
                    Giá khám: <NumericFormat displayType="text" thousandSeparator="," value={dataProfile && dataProfile.Doctor_Info ? dataProfile.Doctor_Info.priceData.valueVi : ''}/>đ
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);