import React from 'react';
import { hashHistory } from 'react-router';
import { Link } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';

import { isNumber, isEmpty } from 'lodash';

import ProjWizStep1 from '../components/ProjWizStep1';
import ProjWizStep2 from '../components/ProjWizStep2';
import ProjWizStep3 from '../components/ProjWizStep3';
import ProjWizStep4 from '../components/ProjWizStep4';
import ProjWizStep5 from '../components/ProjWizStep5';

import { createProject, getProjects, uploadProjThumb, deleteImage } from '../actions/projects';

import createProjectSelector from '../selectors/projects';
class ProjectWizardView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finished: false,
      stepIndex: 0,
      project_name: '',
      project_image: {},
      building_type: '',
      latitude: null,
      longitude: null
    };

    this.handleProjNameSubmit = this.handleProjNameSubmit.bind(this);
    this.handleProjImage = this.handleProjImage.bind(this);
    this.handleBTSubmit = this.handleBTSubmit.bind(this);
    this.handleProjLocation = this.handleProjLocation.bind(this);
    this.handleFinish = this.handleFinish.bind(this);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  handleProjNameSubmit(val) {
    if (val.project_name.length > 0) {
      this.setState({
        project_name: val.project_name
      });

      this.handleNext();
    }
  }

  handleProjImage(val) {
    const { projectThumb } = this.props;

    this.setState({
      project_image: projectThumb
    });

    this.handleNext();
  }

  handleBTSubmit(val) {
    this.setState({
      building_type: val.building_type
    });

    this.handleNext();
  }

  handleProjLocation(val) {
    if (!isEmpty(val) && isNumber(val.latitude) && isNumber(val.longitude)) {
      this.setState({
        latitude: val.latitude,
        longitude: val.longitude
      });

      this.handleNext();
    }
  }

  handleFinish() {
    const { createProject } = this.props;
    createProject(this.state);
    hashHistory.push('/');
  }

  handleNext(){
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex === 4
    });
  }

  handlePrev(){
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  render() {
    const { finished, stepIndex, project_image } = this.state;
    const { uploadProgress, uploadProjThumb, projectThumb, deleteImage } = this.props;

    return (
      <div className="default_page_wrapper">
        <Paper zDepth={1} className="wizard_step_wrapper">
          <Link to="/">
            <IconButton iconClassName="material-icons" className="close_wrapper">
              &#xE5CD;
            </IconButton>
          </Link>

          {stepIndex > 0 ? (
            <IconButton className="step_back" iconClassName="material-icons" tooltip="Back" onClick={this.handlePrev}>
              &#xE314;
            </IconButton>
          ) : null}

          <div className="wizard_title">Create new project</div>

          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel />
            </Step>
            <Step>
              <StepLabel />
            </Step>
            <Step>
              <StepLabel />
            </Step>
            <Step>
              <StepLabel />
            </Step>
            <Step>
              <StepLabel />
            </Step>
          </Stepper>

          {stepIndex === 0 ? (
            <ProjWizStep1
              onSubmit={this.handleProjNameSubmit}
              initialValues={{ project_name: this.state.project_name }}
            />
          ) : null}
          {stepIndex === 1 ? (
            <span>
              <div className="form_title">Project thumbnail (optional)</div>
              <ProjWizStep2
                onSubmit={this.handleProjImage}
                uploadThumb={uploadProjThumb}
                uploadProgress={uploadProgress}
                initialValues={{ project_image: project_image }}
                uploadedThumbnail={projectThumb}
                removeImage={deleteImage}
              />
            </span>
          ) : null}
          {stepIndex === 2 ? (
            <span>
              <div className="form_title align_left">What building type is it?</div>
              <div className="form_subtitle">For mixed-use buildings, select the most prevalent type.</div>
              <ProjWizStep3
                onSubmit={this.handleBTSubmit}
                initialValues={{ building_type: this.state.building_type }}
              />
            </span>
          ) : null}
          {stepIndex === 3 ? (
            <span>
              <div className="form_title align_left">Please set the location.</div>
              <div className="form_subtitle">Please set the pointer by clicking in the map.</div>
              <ProjWizStep4
                onSubmit={this.handleProjLocation}
                initialValues={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }}
              />
            </span>
          ) : null}
          {stepIndex === 4 ? <ProjWizStep5 onSubmit={this.handleFinish} /> : null}
        </Paper>
      </div>
    );
  }
}

export default connect(createProjectSelector, { createProject, getProjects, uploadProjThumb, deleteImage })(
  ProjectWizardView
);
