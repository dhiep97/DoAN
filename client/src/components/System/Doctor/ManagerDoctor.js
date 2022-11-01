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
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            listDoctors: [],
            hasOldData: false
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctorsRedux()

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors : dataSelect
            });
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = []; 
        if (inputData && inputData.length > 0) {
            inputData.map((item) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`
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
                        <label>Chọn bác sĩ:</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>
                    <div className="content-right form-group">
                        <label>Thông tin giới thiệu:</label>
                        <textarea className="form-control" rows="4"
                            onChange={(event) => this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        >
                            con dien
                        </textarea>
                    </div>
                    
                </div>
                <div className="manage-doctor-editor">
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
                    {hasOldData ? 'Lưu thông tin' : 'Tạo thông tin'}
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
        createDetailDoctorsRedux: (data) => dispatch(actions.createDetailDoctors(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);
