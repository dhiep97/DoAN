import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import Slider from 'react-slick';

class HandBook extends Component {

    render() {
        return (
            <div className="section-share section-handbook">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cẩm nang</span>
                        <button className="btn-section">Tất cả bài viết</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-customize">
                                <div className="outer-bg">
                                    <div className="bg-image section-handbook" />
                                </div>
                                <div className="position text-center">
                                    <div>Giáo sư, Tiến sĩ Gorou</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div> 
                            <div className="section-customize">
                                <div className="outer-bg">
                                    <div className="bg-image section-handbook" />
                                </div>
                                <div className="position text-center">
                                    <div>Giáo sư, Tiến sĩ Gorou</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div> 
                            <div className="section-customize">
                                <div className="outer-bg">
                                    <div className="bg-image section-handbook" />
                                </div>
                                <div className="position text-center">
                                    <div>Giáo sư, Tiến sĩ Gorou</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div> 
                            <div className="section-customize">
                                <div className="outer-bg">
                                    <div className="bg-image section-handbook" />
                                </div>
                                <div className="position text-center">
                                    <div>Giáo sư, Tiến sĩ Gorou</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div> 
                            <div className="section-customize">
                                <div className="outer-bg">
                                    <div className="bg-image section-handbook" />
                                </div>
                                <div className="position text-center">
                                    <div>Giáo sư, Tiến sĩ Gorou</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div> 
                            <div className="section-customize">
                                <div className="outer-bg">
                                    <div className="bg-image section-handbook" />
                                </div>
                                <div className="position text-center">
                                    <div>Giáo sư, Tiến sĩ Gorou</div>
                                    <div>Cơ xương khớp</div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);