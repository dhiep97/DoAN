import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorSchedule.scss';
import moment from 'moment';
import locallization from 'moment/locale/vi';
import { getScheduleDoctorByDate } from '../../../services/userService';
import BookingModal from '../BookingModal/BookingModal';
import { emitter } from '../../../utils/emitter';

class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTimes: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // async componentDidMount() {
    //     let allDays = [];
    //     for (let i = 0; i < 7; i++) {
    //         let object = {};
    //         let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
    //         object.label = this.capitalizeFirstLetter(labelVi)
    //         object.value = moment(new Date()).add(i, 'days').startOf('day').format('YYYY-MM-DD')
    //         allDays.push(object);
    //     }
    //     this.setState({
    //         allDays: allDays,
    //     });
    //     console.log(allDays)
    // }

    async componentDidMount() {
        let allDays = this.getArrDays();
        if (this.props.doctorIdFromParent) {
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTimes: res.data ? res.data : []
                })
            }
        }
        
        this.setState({
            allDays: allDays,
        });
    }

    getArrDays = () => {
        let allDays = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let day = moment(new Date()).format('DD/MM');
                let today = `Hôm nay - ${day}`
                object.label = today
            } else {
                let labelVi = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(labelVi)
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').format('YYYY-MM-DD')
            allDays.push(object);
        }
        return allDays;
    }

    async componentDidUpdate(prevProps, prevState) {     

        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let allDays = this.getArrDays();
            let res = await getScheduleDoctorByDate(this.props.doctorIdFromParent, allDays[0].value);
            this.setState({
                allAvailableTimes: res.data ? res.data : []
            })
        }
    }

    handleOnChangeSelect = async (event) => {
        if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
            let doctorId = this.props.doctorIdFromParent;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvailableTimes: res.data ? res.data : []
                })
            }
        }
    }

    handleClickScheduleTime = (time) =>{
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }

    closeBooingModal = () => {
        this.setState({
            isOpenModalBooking: false,
        })
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
    }

    render() {
        let { allDays, allAvailableTimes, isOpenModalBooking, dataScheduleTimeModal } = this.state;
        console.log(allAvailableTimes)
        return (
            <>
                <div className="doctor-schedule-container">
                    <div className="all-schedule">
                        <select onChange={(event)=>this.handleOnChangeSelect(event)}>
                            {allDays && allDays.length > 0 && allDays.map((item, index) => {
                                return(
                                    <option
                                        value={item.value}
                                        key={index}
                                    >{item.label}</option>
                                )
                            })}
                            
                        </select>
                    </div>
                    <div className="all-time">
                        <div className="text-calendar">
                            <span><i className="fas fa-calendar-alt"></i>Lịch khám</span>
                        </div>
                        <div className="time-content">
                            {allAvailableTimes && allAvailableTimes.length > 0 ?
                                <>
                                    <div className="time-button">
                                        {allAvailableTimes.map((item, index) => {
                                            let timeVi = item.timeTypeData.valueVi;
                                            return (
                                                <button key={index}
                                                    onClick={() =>this.handleClickScheduleTime(item)}
                                                >
                                                    {timeVi}
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className="book">
                                        Chọn <i className="far fa-hand-point-up"></i> và đặt (Phí đặt lịch 0đ)
                                    </div>
                                </>
                                :
                                <div className="no-schedule">Không có lịch hẹn trong thời gian này, vui lòng chọn thời gian khác!</div>
                            }
                        </div>
                    </div>
                </div>
                <BookingModal 
                    isOpenModal={isOpenModalBooking}
                    closeBooingModal={this.closeBooingModal}
                    dataTime={dataScheduleTimeModal}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);