import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageUser.scss';
import { UilUploadAlt, UilTimes } from '@iconscout/react-unicons'
import { Modal } from 'reactstrap';
import * as actions from "../../../store/actions"
import { CommonUtils } from "../../../utils";
import { toast } from "react-toastify";

class AddUserModal extends Component {

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
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
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
                toast.error("??i???n th??m th??ng tin: " + arrCheck[i]);
                break;
            } else if (!this.state[arrCheck[0]].includes("@")) {
                isValid = false;
                toast.error("Email kh??ng ????ng");
                break;
            } else if (this.state[arrCheck[4]].length > 10) {
                isValid = false;
                toast.error("S??? ??i???n tho???i kh??ng ????ng");
                break;
            } else if (this.state[arrCheck[1]].length < 3) {
                isValid = false;
                toast.error("M???t kh???u nhi???u  h??n 3 k?? t???");
                break;
            } else if (this.state[arrCheck[4]].length < 10) {
                isValid = false;
                toast.error("S??? ??i???n tho???i kh??ng ????ng");
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
            this.props.createNewUser({
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
        }
        this.props.closeAddUser()
    }

    render() {
        let { isOpenModal, closeAddUser } = this.props;
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;
        
        return (
            <Modal isOpen={isOpenModal} className="add-user-modal-container" size="lg"
                centered
            >
                <div className="add-user-modal-title">
                    <span className="left">Th??m t??i kho???n m???i</span>
                        <span
                            className="right"
                            onClick={closeAddUser}
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
                                    <label>???nh ?????i di??n</label>
                                    <div className="preview-image">
                                        <input id="previewImg" type="file" hidden 
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        <label className="label-upload" htmlFor="previewImg">
                                            T???i ???nh l??n
                                            <UilUploadAlt className="icon"/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Email</label>
                                    <input type="email" className="form-control"
                                        pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                                        value={email}
                                        onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Password</label>
                                    <input type="password" className="form-control"
                                        value={password}
                                        onChange={(event) => { this.onChangeInput(event, 'password') }} 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>H???</label>
                                    <input type="text" className="form-control"
                                        value={lastName}
                                        onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>T??n</label>
                                    <input type="text" className="form-control"
                                        value={firstName}
                                        onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>?????a ch???</label>
                                    <input type="text" className="form-control"
                                        value={address}
                                        onChange={(event) => { this.onChangeInput(event, 'address') }}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>S??? ??i???n tho???i</label>
                                    <input type="tel" className="form-control"
                                        pattern='[0-9]{10}'
                                        value={phoneNumber}
                                        onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-2">
                                    <label>Gi???i t??nh</label>
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
                                    <label>Vai tr??</label>
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
                                    <label>Ch???c danh</label>
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
                                <button type="submit" className="btn-save"
                                >L??u th??ng tin</button>
                                <button type="submit" className="btn-cancel"
                                    onClick={closeAddUser}
                                >H???y</button>
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
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUserModal);