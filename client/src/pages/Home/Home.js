import React, { Component } from 'react';
import './Home.scss';
import { connect } from 'react-redux';
import Header from '../../components/HomePage/HomeHeader';
import Specialty from '../../components/HomePage/Specialty';
import MedicalFacility from '../../components/HomePage/MedicalFacility';
import OutstandingDoctor from '../../components/HomePage/OutstandingDoctor';
import HandBook from '../../components/HomePage/HandBook';
import About from '../../components/HomePage/About';
import Footer from '../../components/HomePage/HomeFooter';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Home extends Component {
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
                    <Header />
                    <Specialty settings={settings}/>
                    <MedicalFacility settings={settings}/>
                    <OutstandingDoctor settings={settings}/>
                    <HandBook settings={settings}/>
                    <About />
                    <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);