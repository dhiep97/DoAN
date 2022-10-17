import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';

class OutstandingDoctor extends Component {

    render() {
        return (
            <div>
                OutstandingDoctor
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);