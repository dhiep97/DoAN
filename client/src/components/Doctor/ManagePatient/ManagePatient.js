import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagePatient.scss';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllPatientForDoctor, postSendPrescription, postCancelSchedule } from '../../../services/userService';
import moment from 'moment';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" ;
import PrescriptionModal from '../PrescriptionModal/PrescriptionModal';
import { toast } from 'react-toastify';
import CancelSchedule from '../CancelSchedule/CancelSchedule';

class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: new Date(),
            dataPatient: [],
            isOpenCancelModal: false,
            isOpenPrescriptionModal: false,
            dataModal: {},
        }
    }

    async componentDidMount() {
        this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formattedDate = moment(new Date(currentDate)).format('YYYY-MM-DD');
        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formattedDate
        });
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date
        }, async() => {
            await this.getDataPatient();
        })
    }

    closePrescriptionModal = () => {
        this.setState({
            isOpenPrescriptionModal: false,
            dataModal: {}
        })
    }

    closeCancelModal = () => {
        this.setState({
            isOpenCancelModal: false,
        })
    }

    handleConfirm = (item) => {
        let data = {
            doctorId: item.original.doctorId,
            patientId: item.original.patientId,
            email: item.original.patientData.email,
            firstName: item.original.patientData.firstName,
            lastName: item.original.patientData.lastName,
            timeType: item.original.timeType
        }
        this.setState({
            isOpenPrescriptionModal: true,
            dataModal: data
        })
    }

    handleCancel = async (item) => {
        let data = {
            doctorId: item.original.doctorId,
            patientId: item.original.patientId,
            email: item.original.patientData.email,
            timeType: item.original.timeType
        }
        this.setState({
            isOpenCancelModal: true,
            dataModal: data
        })
    }

    cancelSchedule = async () => {
        let { dataModal } = this.state;
        let res = await postCancelSchedule({
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType
        })
        if (res && res.errCode === 0) {
            toast.success('Huỷ lịch khám thành công')
            this.closeCancelModal()
            await this.getDataPatient();
        } else {
            toast.error('Lỗi hủy lịch khám')
        }
    }

    sendPrescription = async (dataChild) => {
        let { dataModal } = this.state;
        let res = await postSendPrescription({
            email: dataChild.email,
            firstName: dataChild.firstName,
            lastName: dataChild.lastName,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timeType: dataModal.timeType,
        });
        if (res && res.errCode === 0) {
            toast.success('Bệnh nhân thành công')
            this.closePrescriptionModal()
            await this.getDataPatient();
        } else {
            toast.error('Lỗi xác nhận')
        }
    }

    render() {
        let { dataPatient, isOpenCancelModal, isOpenPrescriptionModal, dataModal } = this.state;
        console.log(dataPatient)
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
                        <button className="btn-confirm"
                            onClick={()=> this.handleConfirm(item)}
                        >Xác nhận</button>
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
                        <div className="col-6 form-group">
                            <label>Chọn ngày khám</label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker} 
                                className="form-control"
                                selected={this.state.currentDate}
                                dateFormat="dd/MM/yyyy"
                            />
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
                <PrescriptionModal 
                    isOpenModal={isOpenPrescriptionModal}
                    dataModal={dataModal}
                    closePrescriptionModal={this.closePrescriptionModal}
                    sendPrescription={this.sendPrescription}
                />
                <CancelSchedule
                    isOpenModal={isOpenCancelModal}
                    closeCancelModal={this.closeCancelModal}
                    dataModal={dataModal}
                    cancelSchedule={this.cancelSchedule}
                />
            </>
        )
    }
}

const mapStateToProps = state => { //redux
    return {
        user: state.user.userInfo
    };
};


const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);