import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageUser.scss';
import { UilUploadAlt, UilTimes } from '@iconscout/react-unicons'
import { Modal } from 'reactstrap';
import * as actions from "../../../store/actions"
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";

class EditUserModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL:'',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
            userId:''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
        let user = this.props.currentUser.original;
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer.from(user.image, 'base64').toString('binary');
        }
        this.setState({
            userId: user.id,
            email: user.email,
            password: 'hardcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: imageBase64,
            previewImgURL: imageBase64,
        })
        
    }

    componentDidUpdate(prevProps, prevState) {
        let user = this.props.currentUser.original;
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: user.gender
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: user.roleId
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: user.positionId
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux;
            let arrPositions = this.props.positionRedux;
            let arrRoles = this.props.roleRedux;

            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                previewImgURL: ''
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                avatar: base64
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'avatar']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                toast.error("Điền thêm thông tin: " + arrCheck[i]);
                break;
            }else if (!this.state[arrCheck[0]].includes("@")) {
                isValid = false;
                toast.error("Email không đúng");
                break;
            } else if (this.state[arrCheck[4]].length > 10) {
                isValid = false;
                toast.error("Số điện thoại không đúng");
                break;
            } else if (this.state[arrCheck[1]].length < 3) {
                isValid = false;
                toast.error("Mật khẩu nhiều  hơn 3 kí tự");
                break;
            } else if (this.state[arrCheck[4]].length < 10) {
                isValid = false;
                toast.error("Số điện thoại không đúng");
                break;
            }
        }
        return isValid;
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleSaveUser = async (event) => {
        event.preventDefault();
        let isValid = this.checkValidateInput();
        if (isValid) {
            this.props.editUserRedux({
                id: this.state.userId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            });
            this.props.closeEditUser()
        }
    }

    render() {
        let { isOpenModal, closeEditUser } = this.props;
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;
        return (
            <Modal isOpen={isOpenModal} className="add-user-modal-container" size="lg"
                centered
            >
                <div className="add-user-modal-title">
                    <span className="left">Sửa dữ liệu tài khoản</span>
                        <span
                            className="right"
                            onClick={closeEditUser}
                        ><UilTimes /></span>
                </div>
                <div className="add-user-content">
                    <div className="add-modal-body-left">
                        <img src="" alt="" 
                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                        />
                    </div>
                    <div className="add-modal-body-right">
                        <form onSubmit={(event) => this.handleSaveUser(event)}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ảnh đại diên</label>
                                    <div className="preview-image">
                                        <input id="previewImg" type="file" hidden 
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        <label className="label-upload" htmlFor="previewImg">
                                            Tải ảnh lên
                                            <UilUploadAlt className="icon"/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input type="email" className="form-control"
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                        disabled={this.state}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Password</label>
                                    <input type="password" className="form-control"
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }} 
                                        disabled={this.state}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Họ</label>
                                    <input type="text" className="form-control"
                                        value={lastName}
                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Tên</label>
                                    <input type="text" className="form-control"
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Địa chỉ</label>
                                    <input type="text" className="form-control"
                                        value={address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Số điện thoại</label>
                                    <input type="tel" className="form-control"
                                        pattern='[0-9]{10}'
                                        value={phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label>Giới tính</label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                        value={gender}
                                    >
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-md-5">
                                    <label>Vai trò</label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'role') }}
                                        value={role}
                                    >
                                        {roles && roles.length > 0 &&
                                            roles.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="form-group col-md-5">
                                    <label>Chức danh</label>
                                    <select className="form-control"
                                        onChange={(event) => { this.onChangeInput(event, 'position') }}
                                        value={position}
                                    >
                                        {positions && positions.length > 0 &&
                                            positions.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.keyMap}>{item.valueVi}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='add-modal-footer'>
                                <button type="submit" className="btn-editor"
                                >Cập nhật</button>
                                <button type="submit" className="btn-cancel"
                                    onClick={closeEditUser}
                                >Hủy</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        )
    }
}

const mapStateToProps = state => { //redux
    return {
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        listUsers: state.admin.users,
    };
};


const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);