import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomeHeader';
import './TinhBMI.scss';
import bmi from '../../../assets/handbook/bmi.jpg';
import bmi1 from '../../../assets/handbook/bmi.png';
import Information from '../Information';
import HomeFooter from '../HomeFooter';
import item from '../../../assets/Header/toolsIconBmi.svg'

class TinhBMI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: '',
            weight: '',
            result: '',
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleOnChange = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleResult = () => {
        let { height, result, weight, comment } = this.state;
        let a = '';
        a = weight / (height/100 * 2);
        result = a;
        
        if (result < 16) {
            comment = 'Chỉ số BMI ở trên cho thấy bạn bị gầy độ III ! '
        } else if (16 <= result && result <= 17) {
            comment = 'Chỉ số BMI ở trên cho thấy bạn bị gầy độ II ! '
        } else if (17 <= result && result < 18.5) {
            comment = 'Chỉ số BMI ở trên cho thấy bạn bị gầy độ I ! '
        } else if (18.5 <= result && result < 25) {
            comment = 'Chúc mừng bạn! Chỉ số của bạn bình thường '
        } else if (25 <= result && result < 30) {
            comment = 'Chỉ số BMI ở trên cho thấy bạn bị thừa cân '
        } else if (30 <= result && result < 35) {
            comment = 'Chỉ số BMI ở trên cho thấy bạn bị béo phì độ I ! '
        } else if (35 <= result && result < 40) {
            comment = 'Chỉ số BMI ở trên cho thấy bạn bị béo phì độ II ! '
        } else{
            comment = 'Chỉ số BMI ở trên cho thấy bạn bị béo phì độ III ! '
        }
        this.setState({
            result: result,
            comment : comment
        })
    }

    render() {
        let { height, weight, result, comment } = this.state;
        return (
            <div className="bmi-container">
                <HomeHeader/>
                <div className="bmi-title">
                    <div className="bmi-left">
                        <h2>Đo chỉ số cân nặng - chiều cao (BMI)</h2>
                        <p>Sử dụng công cụ này để kiểm tra chỉ số khối cơ thể (BMI) để biết bạn có đang ở mức cân nặng hợp lý hay không. Bạn cũng có thể kiểm tra chỉ số BMI của trẻ tại đây.</p>
                    </div>
                    <img src={item} alt="" />
                </div>
                <div className="row bmi-content">
                    <div className="col-12">
                        <label>Nhập chiều cao của bạn:</label>
                        <input className="form-control" type="text" placeholder="Tính theo cm"
                            value={height} onChange={(event)=>this.handleOnChange(event, 'height')}
                        />
                    </div>
                    <div className="col-12">
                        <label>Nhập cân nặng của bạn:</label>
                        <input className="form-control" type="text" placeholder="Tính theo kg"
                            value={weight} onChange={(event)=>this.handleOnChange(event, 'weight')}
                        />
                    </div>
                    <div className="col-12 button-kq">
                        <button className="btn-kq"
                            onClick={() =>this.handleResult()}
                        >
                            Xem kết quả
                        </button>
                    </div>
                    <div className="col-12">
                        <label>Kết quả BMI của bạn:</label>
                        <input className="form-control" type="text"
                            value={result} onChange={(event)=>this.handleOnChange(event, 'result')}
                        />
                    </div>
                    <div className="col-12">
                        <label>Kết quả BMI của bạn:</label>
                        <input className="form-control" type="text"
                            value={comment || ''} onChange={(event)=>this.handleOnChange(event, 'comment')}
                        />
                    </div>
                    <div className='bmi-des'>
                        <p className="bmi-t">THÔNG TIN VỀ CHỈ SỐ BMI</p>
                        <p className='bmi-i'>BMI (Body mass Index) là chỉ số được tính từ chiều cao và cân nặng, là một chỉ số đáng tin cậy về sự mập ốm của một người.</p>
                        <p>BMI không đo lường trực tiếp mỡ của cơ thể nhưng các nghiên cứu đã chứng minh rằng BMI tương quan với đo mỡ trực tiếp. BMI là phương pháp không tốn kém và dễ thực hiện để tầm soát vấn đề sức khoẻ.</p>
                        <p className="bmi-b">1. Sử dụng BMI như thế nào?</p>
                        <p>BMI được sử dụng như là một công cụ tầm soát để xác định trọng lượng thích hợp cho người lớn. Tuy nhiên, BMI không phải là công cụ chẩn đoán. Ví dụ, một người có chỉ số BMI cao, để xác định trọng lượng có phải là một nguy cơ cho sức khoẻ không thì các bác sĩ cần thực hiện thêm các đánh giá khác. Những đánh giá này gồm đo độ dày nếp da, đánh giá chế độ ăn, hoạt động thể lực, tiền sử gia đình và các sàng lọc sức khoẻ khác.</p>
                        <p className="bmi-b">2. Tại sao Cơ quan kiểm soát bệnh tật Hoa Kỳ - CDC sử dụng BMI để xác định sự thừa cân và béo phì?</p>
                        <p>Tính chỉ số BMI là một phương pháp tốt nhất để đánh giá thừa cân và béo phì cho một quần thể dân chúng. Để tính chỉ số BMI, người ta chỉ yêu cầu đo chiều cao và cân nặng, không tốn kém và dễ thực hiện. Sử dụng chỉ số BMI cho phép người ta so sánh tình trạng cân nặng của họ với quần thể nói chung. Công thức tính BMI theo đơn vị kilograms và mét (xem cách tính dưới đây)</p>
                        <img src={bmi} alt="" />
                        <p className='bmi-b'>-  Cách đánh giá chỉ số BMI</p>
                        <p>Đối với người lớn từ 20 tuổi trở lên, Sử dụng bảng phân loại chuẩn cho cả nam và nữ để đánh giá chỉ số BMI.</p>
                        <img src={bmi1} alt=""/>
                    </div>
                </div>
                <Information />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(TinhBMI);