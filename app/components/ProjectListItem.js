import React from 'react';
import { Link } from 'react-router';
import { Dropdown, MenuItem, Modal, Button } from 'react-bootstrap';

import CustomToggle from './CustomToggle';

export default class ProjectListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };

    this.handleOpen = this.open.bind(this);
    this.handleClose = this.close.bind(this);
    this.handleDuplicateProject = this.handleDuplicateProject.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  handleDuplicateProject(){
    const { project, title, duplicateProject } = this.props;

    project.name = `Copy of ${title}`;

    duplicateProject(project);
  }

  render() {
    const { project, projId, title, imageUrl, scenarios } = this.props;

    return (
      <div className="project_item_wrapper">
        <div className="project_image">
          <Link to="details">{imageUrl.length ? <img src={imageUrl} alt={title} /> : null}</Link>
        </div>

        <Dropdown id="proj_actions_dropdown" className="project_actions_wrapper">
          <CustomToggle bsRole="toggle">
            <i className="fa fa-ellipsis-v" aria-hidden="true" />
          </CustomToggle>
          <Dropdown.Menu className="dropdown-menu-right">
            <MenuItem eventKey="1" onClick={this.handleOpen}>
              <i className="fa fa-cog" aria-hidden="true" /> Edit project
            </MenuItem>
            <MenuItem eventKey="2">
              <i className="fa fa-clone" aria-hidden="true" /> Duplicate project
            </MenuItem>
            <MenuItem divider />
            <MenuItem eventKey="3" className="remove_proj">
              Delete project
            </MenuItem>
          </Dropdown.Menu>
        </Dropdown>

        <div className="project_title">
          <Link to="details">{title}</Link>
        </div>

        <div className="scenarios_count">
          {scenarios} scenario{scenarios > 1 || scenarios < 1 ? 's' : ''}
        </div>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning!</Modal.Title>
          </Modal.Header>
          <Modal.Body>All simulations will be deleted! Are you sure you want to do this ?</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Yes</Button>
            <Button onClick={this.handleClose}>No</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
