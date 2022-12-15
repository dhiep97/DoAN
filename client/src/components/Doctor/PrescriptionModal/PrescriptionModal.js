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
            imageBase64: '',
        }
    }

    async componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataModal !== this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            })
        }
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
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
                            <span className="left">Gửi hóa đơn khám bệnh</span>
                            <span
                                className="right"
                                onClick={closePrescriptionModal}
                            ><UilTimes /></span>
                        </div>
                        <div className="row prescription-modal-body">
                            <div className="col-6 form-group">
                                <label>Email bệnh nhân</label>
                                <input className="form-control" type="email" value={this.state.email}
                                    onChange={(event)=>this.handleOnChangeEmail(event)}
                                />
                            </div>
                            <div className="col-6 form-group">
                                <label>Chọn file đơn thuốc</label>
                                <input className="form-control-file" type="file"
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                            </div>
                        </div>
                        <div className="prescription-modal-footer">
                            <button
                                className="btn-prescription-confirm"
                                onClick={()=>this.handleSendPrescription()}
                            >Gửi hóa đơn</button>
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