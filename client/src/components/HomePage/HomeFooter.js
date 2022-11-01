import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';

class Footer extends Component {

    render() {
        return (
            <div className="home-footer">
                <div className="footer-container">
                    &copy; 2022 Nguyễn Đình Hiệp & Bùi Đức Duy
                    <a target="blank" href="https://www.facebook.com/nguyendinh.hiep.1485">
                        &#8594; Click here &#8592;
                    </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);