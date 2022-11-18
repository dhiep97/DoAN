import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManagerSpecialty.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManagerSpecialty extends Component {

    render() {
        

        return (
            <div className="manage-specialty-container">
                <div className="manage-specialty-title">Quản lý chuyên khoa</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên chuyên khoa</label>
                        <input className="form-control" type="text"/>
                    </div>
                    <div className="col-6 form-group">
                        <label>Ảnh chuyên khoa</label>
                        <input className="form-control-file" type="file" />
                    </div>
                    <div className="col-12">
                        <MdEditor
                            style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            // onChange={this.handleEditorChange}
                            // value={this.state.contentMarkdown}
                        />
                    </div>
                    <div className="col-12">
                        <button className="save-specialty">Lưu thông tin</button>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSpecialty);
