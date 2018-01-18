import React from 'react';

import LoginForm from '../components/LoginForm';

export default class LoginView extends React.Component{
  render(){
    return (
      <div className="login_wrapper">
        <LoginForm />
      </div>
    );
  }
}