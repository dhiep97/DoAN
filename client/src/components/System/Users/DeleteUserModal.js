import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageUser.scss';
import { UilTimes } from '@iconscout/react-unicons'
import { Modal } from 'reactstrap';
import * as actions from "../../../store/actions"


class DeleteUserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    async componentDidMount() {
        
    }

    handleDelete = () => {
        this.props.deleteUserRedux(this.props.currentUser.original.id);
        this.props.closeDeleteModal()
    }
    
    render() {
        let { isOpenModal, closeDeleteModal } = this.props;
        
        return (
            <Modal isOpen={isOpenModal} className="delete-modal-container" size="sm"
                centered
            >
                <div className="delete-modal-header">
                    <span className="left">Thông báo</span>
                        <span
                            className="right"
                            onClick={closeDeleteModal}
                    ><UilTimes /></span>
                </div>
                <div className="delete-modal-body">
                    <span>Bạn chắc chắn muốn xóa tài khoản này</span>
                </div>
                <div className="delete-modal-footer">
                    <button className="btn-delete-confirm"
                        onClick={() => this.handleDelete()}
                    >Xác nhận</button>
                    <button className="btn-delete-cancel"
                        onClick={closeDeleteModal}
                    >Hủy bỏ</button>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => { //redux
    return {
        
    };
};


const mapDispatchToProps = dispatch => {
    return {
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserModal);