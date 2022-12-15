import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './Dashboard.scss';
import { UilAccessibleIconAlt, UilNewspaper, UilHospital, UilUserMd } from '@iconscout/react-unicons';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" ;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
            
        }
    }

    render() {  
        let arrUser = this.state.usersRedux;
        const columns = [
            {
                Header: 'STT', accessor: 'STT', minWidth: 150,
            },
            { Header: 'email', accessor: 'email', minWidth: 150 },
            { Header: 'Tên', accessor: 'firstName', minWidth: 100 },
            { Header: 'Họ', accessor: 'lastName', minWidth: 100 },
            { Header: 'Địa chỉ', accessor: 'address', minWidth: 100 },
            { Header: 'Số điện thoại', accessor: 'phoneNumber', minWidth: 100 },
        ]
        console.log(arrUser)
        return (
            <div className="system-dashboard-container">
                <div className="count">
                    <div className="count-group">
                        <div className="badge">0</div>
                        <div className="content">
                            <UilUserMd style={{color: "coral"}}/>
                            <span className="subtitle">Bác sĩ</span>
                        </div>
                    </div>
                    <div className="count-group">
                        <div className="badge">0</div>
                        <div className="content">
                            <UilAccessibleIconAlt style={{color: "mediumaquamarine"}}/>
                            <span className="subtitle">Bệnh nhân</span>
                        </div>
                    </div>
                    <div className="count-group">
                        <div className="badge">0</div>
                        <div className="content">
                            <UilHospital style={{color: "darkorchid"}}/>
                            <span className="subtitle">Cơ sở ý tế</span>
                        </div>
                    </div>
                    <div className="count-group">
                        <div className="badge">0</div>
                        <div className="content">
                            <UilNewspaper style={{color: "limegreen"}}/>
                            <span className="subtitle">Bài viết</span>
                        </div>
                    </div>
                </div>
                <div className="table">
                    <ReactTable
                        data={arrUser}
                        columns={columns}
                        defaultPageSize={10}
                    />
                </div> 
            </div>    
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
