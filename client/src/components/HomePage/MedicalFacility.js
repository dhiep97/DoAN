import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import Slider from 'react-slick';
import { withRouter } from 'react-router';
import { getAllClinic } from '../../services/userService';
class MedicalFacility extends Component {

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
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở ý tế nổi bật</span>
                        <button className="btn-section">Tìm kiếm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className="section-customize"
                                            key={index}
                                            onClick={() => this.handleViewDetailMedicalFacility(item)}
                                        >
                                            <div className="bg-image section-medical-facility" 
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            />
                                            <div className="section-title">{item.name}</div>
                                        </div>
                                    )
                                })}
                        </Slider>
                    </div>                   
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => { //redux
    return {
        language: state.app.language,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));