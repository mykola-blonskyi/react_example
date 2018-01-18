import React from 'react';
import { Link, hashHistory } from 'react-router';

import { validateEmail } from '../utils/utils';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      gender: 'male',
      first_name: '',
      last_name: '',
      empty_fname: false,
      empty_lname: false,
      empty_pass: false,
      empty_email: false,
      error: null,
      invalid_email: false
    };

    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateGender = this.updateGender.bind(this);
    this.updateFName = this.updateFName.bind(this);
    this.updateLName = this.updateLName.bind(this);
    this.registerHandle = this.registerHandle.bind(this);

    this.registration = this.registration.bind(this);
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
      case 'fname':
        if (this.state.first_name.length < 1 && this.state.first_name.length === 0) {
          this.setState({ empty_fname: true });
        } else {
          this.setState({ empty_fname: false });
        }
        break;
      case 'lname':
        if (this.state.last_name.length < 1 && this.state.last_name.length === 0) {
          this.setState({ empty_lname: true });
        } else {
          this.setState({ empty_lname: false });
        }
        break;
      default:
        if (this.state.last_name.length < 1 && this.state.last_name.length === 0) {
          this.setState({ empty_lname: true });
        } else {
          this.setState({ empty_lname: false });
        }

        if (this.state.first_name.length < 1 && this.state.first_name.length === 0) {
          this.setState({ empty_fname: true });
        } else {
          this.setState({ empty_fname: false });
        }

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

  updateGender(e) {
    this.setState({ gender: e.target.value });
  }

  updateFName(e) {
    this.setState({ first_name: e.target.value });
  }

  updateLName(e) {
    this.setState({ last_name: e.target.value });
  }

  registerHandle(e) {
    e.preventDefault();

    if (
      validateEmail(this.state.email) &&
      this.state.password.length > 0 &&
      this.state.first_name.length > 0 &&
      this.state.last_name.length > 0
    ) {
      this.registration(
        this.state.email,
        this.state.password,
        this.state.gender,
        this.state.first_name,
        this.state.last_name
      );
    } else {
      this.inputValidation();
    }
  }

  registration(email, password, gender, first_name, last_name) {
    DB.User.register(email, password)
      .then(success => {
        DB.User.me.first_name = first_name;
        DB.User.me.last_name = last_name;
        DB.User.me.gender = gender;
        DB.User.me.update();

        // console.log('registration succes: ', success);

        Auth.setUser(success.first_name, success.last_name);
        hashHistory.push('/');
      })
      .catch(e => {
        this.setState({ error: e.message });
      });
  }

  render() {
    return (
      <form className="registration_form">
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

          <div className="form-group">
            <label className="radio-inline" htmlFor="male">
              <input type="radio" name="gender" id="male" value="male" defaultChecked onChange={this.updateGender} />{' '}
              Male
            </label>
            <label className="radio-inline" htmlFor="female">
              <input type="radio" name="gender" id="female" value="female" onChange={this.updateGender} /> Female
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="fname_input">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="fname_input"
              id="fname_input"
              required
              onBlur={() => {
                this.inputValidation('fname');
              }}
              onChange={this.updateFName}
            />
            <span className="help-block error_validation">
              {this.state.empty_fname ? 'Enter your first name.' : ''}
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="lname_input">Last Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              name="lname_input"
              id="lname_input"
              required
              onBlur={() => {
                this.inputValidation('lname');
              }}
              onChange={this.updateLName}
            />
            <span className="help-block error_validation">{this.state.empty_lname ? 'Enter your last name.' : ''}</span>
          </div>

          <div className="register_btn" onClick={this.registerHandle}>
            register
          </div>
        </div>
      </form>
    );
  }
}
