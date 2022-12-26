import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagerHandbook.scss';
import { Modal } from 'reactstrap';
import { UilTimes } from '@iconscout/react-unicons';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";
import _ from 'lodash';
import { UilUploadAlt } from '@iconscout/react-unicons'

const mdParser = new MarkdownIt(/* Markdown-it options */);

class EditHandbookModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            previewImgURL: '',
        }
    }



    componentDidMount() {
        let handbook = this.props.currentHandbook.original;
        if (handbook && !_.isElement(handbook)) {
            this.setState({
                id: handbook.id,
                title: handbook.title,
                author: handbook.author,
                imageBase64: handbook.image,
                previewImgURL: handbook.image,
                descriptionHTML: handbook.descriptionHTML,
                descriptionMarkdown: handbook.descriptionMarkdown
            })
        }
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

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                imageBase64: base64,
                previewImgURL: objectUrl,
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['title', 'author', 'imageBase64', 'descriptionHTML', 'descriptionMarkdown']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.error("Vui lòng điền thêm thông tin: " + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    handleEditHandbook = () => {
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editHandbook(this.state)
        }
    }


    render() {
        let { isOpenEdit, closeEditModal } = this.props;
        return (
            <>
                <Modal isOpen={isOpenEdit} className="add-modal-container" size="lg"
                    centered
                >
                    <div className="add-modal-content">
                        <div className="add-modal-header">
                            <span className="left">Sửa thông tin bài viết</span>
                            <span
                                className="right"
                                onClick={closeEditModal}
                            ><UilTimes /></span>
                        </div>
                        <div className="row add-modal-body">
                        <div className="col-8">
                            <div className="row">
                                <div className="col-12 form-group">
                                    <label>Tiêu đề bài viết</label>
                                    <input className="form-control"
                                        value={this.state.title}
                                        onChange={(event) =>this.handleOnchangeInput(event, 'title')}
                                    />
                                </div>
                                <div className="col-12 form-group">
                                    <label>Tên tác giả</label>
                                    <input className="form-control"
                                        value={this.state.author}
                                        onChange={(event) =>this.handleOnchangeInput(event, 'author')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <label>Ảnh bài viết</label>
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
                                <label>Nội dung cẩm nang</label>
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
                                className="btn-edit-confirm"
                                onClick={()=>this.handleEditHandbook()}
                            >Cập nhật thông tin</button>
                            <button
                                className="btn-add-cancel" onClick={closeEditModal}
                            >Hủy bỏ</button>
                        </div>
                    </div>
                </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditHandbookModal);