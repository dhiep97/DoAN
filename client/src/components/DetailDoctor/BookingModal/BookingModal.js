import React, { Component } from 'react';
import { connect } from 'react-redux';
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import { UilTimes } from '@iconscout/react-unicons'
import ProfileDoctor from '../ProfileDoctor/ProfileDoctor'
import _ from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { postPatientBookingAppointment } from '../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment';
import { emitter } from '../../../utils/emitter';

class BookingModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lastName: '',
            firstName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            date: '',
            timeType: '',
            birthday: new Date(),
            selectedGender: '',
            doctorId: '',
            genders: '',
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                firstName: '',
                lastName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: new Date(),
                selectedGender: '',
            })
        })
    }

    async componentDidMount() {
        this.props.getGender()
    }

    buildDataGender = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map(item => {
                let object = {};
                object.label = item.valueVi;
                object.value = item.keyMap;
                result.push(object);
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeTypeData.valueVi;
                let date = this.props.dataTime.date;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                    date: date
                })
            }
        }
    }

    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value;
        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy,
        })
    }

    handleOnChangeDatePicker = (dateBirth) => {
        this.setState({
            birthday: dateBirth
        })
    }
    
    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'firstName', 'lastName', 'phoneNumber', 'address', 'reason', 'birthday', 'selectedGender']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.error("Vui lòng điền thêm thông tin: " + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    handleConfirmBooking = async () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;
        let birthday = moment(new Date(this.state.birthday)).format('DD/MM/YYYY');
        let timeString = this.buildTimeBooking(this.props.dataTime);
        let doctorName = this.buildDoctorName(this.props.dataTime);
        
        let res = await postPatientBookingAppointment({
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.state.date,
            timeType: this.state.timeType,
            birthday: birthday,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeString: timeString,
            doctorName: doctorName
        })
        
        if (res && res.errCode === 0) {
            toast.success('Đặt lịch thành công! Vui lòng check e-mail để hoàn tất đặt lịch khám bệnh')
            this.props.closeBooingModal()
        } else {
            toast.error('Đặt lịch không thành công!')
        }
        
    }

    
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    buildTimeBooking = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let date = moment(new Date(dataTime.date)).format('dddd - DD/MM/YYYY');
            let today = this.capitalizeFirstLetter(date);
            let time = dataTime.timeTypeData.valueVi;
            
            return `${time} - ${today}`
        }
        return '';
    }

    buildDoctorName = (dataTime) => {
        if (dataTime && !_.isEmpty(dataTime)) {
            let doctorName = `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
            
            return doctorName;
        }
        return '';
    }

    render() {
        let { isOpenModal, closeBooingModal, dataTime } = this.props;
        let doctorId = dataTime && !_.isEmpty(dataTime) ? dataTime.doctorId : ''
        
        // console.log(dataTime)
        return (
            <>
                <Modal isOpen={isOpenModal} className="booking-modal-container" size="lg"
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">Thông tin đặt lịch khám bệnh</span>
                            <span
                                className="right"
                                onClick={closeBooingModal}
                            ><UilTimes /></span>
                        </div>
                        <div className="booking-modal-body">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-info">
                                <ProfileDoctor
                                    doctorId={doctorId}
                                    isShowDescription={false}
                                    dataTime={dataTime}
                                />
                            </div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ</label>
                                    <input className="form-control"
                                        value={this.state.lastName}
                                        onChange={(e) =>this.handleOnChangeInput(e, 'lastName')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Tên</label>
                                    <input className="form-control"
                                        value={this.state.firstName}
                                        onChange={(e) =>this.handleOnChangeInput(e, 'firstName')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoại</label>
                                    <input className="form-control"
                                        value={this.state.phoneNumber}
                                        onChange={(e) =>this.handleOnChangeInput(e, 'phoneNumber')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ e-mail</label>
                                    <input className="form-control"
                                        value={this.state.email}
                                        onChange={(e) =>this.handleOnChangeInput(e, 'email')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ liên hệ</label>
                                    <input className="form-control"
                                        value={this.state.address}
                                        onChange={(e) =>this.handleOnChangeInput(e, 'address')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Lý do khám</label>
                                    <input className="form-control"
                                        value={this.state.reason}
                                        onChange={(e) =>this.handleOnChangeInput(e, 'reason')}
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Ngày sinh</label>
                                    <DatePicker
                                        onChange={this.handleOnChangeDatePicker} 
                                        className="form-control"
                                        selected={this.state.birthday}
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                                <div className="col-6 form-group">
                                    <label>Giới tính</label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="booking-modal-footer">
                            <button
                                className="btn-booking-confirm"
                                onClick={()=>this.handleConfirmBooking()}
                            >Xác nhận</button>
                            <button
                                className="btn-booking-cancel" onClick={closeBooingModal}
                            >Hủy bỏ</button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => { //redux
    return {
        genders: state.admin.genders,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);