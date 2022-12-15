import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagerSpecialty.scss';
import { Modal } from 'reactstrap';
import { UilTimes } from '@iconscout/react-unicons';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import { emitter } from '../../../utils/emitter';
import { UilUploadAlt } from '@iconscout/react-unicons'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class AddSpecialtyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgURL: ''
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                previewImgURL: ''
            })
        })
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({html, text}) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'imageBase64', 'descriptionHTML', 'descriptionMarkdown']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.error("Vui lòng điền thêm thông tin: " + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                imageBase64: base64
            })
        }
    }

    handleAddNewSpecialty = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.createNewSpecialty(this.state);
        }
    }

    render() {
        let { isOpenModal, closeAdd } = this.props;
        return (
            <Modal isOpen={isOpenModal} className="add-modal-container" size="lg"
                centered
            >
                <div className="add-modal-content">
                    <div className="add-modal-header">
                        <span className="left">Thêm chuyên khoa</span>
                        <span
                            className="right"
                            onClick={closeAdd}
                        ><UilTimes /></span>
                    </div>
                    <div className="row add-modal-body">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-12 form-group">
                                    <label>Tên chuyên khoa</label>
                                    <input className="form-control"
                                        value={this.state.name}
                                        onChange={(event) =>this.handleOnchangeInput(event, 'name')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <label>Ảnh chuyên khoa</label>
                            <div>
                                <input id="previewImg" type="file" hidden
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                                <label className="label-upload" htmlFor="previewImg">Tải ảnh lên
                                    <UilUploadAlt className="icon"/>
                                </label>
                                <div className="preview-image"
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                >
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <label>Nội dung chuyên khoa</label>
                            <MdEditor
                                style={{ height: '300px' }}
                                renderHTML={text => mdParser.render(text)}
                                onChange={this.handleEditorChange}
                                value={this.state.descriptionMarkdown}
                            />
                        </div>
                    </div>
                    <div className="add-modal-footer">
                        <button
                            className="btn-add-confirm"
                            onClick={()=>this.handleAddNewSpecialty()}
                        >Lưu thông tin</button>
                        <button
                            className="btn-add-cancel" onClick={closeAdd}
                        >Hủy bỏ</button>
                    </div>
                    
                </div>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddSpecialtyModal);