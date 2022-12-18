import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageScheduleDoctor.scss';
import { Modal } from 'reactstrap';
import { UilTimes } from '@iconscout/react-unicons';

class DeleteScheduleModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleDelete = () => {
        this.props.deleteSchedule(this.props.currentDelete.original.id)
    }

    render() {
        let { isOpenDelete, closeDeleteModal } = this.props;
        return (
            <>
                <Modal isOpen={isOpenDelete} className="delete-modal-container" size="sm"
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
                        <span>Bạn muốn khoảng thời gian này</span>
                    </div>
                    <div className="delete-modal-footer">
                            <button
                                className="btn-delete-confirm"
                                onClick={()=>this.handleDelete()}
                            >Xác nhận</button>
                            <button
                                className="btn-delete-cancel" onClick={closeDeleteModal}
                            >Hủy bỏ</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteScheduleModal);