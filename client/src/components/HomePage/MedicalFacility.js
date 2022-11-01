import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import Slider from 'react-slick';
import { withRouter } from 'react-router'
class MedicalFacility extends Component {

    handleViewDetailMF = () => {
        this.props.history.push(`/detail-medical-facility`);
    }

    render() {
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở ý tế nổi bật</span>
                        <button className="btn-section">Tìm kiếm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailMF()}
                            >
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ thống thu cúc 1</div>
                            </div>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailMF()}
                            >
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ thống thu cúc 2</div>
                            </div>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailMF()}
                            >
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ thống thu cúc 3</div>
                            </div>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailMF()}
                            >
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ thống thu cúc 4</div>
                            </div>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailMF()}
                            >
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ thống thu cúc 5</div>
                            </div>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailMF()}
                            >
                                <div className="bg-image section-medical-facility" />
                                <div>Hệ thống thu cúc 6</div>
                            </div>
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