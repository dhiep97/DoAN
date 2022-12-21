import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../HomeHeader';
import './TinhBMI.scss';
import Information from '../Information';
import HomeFooter from '../HomeFooter';
import item from '../../../assets/Header/toolsIconBmr.svg'

class TinhBMR extends Component {

    constructor(props) {
        super(props);
        this.state = {
            age: '',
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

    handleResultMale = () => {
        let { height, result, weight, age } = this.state;
        let male = 66 + (13.7 * weight) + (5 * height) - (6.8 * age);
        result = male;
        this.setState({
            result: result,
        })
    }

    handleResultFemale = () => {
        let { height, result, weight, age } = this.state;
        let male = 655 + (9.6 * weight) + (1.8 * height) - (4.7 * age);
        result = male;
        this.setState({
            result: result,
        })
    }

    render() {
        let { height, weight, result, age } = this.state;
        return (
            <div className="bmi-container">
                <HomeHeader/>
                <div className="bmi-title">
                    <div className="bmi-left">
                        <h2>Đo chỉ số calo (BMR)</h2>
                        <p>Sử dụng công cụ tính chỉ số BMR có thể giúp bạn xác định nhu cầu calo hàng ngày dựa trên chiều cao, cân nặng, tuổi và mức độ hoạt động của bạn.</p>
                    </div>
                    <img src={item} alt=""/>
                </div>
                <div className="row bmi-content">
                <div className="col-12">
                        <label>Nhập tuổi của bạn:</label>
                        <input className="form-control" type="text" placeholder="Tính theo năm"
                            value={age} onChange={(event)=>this.handleOnChange(event, 'age')}
                        />
                    </div>
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
                            onClick={() =>this.handleResultMale()}
                        >
                            Nam
                        </button>
                        <button className="btn-kq"
                            onClick={() =>this.handleResultFemale()}
                        >
                            Nữ
                        </button>
                    </div>
                    <div className="col-12">
                        <label>Kết quả BMR của bạn:</label>
                        <input className="form-control" type="text"
                            value={result} onChange={(event)=>this.handleOnChange(event, 'result')}
                        />
                    </div>
                    <div className='bmi-des'>
                        <p className="bmi-t">THÔNG TIN VỀ CHỈ SỐ BMR</p>
                        <p className="bmi-b">1. Tỷ lệ trao đổi chất cơ bản (BMR) là gì? - Định nghĩa BMR</p>
                        <p>Cơ thể chúng ta đốt cháy calo liên tục trong ngày để duy trì các chức năng sống cơ bản như hô hấp, tuần hoàn và tiêu hóa. BMR (Basal Metabolic Rate – tỉ lệ trao đổi chất cơ bản) là lượng calo tối thiểu cần thiết cho các chức năng này khi cơ thể nghỉ ngơi.</p>
                        <p>Chỉ số này cũng xác định tốc độ cơ thể có thể đốt cháy calo, do đó sẽ thể hiện được mối liên hệ giữa lượng calo với khối lượng cơ thể.</p>
                        <p className="bmi-b">2. Calo là gì và vì sao cơ thể chúng ta cần calo?</p>
                        <p>Calo là một đơn vị đo năng lượng. Trong dinh dưỡng, calo là năng lượng mà chúng ta nhận được từ việc tiêu thụ thực phẩm và cũng là năng lượng sử dụng trong các hoạt động thể chất.</p>
                        <p>Bạn có thể dễ dàng biết số calo được liệt kê trên nhãn thông tin của các loại thực phẩm. Nhiều cách giảm cân cũng xoay quanh mục tiêu là giảm lượng calo nạp vào cơ thể. Một kilocalorie (kcal) tương đương với 1.000 calo.</p>
                        <p>Theo dõi lượng calo nạp vào giúp bạn biết rõ hơn lượng calo cơ thể cần để đốt cháy, tiêu thụ thêm hoặc duy trì nhằm sở hữu số cân nặng mong muốn. Dù mục tiêu của bạn là gì, bạn cũng cần nắm được mình đang nạp vào bao nhiêu calo.</p>
                        <p className='bmi-b'>3. Cách tính BMR</p>
                        <p>Một cách phổ biến để tính tỷ lệ trao đổi chất cơ bản BMR là công thức Harris-Benedict:</p>
                        <p>Nữ giới: BMR = 655 + (9,6 × trọng lượng tính bằng kg) + (1,8 × chiều cao tính bằng cm) – (4,7 × tuổi tính theo năm)</p>
                        <p>Nam giới: BMR = 66 + (13,7 × trọng lượng tính bằng kg) + (5 × chiều cao tính bằng cm) – (6,8 × tuổi tính theo năm)</p>    
                        <p>Bạn cũng có thể sử dụng công cụ tính BMR của HelloBacsi để dễ dàng và nhanh chóng có kết quả.</p>
                            
                        <p className="bmi-b">4. BMR và khối lượng cơ nạc có liên quan như thế nào?</p>
                        <p>Các nghiên cứu chỉ ra rằng bạn càng có nhiều lượng cơ nạc thì tỷ lệ BMR của bạn sẽ càng lớn. Khối lượng cơ nạc tạo nên một phần cấu tạo cơ thể – tỷ lệ phần trăm mỡ trong cơ thể so với mô nạc hoặc khối lượng không chứa chất béo (mỡ).</p>
                        <p>Để tăng cường trao đổi chất, bạn cần cải thiện các thành phần cơ thể này bằng cách tăng khối lượng cơ nạc nhờ tập luyện thể thao và tiêu thụ nhiều protein hơn.</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(TinhBMR);