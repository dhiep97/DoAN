import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './Dashboard.scss';
import { countDoctor, countPatient, countHandbook, countClinic } from '../../../services/userService';
import { UilAccessibleIconAlt, UilNewspaper, UilHospital, UilUserMd } from '@iconscout/react-unicons';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css" ;
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            countDoctor: '',
            countPatient: '',
            countHandbook: '',
            countClinic: '',
        }
    }

    async componentDidMount() {
        this.props.fetchUserRedux();
        this.countDoctor();
        this.countPatient();
        this.countClinic();
        this.countHandbook();
    }

    countDoctor = async () => {
        let res = await countDoctor()
        if (res && res.errCode === 0) { 
            this.setState({
                countDoctor: res.count
            })
        }
    }

    countPatient = async () => {
        let res = await countPatient()
        if (res && res.errCode === 0) { 
            this.setState({
                countPatient: res.count
            })
        }
    }

    countClinic = async () => {
        let res = await countClinic()
        if (res && res.errCode === 0) { 
            this.setState({
                countClinic: res.count
            })
        }
    }

    countHandbook = async () => {
        let res = await countHandbook()
        if (res && res.errCode === 0) { 
            this.setState({
                countHandbook: res.count
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
            
        }
    }

    setUpRole = (roleId) => {
        let element = <div>B???nh nh??n</div>
        if (roleId === 'R1') {
            element = <div>Qu???n tr??? vi??n</div>
        } else if (roleId === 'R2') {
            element = <div>B??c s??</div>
        } 
        return element
    }

    render() {  
        let arrUser = this.state.usersRedux;
        let { countDoctor, countPatient, countHandbook, countClinic } = this.state;
        const columns = [
            {
                Header: 'STT', accessor: 'STT', minWidth: 40, flex: 1,
                Cell: (item) => {
                    return (
                        <span>{item.index + 1}</span>
                    )
                }
            },
            { Header: 'email', accessor: 'email', minWidth: 150, flex: 1 },
            { Header: 'T??n', accessor: 'firstName', minWidth: 100, flex: 1 },
            { Header: 'H???', accessor: 'lastName', minWidth: 100, flex: 1 },
            { Header: '?????a ch???', accessor: 'address', minWidth: 100, flex: 1 },
            { Header: 'S??? ??i???n tho???i', accessor: 'phoneNumber', minWidth: 100, flex: 1 },
            {
                accessor: 'role', Header: 'Vai tr??', minWidth: 110, flex: 1,
                Cell: (item) => {
                    return (
                        <div className={`cell ${item.original.roleId}`}>
                            {this.setUpRole(item.original.roleId)}
                        </div>
                    );
                },
            }
        ]
        
        return (
            <div className="system-dashboard-container">
                <div className="count">
                    <div className="count-group">
                        <div className="badge">{countDoctor}</div>
                        <div className="content">
                            <Link to="/system/users-manage">
                                <UilUserMd style={{color: "coral"}}/>
                                <span className="subtitle">B??c s??</span>
                            </Link>
                        </div>
                    </div>
                    <div className="count-group">
                        <div className="badge">{countPatient}</div>
                        <div className="content">
                            <Link to="/system/users-manage">
                                <UilAccessibleIconAlt style={{color: "mediumaquamarine"}}/>
                                <span className="subtitle">B???nh nh??n</span>
                            </Link>
                        </div>
                    </div>
                    <div className="count-group">
                        <div className="badge">{countClinic}</div>
                        <div className="content">
                            <Link to="/system/clinic-manage">
                                <UilHospital style={{color: "darkorchid"}}/>
                                <span className="subtitle">C?? s??? ?? t???</span>
                            </Link>
                        </div>
                    </div>
                    <div className="count-group">
                        <div className="badge">{countHandbook}</div>
                        <div className="content">
                            <Link to="/system/handbook-manage">
                                <UilNewspaper style={{color: "limegreen"}}/>
                                <span className="subtitle">B??i vi???t</span>
                            </Link>
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
