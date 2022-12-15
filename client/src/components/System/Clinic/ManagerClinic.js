import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagerClinic.scss';
import 'react-markdown-editor-lite/lib/index.css';
import { createNewClinic, getAllClinic, deleteClinic, editClinic} from '../../../services/userService';
import { toast } from "react-toastify";
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" ;
import { UilPlus } from '@iconscout/react-unicons';
import AddClinicModal from '../Clinic/AddClinicModal';
import EditClinicModal from '../Clinic/EditClinicModal';
import { emitter } from '../../../utils/emitter';
import DeleteClinicModal from './DeleteClinicModal';

class ManagerClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
            isShowAddModal: false,
            isShowEditModal: false,
            isShowDeleteModal: false,
            clinicEditor: [],
        }
    }

    async componentDidMount() {
        await this.getAllClinicReact()
    }

    getAllClinicReact = async () => {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleAddNewClinic = () => {
        this.setState({
            isShowAddModal: true
        })
    }

    handleEdit = async (item) => {
        this.setState({
            isShowEditModal: true,
            clinicEditor: item
        })
    }

    handleDelete = async (item) => {
        this.setState({
            isShowDeleteModal: true,
            clinicEditor: item
        })
    }

    closeAddNewClinic = () => {
        this.setState({
            isShowAddModal: false
        })
    }

    closeEditModal = () => {
        this.setState({
            isShowEditModal: false,
        })
    }

    closeDeleteModal = () => {
        this.setState({
            isShowDeleteModal: false,
        })
    }

    createNewClinic = async (data) => {
        try {
            let res = await createNewClinic(data);
            if (res && res.errCode === 0) {
                await this.getAllClinicReact()
                this.setState({
                    isShowAddModal: false
                })
                toast.success('Tạo thông tin phòng khám thành công')
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            } else {
                toast.error('Lỗi tạo thông tin phòng khám')
            }
        } catch (error) {
            console.error(error)
        }
    }

    handleEditClinic = async (data) => {
        try {
            let res = await editClinic(data)
            if (res && res.errCode === 0) {
                this.setState({
                    isShowEditModal: false
                })
                await this.getAllClinicReact()
                toast.success('Sửa thông tin phòng khám thành công')
            } else {
                toast.error('Lỗi sửa thông tin phòng khám')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteClinic = async (data) => {
        try {
            let res = await deleteClinic(data)
            if (res && res.errCode === 0) {
                this.setState({
                    isShowDeleteModal: false
                })
                toast.success('Xóa phòng khám thành công')
                await this.getAllClinicReact()
            } else {
                toast.error('Lỗi không thể xóa phòng khám')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let {dataClinic, isShowAddModal, isShowEditModal, isShowDeleteModal} = this.state;
        const columns = [
            { Header: 'Tên phòng khám', accessor: 'name', minWidth: 180 },
            { Header: 'Đia chỉ', accessor: 'address', minWidth: 250 },
            { Header: 'Nội dung', accessor: 'descriptionMarkdown', minWidth: 450 },
            {
                Header: 'Thao tác', accessor: 'action', minWidth: 250,
                Cell: (item) => {
                    return(
                    <div className="action">
                        <button className="btn-edit-clinic"
                            onClick={()=> this.handleEdit(item)}
                        >Sửa phòng khám</button>
                        <button className="btn-delete-clinic"
                            onClick={()=> this.handleDelete(item)}
                        >Xóa phòng khám</button>
                    </div>
                )}
            },
        ]
        return (
            <div className="manage-clinic-container">
                <div className="manage-clinic-title">Quản lý phòng khám</div>
                <div className="add-new-clinic row">
                    <AddClinicModal 
                        isOpenModal={isShowAddModal}
                        closeAdd={this.closeAddNewClinic}
                        createNewClinic={this.createNewClinic}
                    />
                    {
                        this.state.isShowEditModal &&
                        <EditClinicModal
                            isOpenEdit={isShowEditModal}
                            closeEditModal={this.closeEditModal}
                            currentClinic={this.state.clinicEditor}
                            editClinic={this.handleEditClinic}
                        />
                    }
                    <DeleteClinicModal 
                        isOpenDelete={isShowDeleteModal}
                        closeDeleteModal={this.closeDeleteModal}
                        currentClinic={this.state.clinicEditor}
                        deleteClinic={this.handleDeleteClinic}
                    />
                    <div className="col-12">
                        <div className="clinic-title">
                            <span>Danh sách phòng khám</span>
                            <button className="btn-add"
                                onClick={() => this.handleAddNewClinic()}
                            >
                                <UilPlus />
                                Thêm phòng khám
                            </button>
                        </div>
                        <ReactTable
                            data={dataClinic}
                            columns={columns}
                            defaultPageSize={10}
                        />
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerClinic);
