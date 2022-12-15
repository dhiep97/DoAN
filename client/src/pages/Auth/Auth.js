import React, { Component } from 'react';
import './Auth.scss';
import { handleLogin, handleRegister } from '../../services/authService';
import * as actions from "../../store/actions";
import { connect } from 'react-redux';
import { push } from "connected-react-router";

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPass: '',
            firstName: '',
            lastName: '',
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLogin(this.state.username, this.state.password);
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message,
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login success')
            }

        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    })
                }
            }
        }
    }

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleOnKeyDown = (e) => {
        if (e.key === 'Enter'|| e.keyCode === 13) {
            this.handleLogin();
        }
    }
    render() {
        return (

            <div className="background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="text-login">Đăng nhập</div>
                        <div className="input-login">
                            <input
                                className="info-input"
                                type="text"
                                placeholder="Username"
                                name="username"
                                onChange={(e) => this.handleOnChange(e)}
                            />
                        </div>

                        <div className="input-login">
                            <div className="custom-input">
                                <input
                                    className="info-input"
                                    type={this.state.isShowPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    name="password"
                                    onChange={(e) => this.handleOnChange(e)}
                                    onKeyDown={(e) => this.handleOnKeyDown(e)}
                                />
                                <span onClick={()=>{this.handleShowPassword()}}>
                                    <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span> 
                            </div>
                        </div>
                        <div className="err-message">
                            {this.state.errMessage}
                        </div>
                        <div className="span-button">
                            <button className="button-login" onClick={() =>{this.handleLogin()}}>
                                Đăng nhập
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
        userRegisterSuccess: (data) => dispatch(actions.userRegisterSuccess(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);