import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CancelAppointment.scss';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { getAllPatientForDoctor, deletePatientSchedule } from '../../../services/userService';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" ;
import CancelSchedule from './CancelSchedule';

class CancelAppointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            selectedDoctor: {},
            currentDate: new Date(),
            dataPatient: [],
            isOpenCancelModal: false,
            currentPatient: [],
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctorsRedux();
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect,
            });
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

    getDataPatient = async () => {
        let { selectedDoctor, currentDate } = this.state; 
        if (selectedDoctor && _.isEmpty(selectedDoctor)) {
            toast.error("Vui lòng chọn bác sĩ")
            return;
        }
        let doctorId = selectedDoctor.value;
        let formattedDate = moment(new Date(currentDate)).format('YYYY-MM-DD');
        let res = await getAllPatientForDoctor({
            doctorId: doctorId,
            date: formattedDate
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({
            selectedDoctor: selectedOption
        });
    }

    handleViewPatient = async () => {
        this.getDataPatient()
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date
        })
    }
    
    closeCancelModal = () => {
        this.setState({
            isOpenCancelModal: false,
        })
    }


    handleCancel = (item) => {
        this.setState({
            isOpenCancelModal: true,
            currentPatient: item
        })
    }

    cancelSchedule = async (data) => {
        let res = await deletePatientSchedule(data)
        if (res && res.errCode === 0) {
            toast.success('Huỷ lịch khám thành công')
            this.closeCancelModal()
            await this.getDataPatient();
        } else {
            toast.error('Lỗi hủy lịch khám')
        }
    }


    render() {
        let { dataPatient, isOpenCancelModal } = this.state;
        const columns = [
            { Header: 'Thời gian', accessor: 'timeTypeBook.valueVi', minWidth: 120 },
            { Header: 'Email', accessor: 'patientData.email', minWidth: 220 },
            { Header: 'Họ', accessor: 'patientData.lastName', minWidth: 120 },
            { Header: 'Tên', accessor: 'patientData.firstName', minWidth: 70 },
            { Header: 'Điạ chỉ', accessor: 'patientData.address', minWidth: 100 },
            { Header: 'Số điện thoại', accessor: 'patientData.phoneNumber', minWidth: 100 },
            { Header: 'Lý do khám bệnh', accessor: 'reason', minWidth: 200 },
            {
                Header: 'Thao tác', accessor: 'action', minWidth: 250,
                Cell: (item) => {
                    return(
                    <div className="action">
                        <button className="btn-cancel"
                            onClick={()=> this.handleCancel(item)}
                        >Hủy lịch</button>
                    </div>
                )}
            },
        ]
        return (
            <>
                <div className="manage-patient-container">
                    <div className="manage-patient-title">
                        Quản lý bệnh nhân khám bệnh
                    </div>
                    <div className="manage-patient-content row">
                        <div className="col-4 form-group">
                        <label>Chọn bác sĩ</label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="col-4 form-group">
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker} 
                                className="form-control"
                                selected={this.state.currentDate}
                                dateFormat="dd/MM/yyyy"
                            />
                        </div>
                        <div className="col-12 form-group">
                            <button className="btn btn-primary"
                                onClick={()=>this.handleViewPatient()}
                            >Xem danh sách</button>
                        </div>
                        <div className="col-12 table-manage-patient">
                            <ReactTable
                                data={dataPatient}
                                columns={columns}
                                defaultPageSize={5}
                            />
                        </div>
                    </div>
                </div>
                <CancelSchedule
                    isOpenModal={isOpenCancelModal}
                    closeCancelModal={this.closeCancelModal}
                    currentPatient={this.state.currentPatient}
                    cancelSchedule={this.cancelSchedule}
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelAppointment);
