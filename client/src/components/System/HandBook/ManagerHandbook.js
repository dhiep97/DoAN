import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagerHandbook.scss'
import { createNewHandbook, getAllHandbook, deleteHandbook, editHandbook } from '../../../services/userService';
import { toast } from "react-toastify";
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" ;
import { UilPlus } from '@iconscout/react-unicons'
import AddHandbookModal from './AddHandbookModal';
import EditHandbookModal from './EditHandbookModal';
import DeleteHandbookModal from './DeleteHandbookModal'
import { emitter } from '../../../utils/emitter';

class ManagerHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: [],
            isShowAddModal: false,
            isShowEditModal: false,
            isShowDeleteModal: false,
            handbookEditor: [],
        }
    }

    async componentDidMount() {
        await this.getAllHandbookReact();
    }

    getAllHandbookReact = async () => {
        let res = await getAllHandbook()
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        
    }

    handleAddNewHandbook = () => {
        this.setState({
            isShowAddModal: true
        })
    }

    handleEdit = async (item) => {
        this.setState({
            isShowEditModal: true,
            handbookEditor: item
        })
    }

    handleDelete = async (item) => {
        this.setState({
            isShowDeleteModal: true,
            handbookEditor: item
        })
    }

    closeAddNewHandbook = () => {
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

    createNewHandbook = async (data) => {
        try {
            let res = await createNewHandbook(data);
            if (res && res.errCode === 0) {
                this.setState({
                    isShowAddModal: false
                })
                await this.getAllHandbookReact();
                toast.success('Tạo thông tin cẩm nang thành công')
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            } else {
                toast.error('Lỗi tạo thông tin cẩm nang')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditHandbook = async (data) => {
        try {
            let res = await editHandbook(data)
            if (res && res.errCode === 0) {
                this.setState({
                    isShowEditModal: false
                })
                await this.getAllHandbookReact()
                toast.success('Sửa thông tin cẩm nang thành công')
            } else {
                toast.error('Lỗi sửa thông tin cẩm nang')
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteHandbook = async (data) => {
        try {
            let res = await deleteHandbook(data)
            if (res && res.errCode === 0) {
                this.setState({
                    isShowDeleteModal: false
                })
                toast.success('Xóa bài viết thành công')
                await this.getAllHandbookReact()
            } else {
                toast.error('Lỗi không thể xóa bài viết')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let { dataHandbook, isShowAddModal, isShowEditModal, isShowDeleteModal } = this.state;
        const columns = [
            { Header: 'Tác giả', accessor: 'author', minWidth: 150 },
            { Header: 'Tiêu đề', accessor: 'title', minWidth: 300 },
            { Header: 'Nội dung', accessor: 'descriptionMarkdown', minWidth: 500 },
            {
                Header: 'Thao tác', accessor: 'action', minWidth: 250,
                Cell: (item) => {
                    return(
                    <div className="action">
                        <button className="btn-edit-handbook"
                            onClick={()=> this.handleEdit(item)}
                        >Sửa bài viết</button>
                        <button className="btn-delete-handbook"
                            onClick={()=> this.handleDelete(item)}
                        >Xóa bài viết</button>
                    </div>
                )}
            },
        ]

        return (
            <div className="manager-handbook-container">
                <div className="manage-handbook-title">Quản lý cẩm nang</div>
                <div className="add-new-handbook">
                    <AddHandbookModal 
                        isOpenModal={isShowAddModal}
                        closeAdd={this.closeAddNewHandbook}
                        createNewHandbook={this.createNewHandbook}
                    />
                    {
                        this.state.isShowEditModal &&
                        <EditHandbookModal
                            isOpenEdit={isShowEditModal}
                            closeEditModal={this.closeEditModal}
                            currentHandbook={this.state.handbookEditor}
                            editHandbook={this.handleEditHandbook}
                        />
                    }
                    <DeleteHandbookModal 
                        isOpenDelete={isShowDeleteModal}
                        closeDeleteModal={this.closeDeleteModal}
                        currentHandbook={this.state.handbookEditor}
                        deleteHandbook={this.handleDeleteHandbook}
                    />
                
                    <div className="col-12">
                        <div className="handbook-title">
                            <span>Danh sách bài viết</span>
                            <button className="btn-add" 
                                onClick={() => this.handleAddNewHandbook()}
                            >
                                <UilPlus/>
                                Thêm bài viết
                            </button>
                        </div>
                        <ReactTable
                            data={dataHandbook}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerHandbook);
