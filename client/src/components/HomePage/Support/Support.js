import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Support.scss';
import HomeHeader from '../HomeHeader';

class Support extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        return (
            <>
                <HomeHeader isShowBanner={false}/>
                <div className="support-con">
                    <p>Mọi thắc mắc liên hệ email hoặc số điện thoại bên dưới</p>
                    <p>Email: hiep45960@nuce.edu.vn</p>
                    <p>SĐT: 0916759017</p>
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Support);