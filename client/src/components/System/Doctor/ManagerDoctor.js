import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManagerDoctor extends Component {

    render() {
        

        return (
            <div>Doctor</div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);
