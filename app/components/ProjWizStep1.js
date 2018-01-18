import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';

const validate = values => {
  const errors = {};
  const requiredFields = ['project_name'];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Please enter a name';
    }
  });
  return errors;
};

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label} floatingLabelText={label} errorText={touched && error} {...input} {...custom} />
);

const ProjWizStep1 = props => {
  const { handleSubmit } = props;

  return (
    <form className="proj_create_step1_wrapper" onSubmit={handleSubmit}>
      <Field
        name="project_name"
        component={renderTextField}
        label="Add a project name"
        className="project_name_input"
        fullWidth={true}
      />

      <div className="clearfix bottom_button">
        <RaisedButton
          label="Continue"
          primary={true}
          className={classNames('wizard_btn', { empty_value: props.invalid })}
          type="submit"
        />
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'ProjWizStep1',
  fields: ['project_name'],
  validate
})(ProjWizStep1);
