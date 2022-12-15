import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MoreSearch.scss';
import { withRouter } from 'react-router';
import { getAllSpecialty } from '../../../services/userService';

class MoreSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSpecialty: []
        }
    }

    async componentDidMount() {
        let res = await getAllSpecialty();
        if (res && res.errCode === 0) {
            this.setState({
                dataSpecialty: res.data ? res.data : []
            })
        }
    }

    handleViewDetailSpecialty = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-specialty/${item.id}`);
        }
    }

    render() {
        let { dataSpecialty } = this.state;

        return (
            <div className="more-list-container">
                <div className="more-title">Chuyên khoa</div>
                {dataSpecialty && dataSpecialty.length > 0 &&
                    dataSpecialty.map((item, index) => {
                        return (
                            <div className="more-list"
                                key={index}
                                onClick={() => this.handleViewDetailSpecialty(item)}
                            >
                                <div className="more-img"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                                <div className="more-list-title">{item.name}</div>
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
        
    };
};


const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreSpecialty));