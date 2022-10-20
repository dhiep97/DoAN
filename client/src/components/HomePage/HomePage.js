import React, { Component } from 'react';
import './HomePage.scss';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Specialty';
import MedicalFacility from './MedicalFacility';
import OutstandingDoctor from './OutstandingDoctor';
import HandBook from './HandBook';
import About from './About';
import HomeFooter from './HomeFooter';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
        };
        return (
            <>
                <div>
                    <HomeHeader />
                    <Specialty settings={settings}/>
                    <MedicalFacility settings={settings}/>
                    <OutstandingDoctor settings={settings}/>
                    <HandBook settings={settings}/>
                    <About />
                    <HomeFooter />
                </div>
            </>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);