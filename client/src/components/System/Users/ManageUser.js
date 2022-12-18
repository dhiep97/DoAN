import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageUser.scss';
import { Link } from 'react-router-dom';
import { UilPlus } from '@iconscout/react-unicons'
import { DataGrid } from "@mui/x-data-grid";
import * as actions from '../../../store/actions';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';

class ManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            isOpenShowModal: false,
            isOpenEditModal: false,
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
    
    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.row.id)
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
        let { isOpenShowModal, isOpenEditModal } = this.state;
        const actionColumn = [
            {
                field: 'role', headerName: 'Vai trò', width: 110, editable: true, flex: 1,
                renderCell: (item) => {
                    return (
                        <div className={`cellWithStatus ${item.row.roleId}`}>
                            {this.setUpRole(item.row.roleId)}
                        </div>
                    );
                },
            },
            {
                field: "action",
                headerName: "Thao tác",
                width: 200,
                flex: 1,
                renderCell: (item) => {
                    return (
                    <div className="cellAction">
                        <div className="viewButton"
                            onClick={() => this.handleEditUser(item)}
                        >Sửa</div>
                        <div className="deleteButton"
                            onClick={() => this.handleDeleteUser(item)}
                        >
                            Xóa
                        </div>
                    </div>
                    );
                },
            },
        ];
        const columns = [
            { field: 'id', headerName: 'ID', width: 50, editable: true },
            { field: 'email', headerName: 'Email', width: 220, editable: true, flex: 1 },
            {
                field: 'fullName', headerName: 'Họ và tên', width: 200, editable: true, flex: 1,
                renderCell: (item) => {
                    return (
                        <span>{item.row.lastName + ' ' + item.row.firstName}</span>
                    )
                }
            },
            { field: 'address', headerName: 'Địa chỉ', width: 200, editable: true, flex: 1 },
            { field: 'phoneNumber', headerName: 'Số điện thoại', width: 180, editable: true, flex: 1 },
        ];
        return (
            <div className="table-user">
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
                <div className="table-title">
                    Danh sách người dùng
                    <button className="link"
                        onClick={() => this.handleAddNewUser()}
                    >
                        <UilPlus/>
                        Thêm người dùng mới
                    </button>
                </div>
                <div style={{ height: 630, width: '100%' }}>
                    <DataGrid
                        rows={arrUsers}
                        columns={columns.concat(actionColumn)}
                        experimentalFeatures={{ newEditingApi: true }}
                        pageSize={10}
                    />
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
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);