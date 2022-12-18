import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PrescriptionModal.scss';
import { Modal } from 'reactstrap';
import { UilTimes } from '@iconscout/react-unicons';
import { CommonUtils } from '../../../utils';

class PrescriptionModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            timeType: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                firstName: this.props.dataModal.firstName,
                lastName: this.props.dataModal.lastName,
                timeType: this.props.dataModal.timeType,
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email,
                firstName: this.props.dataModal.firstName,
                lastName: this.props.dataModal.lastName,
                timeType: this.props.dataModal.timeType,
            })
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleSendPrescription = () => {
        this.props.sendPrescription(this.state)
    }
    render() {
        let { isOpenModal, closePrescriptionModal } = this.props;
        return (
            <>
                <Modal isOpen={isOpenModal} className="prescription-modal-container" size="md"
                    centered
                >
                    <div className="prescription-modal-content">
                        <div className="prescription-modal-header">
                            <span className="left">Xác nhận bệnh nhân đến khám bệnh</span>
                            <span
                                className="right"
                                onClick={closePrescriptionModal}
                            ><UilTimes /></span>
                        </div>
                        <div className="row prescription-modal-body">
                            <div className="col-6 form-group">
                                <label>Email bệnh nhân</label>
                                <input className="form-control" type="email" value={this.state.email || ''}
                                    onChange={(event)=>this.handleOnChangeInput(event, 'email')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Tên bệnh nhân</label>
                                <input className="form-control" type="email" value={this.state.firstName || ''}
                                    onChange={(event)=>this.handleOnChangeInput(event, 'firstName')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Họ bệnh nhân</label>
                                <input className="form-control" type="email" value={this.state.lastName || ''}
                                    onChange={(event)=>this.handleOnChangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Thời gian đến khám</label>
                                <p>{this.state.timeType}</p>
                            </div>
                        </div>
                        <div className="prescription-modal-footer">
                            <button
                                className="btn-prescription-confirm"
                                onClick={()=>this.handleSendPrescription()}
                            >Đã khám xong</button>
                            <button
                                className="btn-prescription-cancel" onClick={closePrescriptionModal}
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

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionModal);