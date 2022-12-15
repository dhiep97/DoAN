import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeFooter from '../HomeFooter';
import Information from '../Information'
import './Support.scss';
import HomeHeader from '../HomeHeader'

class PrivacyPolicy extends Component {

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
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className="support-container">
                    <div className="support-title">Chính sách bảo mật</div>
                    <div className="support-content">
                        <div className="support-p">1. Mục đích và phạm vi thu thập</div>
                        <p>Việc thu thập dữ liệu chủ yếu trên Sàn giao dịch TMĐT HiduBooking.vn bao gồm: email, điện thoại, tên đăng nhập, mật khẩu đăng nhập, địa chỉ khách hàng (thành viên). Đây là các thông tin mà HiduBooking.vn cần thành viên cung cấp bắt buộc khi đăng ký sử dụng dịch vụ và để HiduBooking.vn liên hệ xác nhận khi khách hàng đăng ký sử dụng dịch vụ trên Website nhằm đảm bảo quyền lợi cho cho người tiêu dùng. </p>
                        <p>Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới tên đăng ký, mật khẩu và hộp thư điện tử của mình. Ngoài ra, thành viên có trách nhiệm thông báo kịp thời cho Sàn giao dịch TMĐT HiduBooking.vn về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp. </p>
                        <div className="support-p">2. Phạm vi sử dụng thông tin</div>
                        <p>Sàn giao dịch TMĐT HiduBooking.vn sử dụng thông tin thành viên cung cấp để:</p>
                        <li>Cung cấp các dịch vụ đến Thành viên;</li>
                        <li>Gửi các thông báo về các hoạt động trao đổi thông tin giữa thành viên và Sàn giao dịch TMĐT HiDuBooking.vn;</li>
                        <li>Ngăn ngừa các hoạt động phá hủy tài khoản người dùng của thành viên hoặc các hoạt động giả mạo Thành viên;</li>
                        <li>Liên lạc và giải quyết với thành viên trong những trường hợp đặc biệt.</li>
                        <li>Trong trường hợp có yêu cầu của pháp luật: Sàn giao dịch TMĐT HiduBooking.vn có trách nhiệm hợp tác cung cấp thông tin cá nhân thành viên khi có yêu cầu từ cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan công an điều tra liên quan đến hành vi vi phạm pháp luật nào đó của khách hàng. Ngoài ra, không ai có quyền xâm phạm vào thông tin cá nhân của thành viên.</li>
                        <div className="support-p">3. Thời gian lưu trữ thông tin</div>
                        <p>Dữ liệu cá nhân của Thành viên sẽ được lưu trữ cho đến khi có yêu cầu hủy bỏ hoặc tự thành viên đăng nhập và thực hiện hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của HiduBooking.vn.</p>
                        <div className="support-p">4. Những người hoặc tổ chức có thể được tiếp cận với thông tin cá nhân:</div>
                        <p>Đối tượng được tiếp cận với thông tin cá nhân của khách hàng/ thành viên thuộc một trong những trường hợp sau:</p>
                        <li>Công Ty Cổ Phần Công Nghệ HiduBooking</li>
                        <li>Các đối tác có ký hợp động thực hiện 1 phần dịch vụ do Công Ty Cổ Phần Công Nghệ HiduBooking.vn cung cấp. Các đối tác này sẽ nhận được những thông tin theo thỏa thuận hợp đồng (có thể 1 phần hoặc toàn bộ thông tin tùy theo điều khoản hợp đồng) để tiến hành hỗ trợ người dùng sử dụng dịch vụ do Công ty cung cấp.</li>
                        <li>Cơ quan nhà nước khi có yêu cầu Công ty cung cấp thông tin người dùng để phục vụ quá trình điều tra.</li>
                        <li>Người mua và Đối tác CSYT xảy ra tranh chấp và yêu cầu Công ty là đơn vị hòa giải.</li>
                        <div className="support-p">5. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</div>
                        <li>Công Ty Cổ Phần Công Nghệ HiduBooking</li>
                        <li>Địa chỉ: Số 59 Giải Phóng, P.Đồng Tâm, Q.Hai Bà Trưng, Hà Nội</li>
                        <li>Hotline: 0916.758.017</li>
                        <li>Email: hiep45960@nuce.edu.vn</li>
                        <div className="support-p">6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình.</div>
                        <p>Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách đăng nhập vào tài khoản và chỉnh sửa thông tin cá nhân hoặc yêu cầu HiduBooking.vn thực hiện việc này.</p>
                        <p>Thành viên có quyền gửi khiếu nại về việc lộ thông tin các nhân cho bên thứ 3 đến Ban quản trị của Sàn giao dịch thương mại điện tử HiduBooking.vn. Khi tiếp nhận những phản hồi này, HiduBooking.vn sẽ xác nhận lại thông tin, phải có trách nhiệm trả lời lý do và hướng dẫn thành viên khôi phục và bảo mật lại thông tin.</p>
                        <p>Email: hiep45960@nuce.edu.vn</p>
                    </div>
                    <Information />
                    <HomeFooter/>
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivacyPolicy);