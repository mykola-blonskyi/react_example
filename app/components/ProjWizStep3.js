import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Field, reduxForm } from 'redux-form';
import classNames from 'classnames';

const validate = ({building_type}) => {
  const errors = {}

  if (!building_type) {
      errors.building_type = 'This field required'
  }
 
  return errors
}

const renderRadioGroup = ({ input, ...rest }) => (
  <RadioButtonGroup
    {...input}
    {...rest}
    valueSelected={input.value}
    onChange={(event, value) => input.onChange(value)}
  />
);

const ProjWizStep3 = props => {
  const { handleSubmit } = props;

  return (
    <form className="proj_create_step3_wrapper" onSubmit={handleSubmit}>
      <Field name="building_type" component={renderRadioGroup} className="clearfix">
        <RadioButton className="building_type_radio" value="single_family_house" label="Single family house" />
        <RadioButton className="building_type_radio" value="apartment_building" label="Apartment building" />
        <RadioButton className="building_type_radio" value="office_building" label="Office Building" />
        <RadioButton className="building_type_radio" value="industrial_building" label="Industrial building" />
        <RadioButton className="building_type_radio" value="warehouse" label="Warehouse" />
        <RadioButton className="building_type_radio" value="hospital" label="Hospital" />
        <RadioButton className="building_type_radio" value="hotel" label="Hotel" />
        <RadioButton className="building_type_radio" value="shopping_center" label="Shopping center" />
      </Field>

      <div className="clearfix bottom_button">
        <RaisedButton label="Continue" primary={true} className={classNames('wizard_btn', { empty_value: !props.valid })} type="submit" />
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'ProjWizStep3',
  fields: ['building_type'],
  validate
})(ProjWizStep3);
