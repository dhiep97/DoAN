import React, { Component } from 'react';
import { connect } from 'react-redux';
import MUIDataTable from "mui-datatables";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import * as actions from '../../../store/actions';
import './System.scss';
import { UilAccessibleIconAlt, UilNewspaper, UilHospital, UilUserMd } from '@iconscout/react-unicons';

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
});

const columns = [
    { name: "EMAIL", options: { filterOptions: { fullWidth: true } } },
    "HỌ TÊN",
    "ĐỊA CHỈ",
    "SỐ ĐIỆN THOẠI",
];


class System extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
            options: {
                responsive: 'vertical',
                tableBodyHeight: '400px',
                tableBodyMaxHeight: '',
                searchBtn: true,
                downloadBtn: true,
                printBtn: true,
                viewColumnBtn: true,
                filterBtn: true,
                onTableChange: (action, state) => {
                    console.log(action);
                    console.dir(state);
                }
            }
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
        let options = this.state.options;
        let arrUser = this.state.usersRedux;
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
                    <CacheProvider value={muiCache}>
                        <ThemeProvider theme={createTheme()}>
                            <MUIDataTable
                            title={"DANH SÁCH NGƯỜI DÙNG"}
                            data={
                                arrUser.map((user) => (
                                    [user.email, user.lastName +' ' + user.firstName, user.address, user.phoneNumber]
                                ))
                            }
                            columns={columns}
                            options={options}
                            />
                        </ThemeProvider>
                    </CacheProvider>
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

export default connect(mapStateToProps, mapDispatchToProps)(System);
