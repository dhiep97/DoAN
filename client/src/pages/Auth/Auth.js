import React, { Component } from 'react';
import './Auth.scss';

class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            isSignUp: false,
        }
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleLogin = () => {
        this.setState({
            isSignUp: !this.state.isSignUp
        })
    }

    handleShowPassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {
        return (
            <div className="background">
                <div className="login-container">
                    <div className="login-content">
                        <div className="text-login">{this.state.isSignUp ? 'Sign Up': 'Log In'}</div>
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
                                />
                                <span onClick={()=>{this.handleShowPassword()}}>
                                    <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                </span> 
                            </div>
                        </div>
                        {this.state.isSignUp && 
                        <>
                            <div className="input-login">
                                <div className="custom-input">
                                    <input
                                        className="info-input"
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        onChange={(e) => this.handleOnChange(e)}
                                    />
                                    <span onClick={()=>{this.handleShowPassword()}}>
                                        <i className={this.state.isShowPassword ? "fas fa-eye" : "fas fa-eye-slash"}></i>
                                    </span> 
                                </div>
                            </div>
                            
                            <div className="input-login">
                                <input
                                    className="info-input"
                                    type="text"
                                    placeholder="First Name"
                                    name="firstName"
                                    onChange={(e) => this.handleOnChange(e)}
                                />
                            </div>
                            
                            <div className="input-login">
                                <input
                                    className="info-input"
                                    type="text"
                                    placeholder="Last Name"
                                    name="lastName"
                                    onChange={(e) => this.handleOnChange(e)}
                                />
                            </div>
                        </>
                        }
                        <div className="span-button">
                            <span className="span-text">
                                {this.state.isSignUp ? 'Already have an account. Login!' : `Don't have an account Sign up`}
                            </span>
                            <button className="button-login"
                                onClick={() => this.handleLogin()}
                            >
                                {this.state.isSignUp ? "Sign Up" : "Log In"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Auth;