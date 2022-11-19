import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailDoctor.scss';
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailInfoDoctor } from '../../../services/userService';
import HomeFooter from '../../HomePage/HomeFooter';
import Information from '../../HomePage/Information';
import DoctorSchedule from '../DoctorSchedule/DoctorSchedule';
import DoctorInfo from '../DoctorInfo/DoctorInfo';

class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: [],
            currentDoctorId: -1
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({
                currentDoctorId: id
            })
            let res = await getDetailInfoDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data,
                });
            } 
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    render() {
        let { detailDoctor } = this.state;
        let nameVi = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName} `;
        }
        
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="info-doctor">
                        <div className="content-left"
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}
                        >

                        </div>
                        <div className="content-right">
                            <div className="up">
                                {nameVi}
                            </div>
                            <div className="down">
                                {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.description && 
                                    <div className="down-description">
                                        {detailDoctor.Markdown.description}
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule 
                                doctorIdFromParent = {this.state.currentDoctorId}
                            />
                        </div>
                        <div className="content-right">
                            <DoctorInfo 
                                doctorIdFromParent = {this.state.currentDoctorId}
                            />
                        </div>
                    </div>
                    <div className="detail-doctor">
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{__html: detailDoctor.Markdown.contentHTML }}>
                            </div> 
                        }
                    </div>
                    <div className="comment">

                    </div>
                </div>
                <Information />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);