import React from 'react';

import RegistrationForm from '../components/RegistrationForm';

export default class RegistrationView extends React.Component{
  constructor(props) {
    super(props);

    this.state = {};
  }

  render(){
    return (
      <div className="registration_wrapper">
        <RegistrationForm />
      </div>
    );
  }
}