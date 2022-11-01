import React, { Component } from 'react';
import { connect } from "react-redux";
import Header from '../../components/System/Header/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ManagerSchedule from '../../components/System/Schedule/ManagerSchedule';

class Doctor extends Component {

    componentDidMount() {
        
    }

    render() {
        const { userInfo, isLoggedIn } = this.props;
    
        return (
            <>
                <Router>
                    <Header />
                    <Switch>
                        <Route path='/doctor/schedule-manege' component={(ManagerSchedule)} />
                    </Switch>
                </Router>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
