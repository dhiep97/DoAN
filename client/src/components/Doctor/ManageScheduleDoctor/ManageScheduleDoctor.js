import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageScheduleDoctor.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as actions from '../../../store/actions';
import { saveBulkScheduleDoctor, getScheduleDoctorByDate, deleteSchedule } from '../../../services/userService';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import DeleteSchedule from './DeleteSchedule';

class ManageScheduleDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            rangeTime: [],
            dataScheduleDoctor: [],
            scheduleEdit: [],
            isShowDeleteModal: false,
        }
    }

    componentDidMount() {
        this.props.fetchAllScheduleTime();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allScheduleTimes !== this.props.allScheduleTimes) {
            let data = this.props.allScheduleTimes;
            if (data && data.length > 0) {
                data.map((item) => {
                    item.isSelected = false;
                    return item;
                })
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date
        })
    }

    handleClickButtonTime = (time) => {
        let { rangeTime } = this.state;
        if (rangeTime && rangeTime.length > 0) {
            rangeTime = rangeTime.map(item => {
                if (item.id === time.id)
                    item.isSelected = !item.isSelected;
                return item;
            })
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, currentDate } = this.state;
        let { user } = this.props;
        let result = [];
        let formattedDate = moment(new Date(currentDate)).format('YYYY-MM-DD');
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let object = {};
                    object.doctorId = user.id;
                    object.date = formattedDate;
                    object.timeType = time.keyMap;
                    result.push(object);
                })
            } else {
                toast.error("Vui l??ng ch???n th???i gian kh??m b???nh")
                return;
            }
            console.log(result)
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: user.id,
            formattedDate: formattedDate
        })
        if (res && res.errCode === 0) {
            toast.success("L??u l???ch kh??m b???nh th??nh c??ng");
            await this.getScheduleDoctorByDate()
        } else {
            toast.error("L???i l??u l???ch kh??m b???nh")
        }
    }

    getScheduleDoctorByDate = async () => {
        let { currentDate } = this.state;
        let { user } = this.props;
        let formattedDate = moment(new Date(currentDate)).format('YYYY-MM-DD');
        let doctorId = user.id;
        let date = formattedDate;
        let res = await getScheduleDoctorByDate(doctorId, date);
        if (res && res.errCode === 0) {
            this.setState({
                dataScheduleDoctor: res.data
            })
        }
    }

    handleSearchSchedule = async () => {
        this.getScheduleDoctorByDate()
    }

    handleDelete = async (item) => {
        this.setState({
            isShowDeleteModal: true,
            scheduleEdit: item
        })
    }
    
    closeDeleteModal = () => {
        this.setState({
            isShowDeleteModal: false,
        })
    }

    handleDeleteSchedule = async (data) => {
        try {
            let res = await deleteSchedule(data)
            if (res && res.errCode === 0) {
                this.setState({
                    isShowDeleteModal: false
                })
                toast.success('X??a l???ch kh??m th??nh c??ng')
                await this.getScheduleDoctorByDate()
            } else {
                toast.error('L???i kh??ng th??? x??a l???ch kh??m n??y')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let { rangeTime, dataScheduleDoctor, isShowDeleteModal } = this.state;
        const columns = [
            { Header: 'Th???i gian kh??m', accessor: 'timeTypeData.valueVi', minWidth: 100 },
            {
                Header: 'H??? v?? t??n', accessor: 'fullName', minWidth: 250,
                Cell: (item) => {
                    return(
                    <span>{item.original.doctorData.lastName + ' ' + item.original.doctorData.firstName}</span>
                )}
            },
            {
                Header: 'Thao t??c', accessor: 'action', minWidth: 250,
                Cell: (item) => {
                    return(
                    <div className="action">
                        <button className="btn-delete-schedule"
                            onClick={()=> this.handleDelete(item)}
                        >X??a</button>
                    </div>
                )}
            },
        ]
        return (
            <div className="manage-schedule-doctor-container">
                <div className="manage-schedule-doctor-title">
                    Qu???n l?? k??? ho???ch kh??m b???nh
                </div>
                <DeleteSchedule
                    isOpenDelete={isShowDeleteModal}
                    closeDeleteModal={this.closeDeleteModal}
                    currentDelete={this.state.scheduleEdit}
                    deleteSchedule={this.handleDeleteSchedule}
                />
                <div className="row manage-schedule-doctor-content">
                    <div className="col-4 form-group">
                        <label>Ch???n ng??y kh??m</label>
                        <DatePicker
                            onChange={this.handleOnChangeDatePicker} 
                            className="form-control"
                            selected={this.state.currentDate}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                        />
                    </div>
                    <div className="col-12 pick-hour-container">
                        {rangeTime && rangeTime.length > 0 &&
                            rangeTime.map((item, index) => {
                                return (
                                    <button
                                        className={item.isSelected === true ? "btn btn-schedule active" : "btn btn-schedule"}
                                        key={index}
                                        onClick={()=>this.handleClickButtonTime(item)}
                                    >{item.valueVi}</button>
                                )
                            })
                        }
                    </div>
                    <div className="col-12 manage-schedule-button">
                        <button className="btn-save-schedule"
                            onClick={()=> this.handleSaveSchedule()}
                        >
                            L??u th??ng tin
                        </button>
                        <button className="btn-search-schedule"
                            onClick={() => this.handleSearchSchedule()}
                        >Xem l???ch ???? t???o
                        </button>
                    </div>
                    <div className="col-12">
                        <ReactTable
                            data={dataScheduleDoctor}
                            columns={columns}
                            defaultPageSize={5}
                        />
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => { //redux
    return {
        user: state.user.userInfo,
        allScheduleTimes: state.admin.allScheduleTimes
    };
};


const mapDispatchToProps = dispatch => {
    return {
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageScheduleDoctor);