import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss';

class DetailDoctor extends Component {

    render() {
        return (
            <div>
                DetailDoctor
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);