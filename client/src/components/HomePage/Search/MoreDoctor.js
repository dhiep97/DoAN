import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MoreSearch.scss';
import { withRouter } from 'react-router';
import * as actions from '../../../store/actions';

class MoreDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataDoctor:[]
        }
    }

    componentDidMount() {
        this.props.loadTopDoctors()
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

    render() {
        let { dataDoctor } = this.state;
        console.log(dataDoctor);
        return (
            <div className="more-list-container">
                <div className="more-title">Bác sĩ nổi bật</div>
                {dataDoctor && dataDoctor.length > 0 &&
                    dataDoctor.map((item, index) => {
                        let imageBase64 = '';
                                    if (item.image) {
                                        imageBase64 = new Buffer.from(item.image, 'base64').toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName} `;
                        return (
                            <div className="more-list"
                                key={index}
                                onClick={() => this.handleViewDetailDoctor(item)}
                            >
                                <div className="more-img-doctor"
                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                />
                                <div className="more-list-title">{nameVi}</div>
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