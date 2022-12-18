import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import photo1 from '../../assets/about/Research.webp';
import photo2 from '../../assets/about/Reviewed.webp';
import photo3 from '../../assets/about/Monitored.webp';
import photo4 from '../../assets/about/Trustworthy.webp';

class About extends Component {

    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    HiduBooking đem đến thông tin sức khỏe mà bạn cần
                </div>
                <div className="section-about-content">
                    <div className="section-about-des">
                        <img src={photo1} alt="" />
                        <div className="title">
                            Dựa trên nguồn thông tin xác thực
                        </div>
                        <div className="description">
                            Tất cả bài viết của HiduBooking đều được viết dựa trên những tin tức y khoa, nghiên cứu và báo cáo khoa học đến từ các tổ chức giáo dục, y tế hàng đầu.
                        </div>
                    </div>
                    <div className="section-about-des">
                        <img src={photo2} alt="" />
                        <div className="title">
                            Được tham vấn y khoa
                        </div>
                        <div className="description">
                            Bài viết trên trang HiduBooking được đội ngũ bác sĩ và chuyên gia y tế của chúng tôi cẩn trọng tư vấn và kiểm duyệt.
                        </div>
                    </div>
                    <div className="section-about-des">
                        <img src={photo3} alt="" />
                        <div className="title">
                            Được cập nhật thường xuyên
                        </div>
                        <div className="description">
                            Chúng tôi làm việc với các bác sĩ và chuyên gia y tế để liên tục cập nhật các bài viết đảm bảo độ chính xác.
                        </div>
                    </div>
                    <div className="section-about-des">
                        <img src={photo4} alt="" />
                        <div className="title">
                            Đáng tin cậy
                        </div>
                        <div className="description">
                            Tại HiduBooking, trang thông tin y tế, sức khỏe hàng đầu thị trường, chúng tôi cam kết đem đến những bài viết chính xác, dễ dàng tiếp cận và cập nhật nhất, giúp bạn đọc có thể đưa ra quyết định đúng đắn nhất cho sức khỏe của bản thân và gia đình.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => { //redux
    return {
        language: state.app.language,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);