import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorInfo.scss';
import { getDoctorInfoById } from '../../../services/userService';
import { NumericFormat } from 'react-number-format';

class DoctorInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            info: {}
        }
    }

    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getDoctorInfoById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    info: res.data,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getDoctorInfoById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    info: res.data,
                })
            }
            
        }
    }

    showPricedInfo = (status) => {
        this.setState({
            isShow: status
        })
    }

    render() {
        let { isShow, info } = this.state;
        return (
            <div className="doctor-info-container">
                <div className="content-up">
                    <div className="title-address">ĐỊA CHỈ KHÁM</div>
                    <div className="name-clinic">{info && info.nameClinic ? info.nameClinic : ''}</div>
                    <div className="detail-address">{info && info.addressClinic ? info.addressClinic : ''}</div>
                </div>
                <div className="content-down">
                    {isShow === false ? 
                        <div className="content-price">
                            GIÁ KHÁM: <NumericFormat displayType="text" thousandSeparator="," value={info && info.priceData ? info.priceData.valueVi :''}/>đ
                            <span className="span" onClick={() => this.showPricedInfo(true)}>Xem chi tiết</span>
                        </div>
                        
                        :<>
                            <div className="title-price">GIÁ KHÁM:</div>
                            <div className="detail-price">
                                <div className="de-price">
                                    <span className="left">Giá khám</span>
                                <span className="right"><NumericFormat displayType="text" thousandSeparator="," value={info && info.priceData ? info.priceData.valueVi :''}/>đ</span>
                                </div>
                                <div className="price-content">
                                    {info && info.note ? info.note : '...'}
                                </div>
                                <div className="payment-content">
                                    Bệnh viện có thanh toán bằng hình thức <span>{info && info.paymentData ? info.paymentData.valueVi :''}</span>
                                </div>
                            </div>
                            <div className="ti">
                                <span onClick={() => this.showPricedInfo(false)}>Ẩn bảng giá</span>
                            </div>
                        </>
                    }
                </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);