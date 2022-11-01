import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManagerSchedule extends Component {

    render() {
        
        return (
            <div>Schedule</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerSchedule);
