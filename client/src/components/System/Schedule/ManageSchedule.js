import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageSchedule.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { saveBulkScheduleDoctor, getScheduleDoctorByDate, deleteSchedule } from '../../../services/userService';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" ;
import DeleteScheduleModal from './DeleteScheduleModal';

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
            rangeTime: [],
            dataScheduleDoctor: [],
            scheduleEdit: [],
            isShowDeleteModal: false,
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorsRedux();
        this.props.fetchAllScheduleTime();
        // this.listScheduleDoctor();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect,
            });
        }

        if (prevProps.allScheduleTimes !== this.props.allScheduleTimes) {
            let data = this.props.allScheduleTimes;
            if (data && data.length > 0) {
                // data = data.map((item) => {
                //     item.isSelected = false;
                //     return item;
                // })
                data = data.map(item => ({
                    ...item,
                    isSelected: false
                }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = []; 
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
                object.label = labelVi
                object.value = item.id;
                result.push(object);
            })
            
        }
        return result;
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        });
    }

    handleOnChangeDatePicker = async (date) => {
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
        let { rangeTime, selectedDoctor, currentDate } = this.state;
        let result = [];
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Vui lòng chọn bác sĩ")
            return;
        }
        let formattedDate = moment(new Date(currentDate)).format('YYYY-MM-DD');
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true);
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map((schedule) => {
                    let object = {};
                    object.doctorId = selectedDoctor.value;
                    object.date = formattedDate;
                    object.timeType = schedule.keyMap;
                    result.push(object);
                })
                
            } else {
                toast.error("Vui lòng chọn thời gian khám bệnh")
                return;
            }
        }
        let res = await saveBulkScheduleDoctor({
            arrSchedule: result,
            doctorId: selectedDoctor.value,
            formattedDate: formattedDate
        })
        if (res && res.errCode === 0) {
            toast.success("Lưu lịch khám bệnh thành công");
            await this.getScheduleDoctorByDate()
        } else {
            toast.error("Lỗi lưu lịch khám bệnh")
        }
    }

    getScheduleDoctorByDate = async () => {
        let { selectedDoctor, currentDate } = this.state;
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Vui lòng chọn bác sĩ")
            return;
        }
        let formattedDate = moment(new Date(currentDate)).format('YYYY-MM-DD');
        let doctorId = selectedDoctor.value;
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
                toast.success('Xóa lịch khám thành công')
                await this.getScheduleDoctorByDate()
            } else {
                toast.error('Lỗi không thể xóa lịch khám này')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let { rangeTime, dataScheduleDoctor, isShowDeleteModal } = this.state;
        let columns = [
            {
                Header: 'STT', accessor: 'STT', minWidth: 20,
                Cell: (item) => {
                    return (
                        <span>{item.index + 1}</span>
                    )
                }
            },
            { Header: 'Thời gian khám', accessor: 'timeTypeData.valueVi', minWidth: 100 },
            {
                Header: 'Họ và tên', accessor: 'fullName', minWidth: 250,
                Cell: (item) => {
                    return(
                    <span>{item.original.doctorData.lastName + ' ' + item.original.doctorData.firstName}</span>
                )}
            },
            {
                Header: 'Thao tác', accessor: 'action', minWidth: 250,
                Cell: (item) => {
                    return(
                    <div className="action">
                        <button className="btn-delete-schedule"
                            onClick={()=> this.handleDelete(item)}
                        >Xóa</button>
                    </div>
                )}
            },
        ]
        return (
            <div className="manage-schedule-container">
                <div className="manage-schedule-title">
                    Quản lý kế hoạch khám bệnh của bác sĩ
                </div>
                <DeleteScheduleModal
                    isOpenDelete={isShowDeleteModal}
                    closeDeleteModal={this.closeDeleteModal}
                    currentDelete={this.state.scheduleEdit}
                    deleteSchedule={this.handleDeleteSchedule}
                />
                <div className="manage-schedule-content">
                    <div className="row">
                        <div className="col-4 form-group">
                            <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn ngày</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker} 
                                className="form-control"
                                selected={this.state.currentDate}
                                minDate={new Date()}
                                dateFormat="dd/MM/yyyy"
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
                        <div className='col-12 manage-schedule-button'>
                            <button className="btn-save-schedule"
                                onClick={() => this.handleSaveSchedule()}
                            >Lưu thông tin</button>
                            <button className="btn-search-schedule"
                                onClick={() => this.handleSearchSchedule()}
                            >Xem lịch đã tạo</button>
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
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        allScheduleTimes: state.admin.allScheduleTimes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
