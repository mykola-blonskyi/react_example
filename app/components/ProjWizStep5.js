import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {reduxForm} from 'redux-form';

const ProjWizStep5 = (props) => {
  const {handleSubmit} = props;
  return (
    <form className="proj_create_step5_wrapper" onSubmit={handleSubmit}>
      <img className="create_proj_success" src="./images/grafik-assets/success.svg"/>

      <p>
        Awesome! Your project has been created. <br/>
        Now, create you first scenario for this project.
      </p>

      <div className="clearfix bottom_button">
      <RaisedButton label="CREATE FIRST SCENARIO" type="submit" primary={true} className="wizard_btn" />
    </div>
    </form>
  );
}

export default reduxForm({
  form: 'ProjWizStep5'
})(ProjWizStep5);