import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MoreSearch.scss';
import { withRouter } from 'react-router';
import { getAllHandbook } from '../../../services/userService';
import { UilSearch } from '@iconscout/react-unicons';

class MoreHandbook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataHandbook: [],
            inputText: ''
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

    searchInput = (event) => {
        event.preventDefault();
        let inputText = event.target.value;
        this.setState({
            inputText: inputText
        })
    }

    render() {
        let { dataHandbook, inputText } = this.state;
        return (
            <div className="more-list-container">
                <div className="more-title">Cẩm nang</div>
                <div className="more-search">
                    <UilSearch />
                    <input type="text" placeholder="Tìm kiếm bài viết..."
                        value={inputText}
                        onChange={(event) => this.searchInput(event)} />
                    
                </div>
                {dataHandbook && dataHandbook.length > 0 && dataHandbook.filter(item => {
                        if (inputText === "") {
                            return item
                        } else if(item.title.toLowerCase().includes(inputText.toLowerCase())){
                            return item
                        }
                    }).map((item, index) => {
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