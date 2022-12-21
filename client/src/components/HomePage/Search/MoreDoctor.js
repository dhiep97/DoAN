import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MoreSearch.scss';
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions';
import { UilSearch } from '@iconscout/react-unicons';

class MoreDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDoctor: [],
            inputText: ''
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors();
        // this.getDataDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                dataDoctor: this.props.topDoctorsRedux
            })
        }
    }

    handleViewDetailDoctor = (doctor) => {
        if (this.props.history) {
            this.props.history.push(`/detail-doctor/${doctor.id}`);
        }
    }

    searchInput = (event) => {
        event.preventDefault();
        let inputText = event.target.value;
        this.setState({
            inputText: inputText
        })
    }

    render() {
        let { dataDoctor, inputText } = this.state;
        return (
            <div className="more-list-container">
                <div className="more-title">Bác sĩ nổi bật</div>
                <div className="more-search">
                    <input type="text" placeholder="Tìm kiếm bác sĩ..."
                        value={inputText}
                        onChange={(event) => this.searchInput(event)} />
                    <UilSearch />
                </div>
                {dataDoctor && dataDoctor.length > 0 && dataDoctor.filter(item => {
                        if (inputText === "") {
                            return item
                        } else if(item.firstName.toLowerCase().includes(inputText.toLowerCase())){
                            return item
                        }
                    }).map((item, index) => {
                        let imageBase64 = '';
                        if (item.image) {
                            imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                        }
                        let nameVi = `${item.lastName} ${item.firstName} `;
                        return (
                            <div className="more-list"
                                key={index}
                                onClick={() => this.handleViewDetailDoctor(item)}
                            >
                                <div className="more-img-doctor"
                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                />
                                <div className="more-list-title">
                                    <p className='name-doctor'>{nameVi}</p>
                                    <p>Chức danh: {item.positionData.valueVi}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        )
    }
}

const mapStateToProps = state => { //redux
    return {
        topDoctorsRedux: state.admin.topDoctors,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreDoctor));