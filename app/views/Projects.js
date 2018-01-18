import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { getProjects, createProject } from '../actions/projects';

import createProjectSelector from '../selectors/projects';

import ProjectsHeader from '../components/ProjectsHeader';
import ProjectListView from '../components/ProjectsList';

class ProjectsView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { getProjects } = this.props;
    getProjects();
  }

  componentDidUpdate(prevProps, prevState){
    // console.log('prevProps: ', prevProps);
    // console.log('prevState: ', prevState);
  }

  render() {
    const { projectsList, createProject } = this.props;

    // console.log('ProjectsView props: ', this.props);

    return (
      <div>
        <div className="add_project_btn_wrapper">
          <Link to="project_create">
            <FloatingActionButton>
              <ContentAdd />
            </FloatingActionButton>
          </Link>
          {projectsList.size < 1 ? (
            <div className="tooltips add_btn">
              <span className="visible">Create your first project.</span>
            </div>
          ) : null}
        </div>

        <ProjectsHeader />
        {projectsList.size > 0 ? (
          <ProjectListView list={projectsList} duplicateProject={createProject} />
        ) : (
          <div className="container-fluid projects_list">
            <div className="empty_projects">You don‘t have any projects yet.</div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(createProjectSelector, { getProjects, createProject })(ProjectsView);
