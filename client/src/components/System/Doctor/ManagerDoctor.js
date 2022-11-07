import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagerDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { getDetailInfoDoctor } from '../../../services/userService';
import { CRUD_ACTIONS } from "../../../utils";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManagerDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //markdown
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false,

            //doctor-info
            listPrice: [],
            listPayment: [],
            listProvince: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux()
        this.props.getAllRequiredDoctorInfo();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER')
            this.setState({
                listDoctors : dataSelect
            });
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPrice, resPayment, resProvince } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice)
            let dataSelectPayment = this.buildDataInputSelect(resPayment)
            let dataSelectProvince = this.buildDataInputSelect(resProvince)
            console.log(dataSelectPayment, dataSelectPrice, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
            })
        }
        // if (prevProps.allDoctors !== this.props.allDoctors) {
        //     this.setState({
        //         contentHTML:'',
        //         contentMarkdown: '',
        //         description: '',
        //         doctorId: '',
        //     })
        // }
    }

    buildDataInputSelect = (inputData, type) => {
        let result = []; 
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {};
                let labelVi =  type === 'USER' ? `${item.lastName} ${item.firstName}`: item.valueVi
                object.label = labelVi
                object.value = item.id;
                result.push(object);
            })
            
        }
        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContent = () => {
        let { hasOldData } = this.state;

        this.props.createDetailDoctorsRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
        })
    }

    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let res = await getDetailInfoDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true
            })
        } else {
            this.setState({
                contentHTML:'',
                contentMarkdown: '',
                description: '',
                hasOldData: false
            })
        } 
    }

    handleOnChangeDescription = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    render() {
        let { hasOldData } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    Tạo thông tin bác sĩ
                </div>
                <div className="more-info">
                    <div className="content-left">
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label>Thông tin giới thiệu</label>
                        <textarea className="form-control" rows="3"
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                    
                </div>
                <div className="more-info-extra row">
                    <div className="col-4 form-group">
                        <label>Chọn giá khám</label>
                        <Select
                            //value={this.state.selectedOption}
                            //onChange={this.handleChangeSelect}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá khám'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn tỉnh thành</label>
                        <Select
                            //value={this.state.selectedOption}
                            //onChange={this.handleChangeSelect}
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Chọn phương thức thanh toán</label>
                        <Select
                            //value={this.state.selectedOption}
                            //onChange={this.handleChangeSelect}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                        />
                    </div>
                    <div className="col-4 form-group">
                        <label>Tên phòng khám</label>
                        <input className="form-control"/>
                    </div>
                    <div className="col-4 form-group">
                        <label>Địa chỉ phòng khám</label>
                        <input className="form-control"/>
                    </div>
                    <div className="col-4 form-group">
                        <label>Ghi chú</label>
                        <input className="form-control"/>
                    </div>
                </div>
                <div className="manage-doctor-editor">
                    <label>Thông tin chi tiết</label>
                    <MdEditor
                        style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor" }
                    onClick={()=>this.handleSaveContent()}
                >
                    {hasOldData ? 'Cập nhật thông tin' : 'Lưu thông tin'}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        createDetailDoctorsRedux: (data) => dispatch(actions.createDetailDoctors(data)),
        getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);
