import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";

class TableDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState) {

    }
    render() {
        let dataDoctor = this.props.dataDoctor;
        const columns = [
            {
                Header: 'STT', accessor: 'STT', minWidth: 30,
                Cell: (item) => {
                    return (
                        <span>{item.index + 1}</span>
                    )
                }
            },
            {
                accessor: 'fullName', Header: 'Họ và tên', width: 130, editable: true, flex: 1,
                Cell: (item) => {
                    return (
                        <span>{item.original.lastName + ' ' + item.original.firstName}</span>
                    )
                }
            },
            { accessor: 'Doctor_Info.nameClinic', Header: 'Tên phòng khám', minWidth: 150, editable: true, flex: 1,},
            { accessor: 'Doctor_Info.addressClinic', Header: 'Địa chỉ phòng khám', minWidth: 150, editable: true, flex: 1,},
            { accessor: 'Doctor_Info.priceData.valueVi', Header: 'Giá khám', minWidth: 60, editable: true, flex: 1,},
            { accessor: 'Doctor_Info.provinceData.valueVi', Header: 'Địa chỉ', minWidth: 60, editable: true, flex: 1, },
            { accessor: 'Markdown.description', Header: 'Giới thiệu', minWidth: 200, editable: true, flex: 1, },
        ];

        return (
            <div className="row table-doctor">
                <div className="col-12">
                    <ReactTable
                        data={dataDoctor}
                        columns={columns}
                        defaultPageSize={10}
                    />
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableDoctor);