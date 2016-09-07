import React from 'react';
import * as Redux from 'react-redux';

var {connect} = require('react-redux');

import TodoListAll from 'TodoListAll';
import GoogleMap from 'GoogleMap';
import Test from 'Test';
import * as actions from 'actions';

export var Login = React.createClass({
    onLogin() {
        var {dispatch} = this.props;

        dispatch(actions.startLogin());
    },
    onCreateUser(e) {
        e.preventDefault();
        var {dispatch} = this.props;
        var userEmailCreate = this.refs.userEmailCreate.value;
        var userPasswordCreate = this.refs.userPasswordCreate.value;
        dispatch(actions.startCreateUser(userEmailCreate, userPasswordCreate));
    },
    onLoginUser(e) {

        e.preventDefault();
        var {dispatch} = this.props;
        var userEmailLogin = this.refs.userEmailLogin.value;
        var userPasswordLogin = this.refs.userPasswordLogin.value;
        dispatch(actions.startLoginUser(userEmailLogin, userPasswordLogin));
    },
    onResendPassword (e){
        e.preventDefault();
        var {dispatch} = this.props;
        var userEmailLogin = this.refs.userEmailLogin.value;
        dispatch(actions.startResendPassword(userEmailLogin));
    },
    render() {

        var {auth} = this.props;

        var lon = -1.4701;
        var lat = 53.3811;

        var errorMessage = "";

        if (auth.hasOwnProperty("error")) {// There is an error

            var firebaseErrorCode = auth.error.code;
            var firebaseErrorMessage = auth.error.message;
            switch (firebaseErrorCode) {
                case "auth/user-not-found":
                    errorMessage = "User does not exist";
                    break;
                default:
                    errorMessage = firebaseErrorMessage;
            }
        }

        return (
            <div>
                <h1 className="page-title"></h1>

                <div className="row">
                    <div className="columns small-5 medium-5 large-5">
                        <Test/>



                    { /* <TodoListAll/> */}
                    </div>
                    <div className="columns small-5 medium-5 large-5">
                        <div className="callout callout-auth">
                            <h3>Register</h3>
                            <p>
                                Create account below.
                            </p>

                            <form>
                                <input type="email" ref="userEmailCreate" placeholder="Enter email address"/>
                                <input type="password" ref="userPasswordCreate" placeholder="Enter password"/>
                                <button className="button" onClick={this.onCreateUser}>Create Account</button>
                            </form>

                            <h3>Login</h3>
                            <p>
                                Login below.
                            </p>

                            <form>
                                <input type="email" ref="userEmailLogin" placeholder="Enter email address"/>
                                <input type="password" ref="userPasswordLogin" placeholder="Enter password"/>
                                <div className="error">{errorMessage}</div>
                                <button className="button" onClick={this.onLoginUser}>Log in</button>
                            </form>
                            <a href="#" onClick={this.onResendPassword}  >Resend password</a>
                            <p/>

                            <p>
                                Login with GitHub account below.
                            </p>
                            <button className="button" onClick={this.onLogin}>Login With GitHub</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

//export default Redux.connect()(Login);
export default connect(
    (state) => {
        return {
            auth: state.auth
        }
    }
)(Login);