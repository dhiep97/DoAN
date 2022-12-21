import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MoreSearch.scss';
import { withRouter } from 'react-router';
import { getAllClinic } from '../../../services/userService';
import { UilSearch } from '@iconscout/react-unicons';

class MoreClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],
            inputText: ''
        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }
    handleViewDetailMedicalFacility = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-medical-facility/${item.id}`);
        }
    }

    searchInput = (event) => {
        event.preventDefault();
        let inputText = event.target.value;
        this.setState({
            inputText: inputText
        })
    }

    render() {
        let { dataClinic, inputText } = this.state;
        return (
            <div className="more-list-container">
                <div className="more-title">Cơ sở ý tế, phòng khám, bệnh viện</div>
                <div className="more-search">
                    <input type="text" placeholder="Tìm kiếm phòng khám ..."
                        value={inputText}
                        onChange={(event) => this.searchInput(event)} />
                    <UilSearch />
                </div>
                {dataClinic && dataClinic.length > 0 && dataClinic.filter(item => {
                        if (inputText === "") {
                            return item
                        } else if(item.name.toLowerCase().includes(inputText.toLowerCase())){
                            return item
                        }
                    }).map((item, index) => {
                        return (
                            <div className="more-list"
                                key={index}
                                onClick={() => this.handleViewDetailMedicalFacility(item)}
                            >
                                <div className="more-img"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                                <div className="more-list-title">{item.name}</div>
                            </div>
                        )
                    })
                }
            </div>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreClinic));