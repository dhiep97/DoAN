import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postVerifyBookingAppointment } from '../../../services/userService';
import HomeHeader from '../../HomePage/HomeHeader'
import './VerifyEmail.scss';

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let timeType = urlParams.get('timeType');
            let res = await postVerifyBookingAppointment({
                token: token,
                doctorId: doctorId,
                timeType: timeType,
            })
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                }) 
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <>
                <HomeHeader />
                <div className="verify-email-container">
                    {statusVerify === false ?
                        <div>
                            Loading...
                        </div>
                        :
                        <div>
                            {+errCode === 0 ? 
                                <div className="info-booking">
                                    <p>Xác nhận lịch hẹn thành công!</p>
                                    <p>Mọi thắc mắc vui lòng liên hệ email:hiep45960@nuce.edu.vn</p>
                                </div>
                                :
                                <div className="info-booking">
                                    <p>Lịch hẹn không tồn tại hoặc đã được xác nhận!</p>
                                    <p>Mọi thắc mắc vui lòng liên hệ email:hiep45960@nuce.edu.vn</p>
                                </div>
                            }
                        </div>
                    }
                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);