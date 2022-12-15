import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagerSpecialty.scss';
import 'react-markdown-editor-lite/lib/index.css';
import { createNewSpecialty, getAllSpecialty, deleteSpecialty, editSpecialty } from '../../../services/userService';
import { toast } from "react-toastify";
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" ;
import { UilPlus } from '@iconscout/react-unicons'
import AddSpecialtyModal from './AddSpecialtyModal';
import EditSpecialtyModal from './EditSpecialtyModal';
import { emitter } from '../../../utils/emitter';
import DeleteSpecialtyModal from './DeleteSpecialtyModal';

class ManagerSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: [],
            isShowAddModal: false,
            isShowEditModal: false,
            isShowDeleteModal: false,
            specialtyEditor: [],
        }
    }

    async componentDidMount() {
        await this.getAllSpecialtyReact();
    }

    getAllSpecialtyReact = async () => {
        let res = await getAllSpecialty()
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState) {

    }

    handleAddNewSpecialty = () => {
        this.setState({
            isShowAddModal: true
        })
    }

    handleEdit = async (item) => {
        this.setState({
            isShowEditModal: true,
            specialtyEditor: item
        })
    }

    handleDelete = async (item) => {
        this.setState({
            isShowDeleteModal: true,
            specialtyEditor: item
        })
    }

    closeAddNewSpecialty = () => {
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

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    createNewSpecialty = async (data) => {
        try {
            let res = await createNewSpecialty(data);
            if (res && res.errCode === 0) {
                this.setState({
                    isShowAddModal: false
                })
                await this.getAllSpecialtyReact();
                toast.success('Tạo thông tin chuyên khoa thành công')
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            } else {
                toast.error('Lỗi tạo thông tin chuyên khoa')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditSpecialty = async (data) => {
        try {
            let res = await editSpecialty(data)
            if (res && res.errCode === 0) {
                this.setState({
                    isShowEditModal: false
                })
                await this.getAllSpecialtyReact()
                toast.success('Sửa thông tin chuyên khoa thành công')
            } else {
                toast.error('Lỗi sửa thông tin chuyên khoa')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteSpecialty = async (data) => {
        try {
            let res = await deleteSpecialty(data)
            if (res && res.errCode === 0) {
                this.setState({
                    isShowDeleteModal: false
                })
                toast.success('Xóa chuyên khoa thành công')
                await this.getAllSpecialtyReact()
            } else {
                toast.error('Lỗi không thể xóa chuyên khoa')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let { dataSpecialty, isShowAddModal, isShowEditModal, isShowDeleteModal } = this.state;
        const columns = [
            { Header: 'Tên chuyên khoa', accessor: 'name', minWidth: 200 },
            { Header: 'Nội dung', accessor: 'descriptionMarkdown', minWidth: 600 },
            {
                Header: 'Thao tác', accessor: 'action', minWidth: 250,
                Cell: (item) => {
                    return(
                    <div className="action">
                        <button className="btn-edit-specialty"
                            onClick={()=> this.handleEdit(item)}
                        >Sửa chuyên khoa</button>
                        <button className="btn-delete-specialty"
                            onClick={()=> this.handleDelete(item)}
                        >Xóa chuyên khoa</button>
                    </div>
                )}
            },
        ]
        return (
            <div className="manage-specialty-container">
                <div className="manage-specialty-title">Quản lý chuyên khoa</div>
                <div className="add-new-specialty row">
                    <AddSpecialtyModal 
                        isOpenModal={isShowAddModal}
                        closeAdd={this.closeAddNewSpecialty}
                        createNewSpecialty={this.createNewSpecialty}
                    />
                    {
                        this.state.isShowEditModal &&
                        <EditSpecialtyModal
                            isOpenEdit={isShowEditModal}
                            closeEditModal={this.closeEditModal}
                            currentSpecialty={this.state.specialtyEditor}
                            editSpecialty={this.handleEditSpecialty}
                        />
                    }
                    <DeleteSpecialtyModal
                        isOpenDelete={isShowDeleteModal}
                        closeDeleteModal={this.closeDeleteModal}
                        currentSpecialty={this.state.specialtyEditor}
                        deleteSpecialty={this.handleDeleteSpecialty}
                    />
                    <div className="col-12">
                        <div className="specialty-title">
                            <span>Danh sách chuyên khoa</span>
                            <button className="btn-add" 
                                onClick={() => this.handleAddNewSpecialty()}
                            >
                                <UilPlus/>
                                Thêm chuyên khoa
                            </button>
                        </div>
                        <ReactTable
                            data={dataSpecialty}
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSpecialty);
