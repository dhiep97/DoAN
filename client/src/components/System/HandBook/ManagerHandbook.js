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
                toast.success('T???o th??ng tin c???m nang th??nh c??ng')
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            } else {
                toast.error('L???i t???o th??ng tin c???m nang')
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
                toast.success('S???a th??ng tin c???m nang th??nh c??ng')
            } else {
                toast.error('L???i s???a th??ng tin c???m nang')
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
                toast.success('X??a b??i vi???t th??nh c??ng')
                await this.getAllHandbookReact()
            } else {
                toast.error('L???i kh??ng th??? x??a b??i vi???t')
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let { dataHandbook, isShowAddModal, isShowEditModal, isShowDeleteModal } = this.state;
        const columns = [
            {
                Header: 'STT', accessor: 'STT', minWidth: 50,
                Cell: (item) => {
                    return (
                        <span>{item.index + 1}</span>
                    )
                }
            },
            { Header: 'T??c gi???', accessor: 'author', minWidth: 150 },
            { Header: 'Ti??u ?????', accessor: 'title', minWidth: 300 },
            { Header: 'N???i dung', accessor: 'descriptionMarkdown', minWidth: 500 },
            {
                Header: 'Thao t??c', accessor: 'action', minWidth: 100,
                Cell: (item) => {
                    return(
                    <div className="action">
                        <button className="btn-edit-handbook"
                            onClick={()=> this.handleEdit(item)}
                        >S???a</button>
                        <button className="btn-delete-handbook"
                            onClick={()=> this.handleDelete(item)}
                        >X??a</button>
                    </div>
                )}
            },
        ]

        return (
            <div className="manager-handbook-container">
                <div className="manage-handbook-title">Qu???n l?? c???m nang</div>
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
                            <span>Danh s??ch b??i vi???t</span>
                            <button className="btn-add" 
                                onClick={() => this.handleAddNewHandbook()}
                            >
                                <UilPlus/>
                                Th??m b??i vi???t
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
