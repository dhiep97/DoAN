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
                let timeType = this.props.dataTime.timeType;
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
                toast.error("Vui l??ng ??i???n th??m th??ng tin: " + arrCheck[i]);
                break;
            } else if (!this.state[arrCheck[0]].includes("@")) {
                isValid = false;
                toast.error("Email kh??ng ????ng");
                break;
            } else if (this.state[arrCheck[3]].length > 10) {
                isValid = false;
                toast.error("S??? ??i???n tho???i kh??ng ????ng");
                break;
            } else if (this.state[arrCheck[3]].length < 10) {
                isValid = false;
                toast.error("S??? ??i???n tho???i kh??ng ????ng");
                break;
            }
        }
        return isValid;
    }

    handleConfirmBooking = async (event) => {
        event.preventDefault();
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
            toast.success('?????t l???ch th??nh c??ng! Vui l??ng check e-mail ????? ho??n t???t ?????t l???ch kh??m b???nh')
            this.props.closeBooingModal()
        } else {
            toast.error('?????t l???ch kh??ng th??nh c??ng!')
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
        
        console.log(dataTime)
        return (
            <>
                <Modal isOpen={isOpenModal} className="booking-modal-container" size="lg"
                    centered
                >
                    <div className="booking-modal-content">
                        <div className="booking-modal-header">
                            <span className="left">Th??ng tin ?????t l???ch kh??m b???nh</span>
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
                            <form onSubmit={(event)=>this.handleConfirmBooking(event)}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>H???</label>
                                        <input className="form-control"
                                            value={this.state.lastName}
                                            onChange={(e) =>this.handleOnChangeInput(e, 'lastName')}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>T??n</label>
                                        <input className="form-control"
                                            value={this.state.firstName}
                                            onChange={(e) =>this.handleOnChangeInput(e, 'firstName')}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>S??? ??i???n tho???i</label>
                                        <input className="form-control"
                                            type="tel" pattern='[0-9]{10}'
                                            value={this.state.phoneNumber}
                                            onChange={(e) =>this.handleOnChangeInput(e, 'phoneNumber')}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>?????a ch??? e-mail</label>
                                        <input className="form-control"
                                            value={this.state.email}
                                            type="email"
                                            pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                                            onChange={(e) =>this.handleOnChangeInput(e, 'email')}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>?????a ch??? li??n h???</label>
                                        <input className="form-control"
                                            value={this.state.address}
                                            onChange={(e) =>this.handleOnChangeInput(e, 'address')}
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>L?? do kh??m</label>
                                        <input className="form-control"
                                            value={this.state.reason}
                                            onChange={(e) =>this.handleOnChangeInput(e, 'reason')}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label>Ng??y sinh</label>
                                        <DatePicker
                                            onChange={this.handleOnChangeDatePicker} 
                                            className="form-control"
                                            selected={this.state.birthday}
                                            dateFormat="dd/MM/yyyy"
                                            peekNextMonth
                                            showMonthDropdown
                                            showYearDropdown
                                            dropdownMode="select"
                                        />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Gi???i t??nh</label>
                                        <Select
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                            options={this.state.genders}
                                        />
                                    </div>
                                </div>
                                <div className="booking-modal-footer">
                                    <button type="submit"
                                        className="btn-booking-confirm"
                                    >X??c nh???n</button>
                                    <button
                                        className="btn-booking-cancel" onClick={closeBooingModal}
                                    >H???y b???</button>
                                </div>
                            </form>
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