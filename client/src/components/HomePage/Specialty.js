import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import Slider from 'react-slick';
import { withRouter } from 'react-router';
class Specialty extends Component {

    handleViewDetailSpecialty = () => {
        this.props.history.push(`/detail-specialty`);
    }

    render() {
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Chuyên khoa phổ biến</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailSpecialty()}
                            >
                                <div className="bg-image section-specialty" />
                                <div>Co xuong khop 1</div>
                            </div>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailSpecialty()}
                            >
                                <div className="bg-image section-specialty" />
                                <div>Co xuong khop 2</div>
                            </div>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailSpecialty()}
                            >
                                <div className="bg-image section-specialty" />
                                <div>Co xuong khop 3</div>
                            </div>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailSpecialty()}
                            >
                                <div className="bg-image section-specialty" />
                                <div>Co xuong khop 4</div>
                            </div>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailSpecialty()}
                            >
                                <div className="bg-image section-specialty" />
                                <div>Co xuong khop 5</div>
                            </div>
                            <div className="section-customize"
                                onClick={() => this.handleViewDetailSpecialty()}
                            >
                                <div className="bg-image section-specialty" />
                                <div>Co xuong khop 6</div>
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
        
    };
};


const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));