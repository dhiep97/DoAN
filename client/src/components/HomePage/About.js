import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';

class About extends Component {

    render() {
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Thông tin trang web
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" height="400px"
                            src="https://www.youtube.com/embed/lx97nEYqAa8"
                            title="Thôi tình dang dở từ đây nhớ em mà duyên khó thành... Dang Dở ~ Những Bản Nhạc Lofi Chill Buồn Nhất"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                    <div className="content-right">
                        <div>
                            <p>Thôi tình dang dở từ đây nhớ em mà duyên khó thành... Dang Dở ~ Những Bản Nhạc Lofi Chill Buồn Nhất</p>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);