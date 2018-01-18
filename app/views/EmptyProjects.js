import React from 'react';
import { Link } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import ProjectsHeader from '../components/ProjectsHeader';

const EmptyProjectsView = ({}) => (
  <div>
    <div className="add_project_btn_wrapper">
      <Link to="projects">
        <FloatingActionButton>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
      <div className="tooltips add_btn">
        <span className="visible">Create your first project.</span>
      </div>
    </div>

    <ProjectsHeader />

    <div className="container-fluid projects_list">
      <div className="empty_projects">You don‘t have any projects yet.</div>
    </div>
  </div>
);

export default EmptyProjectsView;
