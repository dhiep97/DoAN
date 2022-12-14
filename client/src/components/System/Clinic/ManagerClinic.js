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
                toast.success('T???o th??ng tin ph??ng kh??m th??nh c??ng')
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            } else {
                toast.error('L???i t???o th??ng tin ph??ng kh??m')
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
                toast.success('S???a th??ng tin ph??ng kh??m th??nh c??ng')
            } else {
                toast.error('L???i s???a th??ng tin ph??ng kh??m')
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
                toast.success('X??a ph??ng kh??m th??nh c??ng')
                await this.getAllClinicReact()
            } else {
                toast.error('L???i kh??ng th??? x??a ph??ng kh??m')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let {dataClinic, isShowAddModal, isShowEditModal, isShowDeleteModal} = this.state;
        const columns = [
            {
                Header: 'STT', accessor: 'STT', minWidth: 50,
                Cell: (item) => {
                    return (
                        <span>{item.index + 1}</span>
                    )
                }
            },
            { Header: 'T??n ph??ng kh??m', accessor: 'name', minWidth: 180 },
            { Header: '??ia ch???', accessor: 'address', minWidth: 250 },
            { Header: 'N???i dung', accessor: 'descriptionMarkdown', minWidth: 450 },
            {
                Header: 'Thao t??c', accessor: 'action', minWidth: 100,
                Cell: (item) => {
                    return(
                    <div className="action">
                        <button className="btn-edit-clinic"
                            onClick={()=> this.handleEdit(item)}
                        >S???a</button>
                        <button className="btn-delete-clinic"
                            onClick={()=> this.handleDelete(item)}
                        >X??a</button>
                    </div>
                )}
            },
        ]
        return (
            <div className="manage-clinic-container">
                <div className="manage-clinic-title">Qu???n l?? ph??ng kh??m</div>
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
                            <span>Danh s??ch ph??ng kh??m</span>
                            <button className="btn-add"
                                onClick={() => this.handleAddNewClinic()}
                            >
                                <UilPlus />
                                Th??m ph??ng kh??m
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
