import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageUser.scss';
import { Link } from 'react-router-dom';
import { UilPlus } from '@iconscout/react-unicons'
import { DataGrid } from "@mui/x-data-grid";
import * as actions from '../../../store/actions';

class ManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
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

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }

    render() {
        let arrUsers = this.state.usersRedux;
        const actionColumn = [
            {
                field: "action",
                headerName: "Thao tác",
                width: 200,
                renderCell: (item) => {
                    return (
                    <div className="cellAction">
                        <Link to="/system/add-user-manage" style={{ textDecoration: "none" }}>
                            <div className="viewButton"
                                handleEditUserFromParentKey={this.handleEditUserFromParent}
                                action={this.state.action}
                                onClick={() => this.handleEditUser(item)}
                            >View</div>
                        </Link>
                        <div className="deleteButton"
                            onClick={() => this.handleDeleteUser(item)}
                        >
                            Delete
                        </div>
                    </div>
                    );
                },
            },
        ];
        const columns = [
            { field: 'id', headerName: 'ID', width: 50, editable: true },
            { field: 'email', headerName: 'Email', width: 220, editable: true },
            { field: 'lastName', headerName: 'Họ',  width: 200, editable: true },
            { field: 'firstName', headerName: 'Tên', width: 180, editable: true },
            { field: 'address', headerName: 'Địa chỉ', width: 200, editable: true },
            { field: 'phoneNumber', headerName: 'Số điện thoại', width: 180, editable: true },
        ];
        return (
            <div className="table-user">
                <div className="table-title">
                    Danh sách người dùng
                    <Link to="/system/add-user-manage" className="link">
                        <UilPlus/>
                        Thêm người dùng mới
                    </Link>
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