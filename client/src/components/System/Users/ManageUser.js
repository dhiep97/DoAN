import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageUser.scss';
import { UilPlus } from '@iconscout/react-unicons'
import * as actions from '../../../store/actions';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" ;

class ManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            isOpenShowModal: false,
            isOpenEditModal: false,
            isOpenDeleteModal: false,
            editUser: []
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenShowModal: true
        })
    }

    closeAddModal = () => {
        this.setState({
            isOpenShowModal: false
        })
    }
    
    handleDeleteUser = (data) => {
        this.setState({
            isOpenDeleteModal: true,
            editUser: data
        })
    }

    handleEditUser = (data) => {
        this.setState({
            isOpenEditModal: true,
            editUser: data
        })
    }

    closeEditModal = () => {
        this.setState({
            isOpenEditModal: false
        })
    }

    closeDeleteModal = () => {
        this.setState({
            isOpenDeleteModal: false
        })
    }

    setUpRole = (roleId) => {
        let element = <div>Bệnh nhân</div>
        if (roleId === 'R1') {
            element = <div>Quản trị viên</div>
        } else if (roleId === 'R2') {
            element = <div>Bác sĩ</div>
        } 
        return element
    }

    render() {
        let arrUsers = this.state.usersRedux;
        let { isOpenShowModal, isOpenEditModal, isOpenDeleteModal } = this.state;
        const columns = [
            {
                Header: 'STT', accessor: 'STT', minWidth: 40, flex: 1,
                Cell: (item) => {
                    return (
                        <span>{item.index + 1}</span>
                    )
                }
            },
            { Header: 'email', accessor: 'email', minWidth: 150, flex: 1 },
            { Header: 'Tên', accessor: 'firstName', minWidth: 100, flex: 1 },
            { Header: 'Họ', accessor: 'lastName', minWidth: 100, flex: 1 },
            { Header: 'Địa chỉ', accessor: 'address', minWidth: 100, flex: 1 },
            { Header: 'Số điện thoại', accessor: 'phoneNumber', minWidth: 100, flex: 1 },
            {
                accessor: 'role', Header: 'Vai trò', minWidth: 110, flex: 1,
                Cell: (item) => {
                    return (
                        <div className={`cellDoctor ${item.original.roleId}`}>
                            {this.setUpRole(item.original.roleId)}
                        </div>
                    );
                },
            },
            {
                accessor: "action", Header: "Thao tác", width: 100, flex: 1,
                Cell: (item) => {
                    return (
                    <div className="action">
                        <div className="btn-edit-user"
                            onClick={() => this.handleEditUser(item)}
                        >Sửa</div>
                        <div className="btn-delete-user"
                            onClick={() => this.handleDeleteUser(item)}
                        >
                            Xóa
                        </div>
                    </div>
                    );
                },
            },
        ]
        return (
            <div className="manage-user-container">
                <div className="manage-user-title">Quản lý tài khoản</div>
                <div className="manage-user-body row">
                    <AddUserModal 
                        isOpenModal={isOpenShowModal}
                        closeAddUser={this.closeAddModal}
                    />
                    {
                        this.state.isOpenEditModal &&
                        <EditUserModal
                            isOpenModal={isOpenEditModal}
                            closeEditUser={this.closeEditModal}
                            currentUser={this.state.editUser}
                        />
                    }
                    {
                        this.state.isOpenDeleteModal &&
                        <DeleteUserModal
                            isOpenModal={isOpenDeleteModal}
                            closeDeleteModal={this.closeDeleteModal}
                            currentUser={this.state.editUser}
                        />
                    }
                    
                    <div className="col-12">
                        <div className="table-user-title">
                            Danh sách tài khoản
                            <button className="btn-add"
                                onClick={() => this.handleAddNewUser()}
                            >
                                <UilPlus/>
                                Thêm tài khoản mới
                            </button>
                        </div>
                        <ReactTable
                            data={arrUsers}
                            columns={columns}
                            defaultPageSize={10}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);