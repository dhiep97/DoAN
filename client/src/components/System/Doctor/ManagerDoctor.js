import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagerDoctor.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import * as actions from '../../../store/actions';
import { getDetailInfoDoctor, getAllDoctorInfo } from '../../../services/userService';
import { CRUD_ACTIONS } from "../../../utils";
import TableDoctor from './TableDoctor';
import { UilPlus } from '@iconscout/react-unicons'

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
            listClinic: [],
            listSpecialty: [],
            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',

            dataDoctor: [],
            isShow: false,
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux()
        this.props.getAllRequiredDoctorInfo();
        this.getAllDoctorInfo()
    }

    getAllDoctorInfo = async () => {
        let res = await getAllDoctorInfo();
        if (res && res.errCode === 0) {
            this.setState({
                dataDoctor: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USER')
            this.setState({
                listDoctors : dataSelect
            });
        }

        if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfo;
            let dataSelectPrice = this.buildDataInputSelect(resPrice, 'PRICE')
            let dataSelectPayment = this.buildDataInputSelect(resPayment, 'PAYMENT')
            let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE')
            let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')
            // console.log(dataSelectPayment, dataSelectPrice, dataSelectProvince)
            this.setState({
                listPrice: dataSelectPrice,
                listPayment: dataSelectPayment,
                listProvince: dataSelectProvince,
                listSpecialty: dataSelectSpecialty,
                listClinic: dataSelectClinic
            })
        }
        
    }

    buildDataInputSelect = (inputData, type) => {
        let result = []; 
        if (inputData && inputData.length > 0) {
            if (type === 'USER') {
                inputData.map((item) => {
                    let object = {};
                    let labelVi =  `${item.lastName} ${item.firstName}`
                    object.label = labelVi
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item) => {
                    let object = {};
                    let labelVi =  `${item.valueVi} VNĐ`
                    object.label = labelVi
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PAYMENT') {
                inputData.map((item) => {
                    let object = {};
                    let labelVi =  `${item.valueVi}`
                    object.label = labelVi
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'PROVINCE') {
                inputData.map((item) => {
                    let object = {};
                    let labelVi =  `${item.valueVi}`
                    object.label = labelVi
                    object.value = item.keyMap;
                    result.push(object);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item) => {
                    let object = {};
                    object.label = item.name
                    object.value = item.id;
                    result.push(object);
                })
            }
            if (type === 'CLINIC') {
                inputData.map((item) => {
                    let object = {};
                    object.label = item.name
                    object.value = item.id;
                    result.push(object);
                })
            }
        }
        return result;
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContent = async () => {
        let { hasOldData } = this.state;
        this.props.createDetailDoctorsRedux({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            specialtyId: this.state.selectedSpecialty.value,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : ''
        })
        await this.getAllDoctorInfo()
    }

    //lay gia tri theo selectedOption doctor
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption });
        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;

        let res = await getDetailInfoDoctor(selectedOption.value)
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            let addressClinic = '', note = '', nameClinic = '', priceId = '', paymentId = '', provinceId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '', specialtyId = '',
                clinicId = '', selectedClinic = '', selectedSpecialty = ''; 
            
            if (res.data.Doctor_Info) {
                addressClinic = res.data.Doctor_Info.addressClinic;
                note = res.data.Doctor_Info.note;
                nameClinic = res.data.Doctor_Info.nameClinic;
                paymentId = res.data.Doctor_Info.paymentId;
                priceId = res.data.Doctor_Info.priceId;
                provinceId = res.data.Doctor_Info.provinceId;
                specialtyId = res.data.Doctor_Info.specialtyId;
                clinicId = res.data.Doctor_Info.clinicId;
                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })
                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })
                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })
                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })
                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })
            }
            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic

            })
        } else {
            this.setState({
                contentHTML:'',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic:''
            })
        } 
    }

    handleOnChangeDescription = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id]= event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleChangeSelectDoctorInfo = async (selectedOption, name) => {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;
        this.setState({...stateCopy})
        // console.log(selectedOption)
    }

    showAdd = (status) => {
        this.setState({
            isShow: status
        })
    }

    render() {
        let { hasOldData, dataDoctor, isShow } = this.state;
        return (
            <div className="manage-doctor-container">
                <div className="manage-doctor-title">
                    Tạo thông tin bác sĩ
                </div>
                {isShow === true ?
                    <>
                        <div className="more-info">
                            <div className="content-left ">
                                <label>Chọn bác sĩ</label>
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                    placeholder={'Chọn bác sĩ'}
                                />
                            </div>
                            <div className="content-right">
                                <label>Thông tin giới thiệu</label>
                                <textarea className="form-control" rows="3"
                                    onChange={(event) => this.handleOnChangeDescription(event, 'description')}
                                    value={this.state.description}
                                >
                                </textarea>
                            </div>
                        
                        </div>
                        <div className="more-info-extra row">
                            <div className="col-4 form-group">
                                <label>Chọn giá khám</label>
                                <Select
                                    value={this.state.selectedPrice}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={this.state.listPrice}
                                    placeholder={'Chọn giá khám'}
                                    name="selectedPrice"
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label>Chọn tỉnh thành</label>
                                <Select
                                    value={this.state.selectedProvince}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={this.state.listProvince}
                                    placeholder={'Chọn tỉnh thành'}
                                    name="selectedProvince"
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label>Chọn phương thức thanh toán</label>
                                <Select
                                    value={this.state.selectedPayment}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={this.state.listPayment}
                                    placeholder={'Chọn phương thức thanh toán'}
                                    name="selectedPayment"
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label>Tên phòng khám</label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeDescription(event, 'nameClinic')}
                                    value={this.state.nameClinic}
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label>Địa chỉ phòng khám</label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeDescription(event, 'addressClinic')}
                                    value={this.state.addressClinic}
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label>Ghi chú</label>
                                <input className="form-control"
                                    onChange={(event) => this.handleOnChangeDescription(event, 'note')}
                                    value={this.state.note}
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label>Chọn chuyên khoa</label>
                                <Select
                                    value={this.state.selectedSpecialty}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={this.state.listSpecialty}
                                    placeholder={'Chọn chuyên khoa'}
                                    name="selectedSpecialty"
                                />
                            </div>
                            <div className="col-4 form-group">
                                <label>Chọn phòng khám</label>
                                <Select
                                    value={this.state.selectedClinic}
                                    onChange={this.handleChangeSelectDoctorInfo}
                                    options={this.state.listClinic}
                                    placeholder={'Chọn phòng khám'}
                                    name="selectedClinic"
                                />
                            </div>
                        </div>
                        <div className="manage-doctor-editor">
                            <label>Thông tin chi tiết</label>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.contentMarkdown}
                            />
                        </div>
                        <div className="button-doctor">
                            <button
                                className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}
                                onClick={() => this.handleSaveContent()}
                            >
                                {hasOldData ? 'Cập nhật thông tin' : 'Lưu thông tin'}
                            </button>
                            <button className="btn-cancel-doctor"
                                onClick={() => this.showAdd(false)}
                            >
                                Hủy
                            </button>
                        </div>
                    </>
                    :
                    <div className="table-doctor">
                        <div className="table-doctor-title">
                            <span className="doctor-title">Danh sách thông tin bác sĩ</span>
                            <button className="btn-add-doctor"
                                onClick={() => this.showAdd(true)}
                            >
                                <UilPlus />
                                Tạo và sửa thông tin
                            </button>
                        </div>
                        <TableDoctor
                            dataDoctor={dataDoctor}
                        />
                    </div>
                }
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
