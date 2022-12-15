import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailHandbook.scss';
import HomeFooter from '../HomePage/HomeFooter';
import Information from '../HomePage/Information';
import HomeHeader from '../HomePage/HomeHeader';
import { getDetailHandbookById } from '../../services/userService';
import _ from 'lodash';
import moment from 'moment';

class DetailHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDetailHandbook: {},
            
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailHandbookById({
                id: id,
            });
            if (res && res.errCode === 0) {
                this.setState({
                    dataDetailHandbook: res.data,
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        let { dataDetailHandbook } = this.state;
        let createdAt = moment(new Date(dataDetailHandbook.createdAt)).format('DD-MM-YYYY')
        let updatedAt = moment(new Date(dataDetailHandbook.updatedAt)).format('DD-MM-YYYY')
        let imageBase64 = '';
        if (dataDetailHandbook.image) {
            imageBase64 = new Buffer.from(dataDetailHandbook.image, 'base64').toString('binary');
        }
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className="detail-handbook-container">
                {dataDetailHandbook && !_.isEmpty(dataDetailHandbook) &&
                    <>
                        <div className="detail-handbook-title">
                            {dataDetailHandbook.title}
                        </div>
                        <div className="detail-handbook-info">
                            <div>Nhóm tác giả: {dataDetailHandbook.author}</div>
                            <div>Xuất bản: {createdAt}, Cập nhật lần cuối: {updatedAt}</div>
                        </div>
                        <div className="detail-handbook-description">HiduBooking là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 150 bệnh viện - phòng khám uy tín, hơn 1,000 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.</div>
                        <div className="detail-handbook-image" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                        <div className="detail-handbook-content">
                            <div dangerouslySetInnerHTML={{ __html: dataDetailHandbook.descriptionHTML }}></div>
                        </div>
                    </>
                }
                </div>
                <Information />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailHandbook);