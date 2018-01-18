import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Dropzone from 'react-dropzone';
import { Field, reduxForm, change } from 'redux-form';
import classNames from 'classnames';
import { isEmpty } from 'lodash';

import {uploadProjThumb} from '../actions/projects';

const renderDropzone = field => {
  let dropzoneRef;
  return (
    <div className="dropzone_wrapper clearfix">
      <Dropzone
        className={classNames('dropzone_area', { previewed: field.preview.length > 0 })}
        multiple={false}
        name={field.input.name}
        onDropAccepted={(filesToUpload, e) => {
          field.imagePreview(filesToUpload);
          return field.input.onChange(filesToUpload[0]);
        }}
        maxSize={field.maxSize}
        accept={field.accept}
        onDropRejected={field.isRejected}
        style={{ backgroundImage: `url(${field.preview})` }}
        ref={node => {
          dropzoneRef = node;
        }}
      >
        {field.progress > 0 && field.progress < 100 ? (
          <span className="upload_status">
            Uploading file <br />
            <span className="upload_percentage">{field.progress}%</span> <br />
            <progress className="upload_progress" value={field.progress} max="100" />
          </span>
        ) : (
          <span>
            <img className={classNames({ hidden: field.preview.length > 0 })} src="./images/grafik-assets/upload.svg" />
            <p className={classNames({ hidden: field.preview.length > 0 })}>
              Upload a picture for this project (optional)
            </p>
          </span>
        )}
      </Dropzone>

      <IconMenu
        className="thumbnail_menu"
        iconButtonElement={
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        }
        anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
      >
        <MenuItem
          onClick={() => {
            dropzoneRef.open();
          }}
          primaryText="Change thumbnail"
        />
        <MenuItem onClick={field.clearPreview} primaryText="Delete thumbnail" />
      </IconMenu>
    </div>
  );
};
class ProjWizStep2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      file: isEmpty(this.props.initialValues.project_image) ? null : this.props.initialValues.project_image,
      image_preview: isEmpty(this.props.initialValues.project_image) ? null : this.props.initialValues.project_image.url,
      error: false,
      progress: 0
    };

    this.initialState = {
      file: null,
      image_preview: null,
      error: false
    };

    this.uploadImage = this.handleUpload.bind(this);
    this.validateImage = this.validateImage.bind(this);
    this.clearPreview = this.clearPreview.bind(this);
  }

  clearPreview() {
    const {removeImage} = this.props;

    if(this.state.file){
      removeImage(this.state.file.name);
    }
    this.setState(this.initialState);
    this.props.change('project_image', {});
  }

  handleUpload(files) {
    const {uploadThumb, removeImage} = this.props;

    if(this.state.file){
      removeImage(this.state.file.name);
    }

    this.setState(this.initialState);

    let reader = new FileReader();
    let file = files[0];

    reader.readAsDataURL(file);

    uploadThumb(file);
  }

  validateImage(image) {
    if (image.length > 0) {
      this.setState({ file: null, image_preview: null, error: true });
    }
  }

  render() {
    let { file } = this.state;

    const { handleSubmit, uploadedThumbnail, uploadProgress } = this.props;

    return (
      <form className="proj_create_step2_wrapper" onSubmit={handleSubmit}>
        <Field
          name="project_image"
          component={renderDropzone}
          imagePreview={this.uploadImage}
          maxSize={10000000}
          accept="image/jpeg, image/png, image/gif"
          isRejected={this.validateImage}
          preview={!isEmpty(uploadedThumbnail) && uploadedThumbnail.size>0 ? uploadedThumbnail.url : ''}
          clearPreview={this.clearPreview}
          progress={uploadProgress}
        />

        <div className={classNames('error', { show: this.state.error })}>
          Please upload an image that is maximum 10MB and please note that only JPG, GIF or PNG is allowed.
        </div>

        <div className="clearfix bottom_button">
          <RaisedButton
            label={!isEmpty(uploadedThumbnail) && uploadedThumbnail.size>0 ? 'Continue' : 'Skip'}
            primary={true}
            className="wizard_btn"
            type="submit"
          />
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'ProjWizStep2'
})(ProjWizStep2);