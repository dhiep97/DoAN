import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CancelSchedule.scss';
import { Modal } from 'reactstrap';
import { UilTimes } from '@iconscout/react-unicons';

class CancelSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleCancelSchedule = () => {
        this.props.cancelSchedule(this.state)
    }
    render() {
        let { isOpenModal, closeCancelModal } = this.props;
        return (
            <>
                <Modal isOpen={isOpenModal} className="cancel-schedule-modal-container" size="sm"
                    centered
                >
                    <div className="cancel-schedule-modal-header">
                        <span className="left">Thông báo</span>
                        <span
                            className="right"
                            onClick={closeCancelModal}
                        ><UilTimes /></span>
                    </div>
                    <div className="cancel-schedule-modal-body">
                        <span>Bệnh nhân đã hủy lịch khám bệnh, không tới khám hoặc hẹn ngày khác</span>
                    </div>
                    <div className="cancel-schedule-modal-footer">
                            <button
                                className="btn-cancel-schedule-confirm"
                                onClick={()=>this.handleCancelSchedule()}
                            >Xác nhận</button>
                            <button
                                className="btn-cancel-schedule-cancel" onClick={closeCancelModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(CancelSchedule);