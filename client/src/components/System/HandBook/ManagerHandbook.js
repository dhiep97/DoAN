import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManagerHandbook extends Component {

    render() {
        

        return (
            <div>Handbook</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagerHandbook);
