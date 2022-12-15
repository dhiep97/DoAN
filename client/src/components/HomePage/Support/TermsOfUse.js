import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Support.scss';
import HomeFooter from '../HomeFooter';
import Information from '../Information';
import HomeHeader from '../HomeHeader'

class TermsOfUse extends Component {

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
                    <div className="support-title">Điều khoản sử dụng</div>
                    <div className="support-content">
                    <div className="support-d">Điều khoản và điều kiện sử dụng</div>
                    <div className="support-d">Giới thiệu</div>
                    <p>Chúng tôi, Công ty CP Công nghệ HiduBooking, đơn vị sở hữu và vận hành “Nền tảng Y tế Chăm sóc sức khỏe toàn diện HiduBooking” bao gồm hệ thống website và các ứng dụng di động. HiduBooking cung cấp nền tảng công nghệ để bệnh nhân thuận tiện trong việc đặt lịch dịch vụ y tế với bác sĩ và cơ sở y tế. Bằng việc truy cập hoặc sử dụng dịch vụ của HiduBooking, bạn hoàn toàn đồng ý theo các điều khoản, điều kiện dưới đây.</p>
                    <p>Chúng tôi duy trì quyền thay đổi hoặc điều chỉnh bất kỳ điều khoản và điều kiện nào dưới đây. Mọi sửa đổi nếu có sẽ có hiệu lực ngay lập tức sau khi đăng tải trên hệ thống trang này.</p>
                    <div className="support-d">SỬ DỤNG HiduBooking</div>
                    <div className="support-p">Thông tin người cung cấp dịch vụ “Khám chữa bệnh”</div>
                    <p>Hệ thống HiduBooking đăng tải thông tin và lịch khám của bác sỹ, dịch vụ y tế và cơ sở y tế. Các thông tin về bác sĩ, dịch vụ y tế, cơ sở y tế (gọi chung là “Người cung cấp dịch vụ Khám chữa bệnh”) được cung cấp bởi chính “Người cung cấp dịch vụ Khám chữa bệnh” và các nguồn thông tin tin cậy khác do chúng tôi lựa chọn biên tập.</p>
                    <p>Chúng tôi cố gắng tìm hiểu và lựa chọn thông tin chính xác để đăng tải trên hệ thống. Tuy nhiên, chúng tôi không đủ điều kiện xác minh sự chính xác tuyệt đối của thông tin đã đăng tải.</p>
                    <div className="support-p">Dịch vụ đặt lịch khám trực tuyến</div>
                    <p>HiduBooking cung cấp nền tảng công nghệ, phương tiện để kết nối bệnh nhân và bác sĩ, cơ sở y tế. Qua đó cung cấp dịch vụ đặt lịch khám trực tuyến.</p>
                    <p>Bệnh nhân lựa chọn bác sĩ, dịch vụ hoặc cơ sở y tế phù hợp trên hệ thống HiduBooking để đặt lịch khám. HiduBooking không phải là người cung cấp dịch vụ y tế và cũng không đại diện cho bất kỳ “Người cung cấp dịch vụ khám chữa bệnh” nào. Vai trò duy nhất của chúng tôi là tạo ra các công cụ, phương tiện để cung cấp “dịch vụ đặt lịch khám trực tuyến”.</p>
                    <p>Nhằm hỗ trợ việc đặt lịch khám hiệu quả cao, chúng tôi có thể kết nối thêm với người có nhu cầu đặt lịch thông qua ứng dụng (Apps),tin nhắn SMS, email, dịch vụ OTT và cuộc gọi thoại.</p>
                    <div className="support-p">Sai lệch thời gian & hủy lịch khám</div>
                    <p>Lịch hẹn khám qua hệ thống HiduBooking và thời gian khám thực tế có thể sai khác so với lịch hẹn ban đầu do đặc thù của hoạt động khám chữa bệnh. Chúng tôi cố gắng để giảm thiểu sự sai lệch về thời gian và giảm thiểu thời gian chờ đợi của người bệnh.</p>
                    <p>Lịch hẹn khám có thể bị hủy hoặc thay đổi đột xuất vì một lý do nào đó, ví dụ như bác sĩ có công việc đột xuất. Việc này vẫn thỉnh thoảng xảy ra, nhất là với các bác sĩ, chuyên gia giỏi rất bận rộn. Chúng tôi sẽ thông báo sự thay đổi đó trong thời gian sớm nhất bằng một hoặc đồng thời các ứng dụng tin nhắn SMS, Push, email, dịch vụ OTT và cuộc gọi thoại.</p>
                    <p>Tuy nhiên, vì một lý do nào đó, chẳng hạn như lỗi đường truyền hoặc sai lệch thông tin, bạn có thể không nhận được thông báo kịp thời. Trong trường hợp này, HiduBooking mong nhận được thông tin từ người bệnh để chúng tôi có thể sắp xếp lịch khám bổ sung phù hợp với yêu cầu của bạn.</p>
                    <div className="support-p">Phí dịch vụ đặt lịch</div>
                    <p>Thời điểm hiện tại, HiduBooking cung cấp dịch vụ đặt lịch khám trực tuyến hoàn toàn miễn phí đối với người bệnh khi đặt lịch khám thông qua HiduBooking.</p>
                    <p>Trong một số trường hợp, bệnh nhân còn nhận được ưu đãi chi phí khám chữa bệnh khi đặt qua hệ thống.</p>
                    <div className="support-p">Quyền miễn trừ</div>
                    <p>HiduBooking cung cấp “dịch vụ đặt lịch khám”, chúng tôi không cung cấp dịch vụ y tế và không đại diện cho bất kỳ “Người cung cấp dịch vụ khám chữa bệnh” nào. Chúng tôi không chịu trách nhiệm về chất lượng, hiệu quả khám chữa bệnh, chi phí, giá cả dịch vụ mà bạn nhận được từ “Người cung cấp dịch vụ khám chữa bệnh”.</p>
                    <p>Chúng tôi cũng không chịu trách nhiệm pháp lý liên quan đến hoạt động khám chữa bệnh của “người cung cấp dịch vụ khám chữa bệnh”.</p>
                    <div className="support-p">Giới hạn trách nhiệm pháp lý</div>
                    <p>Chúng tôi chịu trách nhiệm pháp lý về những gì không thể bị loại trừ theo quy định của pháp luật Việt Nam.</p>
                    <p>Những phát sinh (nếu có) liên quan tới việc sử dụng dịch vụ đặt lịch khám HiduBooking sẽ được hỗ trợ như mục “vai trò của HiduBooking”</p>
                    <div className="support-d">Vai trò của HiduBooking</div>
                    <div className="support-p">Hỗ trợ trước, trong và sau khi đi khám</div>
                    <p>Trước khám</p>
                    <li>Nhắc lịch khám, dặn dò chuẩn bị trước khám</li>
                    <li>Hướng dẫn đi lại, qui trình làm thủ tục khám</li>
                    <p>Trong khi khám</p>
                    <li>Hỗ trợ giải quyết các vướng mắc trong khi khám</li>
                    <li>Hỗ trợ người bệnh những yêu cầu nảy sinh</li>
                    <p>Sau khi khám</p>
                    <li>Ghi nhận ý kiến của bệnh nhân sau khám</li>
                    <li>Hỗ trợ giải đáp, làm rõ những vấn đề chuyên môn (nếu có yêu cầu)</li>
                    <li>Hỗ trợ quyền lợi của bệnh nhân sau khi đi khám (nếu có yêu cầu)</li>
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

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse);