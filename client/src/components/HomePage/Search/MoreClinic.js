import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MoreSearch.scss';
import { withRouter } from 'react-router';
import { getAllClinic } from '../../../services/userService';

class MoreClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }
    handleViewDetailMedicalFacility = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-medical-facility/${item.id}`);
        }
    }
    render() {
        let { dataClinic } = this.state;
        return (
            <div className="more-list-container">
                <div className="more-title">Cơ sở ý tế, phòng khám, bệnh viện</div>
                {dataClinic && dataClinic.length > 0 &&
                    dataClinic.map((item, index) => {
                        return (
                            <div className="more-list"
                                key={index}
                                onClick={() => this.handleViewDetailMedicalFacility(item)}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreClinic));