import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddUserModal.scss';
import { Modal } from 'reactstrap';
import { UilTimes } from '@iconscout/react-unicons'

class AddUserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    render() {
        let {isOpenModal, closeBooingModal, dataTime} = this.props;
        return (
            <>
                <Modal isOpen={isOpenModal} className="add-user-modal-container" size="lg"
                    centered
                >
                    <div className="add-user-modal-content">
                        <div className="add-user-modal-header">
                            <span className="left">Thông tin đặt lịch khám bệnh</span>
                            <span
                                className="right"
                                onClick={closeBooingModal}
                            ><UilTimes /></span>
                        </div>
                        <div className="add-user-modal-body">
                            {/* {JSON.stringify(dataTime)} */}
                            <div className="doctor-info">

                            </div>
                            <div className="price">Gia kham 200</div>
                            <div className="row">
                                <div className="col-6 form-group">
                                    <label>Họ và tên</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Số điện thoại</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ e-mail</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Địa chỉ liên hệ</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="col-12 form-group">
                                    <label>Lý do khám</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Đặt cho ai</label>
                                    <input className="form-control"/>
                                </div>
                                <div className="col-6 form-group">
                                    <label>Giới tính</label>
                                    <input className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="add-user-modal-footer">
                            <button
                                className="btn-add-user-confirm"
                                onClick={closeBooingModal}
                            >Xác nhận</button>
                            <button
                                className="btn-add-user-cancel" onClick={closeBooingModal}
                            >Hủy bỏ</button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

const mapStateToProps = state => { //redux
    return {
        
    };
};


const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);