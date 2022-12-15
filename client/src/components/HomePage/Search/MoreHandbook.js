import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MoreSearch.scss';
import { withRouter } from 'react-router';
import { getAllHandbook } from '../../../services/userService';

class MoreHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: [],
        }
    }

    async componentDidMount() {
        let res = await getAllHandbook();
        if (res && res.errCode === 0) {
            this.setState({
                dataHandbook: res.data ? res.data : []
            })
        }
    }

    handleViewDetailHandbook = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-handbook/${item.id}}`);
        }
    }
    render() {
        let { dataHandbook } = this.state;
        return (
            <div className="more-list-container">
                <div className="more-title">Cẩm nang</div>
                {dataHandbook && dataHandbook.length > 0 &&
                    dataHandbook.map((item, index) => {
                        return (
                            <div className="more-list"
                                key={index}
                                onClick={() => this.handleViewDetailHandbook(item)}
                            >
                                <div className="more-img"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                                <div className="more-list-title">{item.title}</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MoreHandbook));