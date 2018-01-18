import React from 'react';
import { Link, hashHistory } from 'react-router';

import Auth from '../modules/Auth';
import { logout } from '../actions/autorization';

import { validateEmail } from '../utils/utils';

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      empty_pass: false,
      empty_email: false,
      error: null,
      invalid_email: false
    };

    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.login = this.login.bind(this);

    if (Auth.isUserLoggedIn()) {
      logout();
    }
  }

  login(email, password) {
    DB.login(email, password)
      .then(success => {
        // console.log('login succes: ', success);
        Auth.setUser(success.first_name, success.last_name);
        hashHistory.push('/');
      })
      .catch(e => {
        this.setState({ error: e.message });
      });
  }

  inputValidation(name) {
    switch (name) {
      case 'email':
        if (this.state.email.length < 1 && this.state.email.length === 0) {
          this.setState({ empty_email: true });
        } else {
          this.setState({ empty_email: false });
        }
        break;
      case 'pass':
        if (this.state.password.length < 1 && this.state.password.length === 0) {
          this.setState({ empty_pass: true });
        } else {
          this.setState({ empty_pass: false });
        }
        break;
      default:
        if (this.state.password.length < 1 && this.state.password.length === 0) {
          this.setState({ empty_pass: true });
        } else {
          this.setState({ empty_pass: false });
        }

        if (this.state.email.length < 1 && this.state.email.length === 0) {
          this.setState({ empty_email: true });
        } else {
          this.setState({ empty_email: false });
        }
        break;
    }

    if (!validateEmail(this.state.email) && !this.state.empty_email && this.state.email.length>0){
      this.setState({invalid_email: true});
    } else {
      this.setState({invalid_email: false});
    }
  }

  updateEmail(e) {
    this.setState({ email: e.target.value });
  }

  updatePassword(e) {
    this.setState({ password: e.target.value });
  }

  loginHandler(e) {
    e.preventDefault();

    if (validateEmail(this.state.email) && this.state.password.length > 0) {
      this.login(this.state.email, this.state.password);
    } else {
      this.inputValidation();
    }
  }

  render() {
    return (
      <form className="login_form">
        <div className="logo">
          <img src="./images/grafik-assets/logo.svg" />
        </div>

        {this.state.error ? <div className="server_error">{this.state.error}</div> : ''}

        <div className="form_content">
          <div className="form-group">
            <label htmlFor="email_input">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              name="email_input"
              id="email_input"
              required
              onBlur={() => {
                this.inputValidation('email');
              }}
              onChange={this.updateEmail}
            />
            <span className="help-block error_validation">
              {this.state.empty_email ? 'Enter your e-mail.' : ''}
              {this.state.invalid_email ? 'Email is not valid.' : ''}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="password_input">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password_input"
              id="password_input"
              required
              onBlur={() => {
                this.inputValidation('pass');
              }}
              onChange={this.updatePassword}
            />
            <span className="help-block error_validation">{this.state.empty_pass ? 'Enter your password.' : ''}</span>
          </div>

          <div className="login_btn" onClick={this.loginHandler}>
            login
          </div>

          <div className="forgot">
            <div>I forgot my password</div>
          </div>

          <div className="register">
            <Link to="regisration">I don’t have an account</Link>
          </div>
        </div>
      </form>
    );
  }
}
