import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorInfo.scss';


class DoctorInfo extends Component {

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
                test
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorInfo);