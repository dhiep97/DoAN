import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TableManage.scss';
import * as actions from '../../../store/actions';
class TableManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: []
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
    /**life cycle 
     * Run component
     * 1. Run constructor -> init stateReconciler
     * 2. Did mount (set state) : born; unmount
     * 3. Render
     * 
     */

    render() {
        let arrUsers = this.state.usersRedux;
        return (
            <div className="users-container">
                <div className="users-table mt-3 mx-1">
                    <table id="TableManageUser">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>Tên</th>
                                <th>Họ</th>
                                <th>Địa chỉ</th>
                                <th>Số điện thoại</th>
                                <th>Thao tác</th>
                            </tr> 
                            {arrUsers && arrUsers.length > 0 &&
                                arrUsers.map((item, index) => { 
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>
                                            <button
                                                className="btn-edit"
                                                onClick = {() => this.handleEditUser(item)}
                                            ><i className="fas fa-edit"></i></button>
                                            <button
                                                className="btn-delete"
                                                onClick = {() => this.handleDeleteUser(item)}
                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                            }        
                        </tbody>
                    </table>
                </div>
                
            </div>
        
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManage);
