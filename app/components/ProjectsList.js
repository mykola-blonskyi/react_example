import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import classNames from 'classnames';

import { isNumber, range } from 'lodash';

import ProjectListItem from './ProjectListItem';

const items_per_page = 6;

export default class ProjectListView extends React.Component {
  constructor(props) {
    super(props);

    const { list } = this.props;

    this.state = {
      all_projects: list.toJS(),
      projects: null,
      total: 0,
      current_page: 0,
      filtered_list: [],
      pages: []
    };

    this.paginatedList = this.paginatedList.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  componentDidMount() {
    this.paginatedList(1, null);
  }

  handleSearch(e) {
    const { all_projects } = this.state;
    let search = e.target.value.toLowerCase().trim();
    let filteredList = all_projects.filter(
      proj => (proj.name ? proj.name.toLowerCase().indexOf(search) !== -1 : false)
    );

    this.paginatedList(1, filteredList);
  }

  paginatedList(page_number, filtered_list) {
    const { all_projects } = this.state;
    let total, projects_list;

    if (filtered_list) {
      total = filtered_list.length > 0 ? Math.ceil(filtered_list.length / items_per_page) : 0;
      projects_list = filtered_list;
    } else {
      total = all_projects.length > 0 ? Math.ceil(all_projects.length / items_per_page) : 0;
      projects_list = all_projects;
    }

    let startPage, endPage;
    if (total <= 10) {
      startPage = 1;
      endPage = total;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (page_number <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (page_number + 4 >= total) {
        startPage = total - 9;
        endPage = total;
      } else {
        startPage = page_number - 5;
        endPage = page_number + 4;
      }
    }

    let pages = range(startPage, endPage + 1);

    if (isNumber(page_number) && page_number > 0 && page_number <= total) {
      let start = page_number > 1 ? page_number * items_per_page - items_per_page : 0;
      let end = start + items_per_page;

      this.setState({
        projects: projects_list.slice(start, end),
        total: total,
        current_page: page_number,
        filtered_list: filtered_list,
        pages: pages
      });
    }
  }

  nextPage() {
    const { current_page, total, filtered_list } = this.state;

    if (current_page < total) {
      this.paginatedList(current_page + 1, filtered_list && filtered_list.length ? filtered_list : null);
    }
  }

  prevPage() {
    const { current_page, total, filtered_list } = this.state;

    if (current_page > 1) {
      this.paginatedList(current_page - 1, filtered_list && filtered_list.length ? filtered_list : null);
    }
  }

  goToPage(page) {
    const { filtered_list } = this.state;

    this.paginatedList(page, filtered_list && filtered_list.length ? filtered_list : null);
  }

  render() {
    const { list, duplicateProject } = this.props;
    const { projects, current_page, total, pages } = this.state;

    return (
      <div>
        <div className="container-fluid projects_list">
          <div className="row">
            <div className="col-lg-12 col-md-12 search_project">
              <input type="text" className="search_loop" onChange={this.handleSearch} />
            </div>
          </div>
          <div
            className={classNames('list_wrapper', {
              between: projects && projects.length > 2,
              around: projects && projects.length === 2
            })}
          >
            {projects
              ? projects.map(proj => (
                  <ProjectListItem
                    project={proj}
                    key={proj.id}
                    projId={proj.id}
                    title={proj.name ? proj.name : ''}
                    imageUrl={proj.thumbnail ? proj.thumbnail.url : ''}
                    scenarios={proj.scenarios ? pro.scenarios : 0}
                    duplicateProject={duplicateProject}
                  />
                ))
              : null}
          </div>
          <div className="pagination_wrapper">
            <FlatButton
              label="first"
              primary={current_page > 1}
              disabled={current_page === 1}
              onClick={() => this.goToPage(1)}
            />
            <FlatButton label="prev" primary={current_page > 1} onClick={this.prevPage} disabled={current_page === 1} />
            <div className="current_page">
              <ul>
                {pages.map((page, index) => (
                  <FlatButton key={page} label={page} primary={current_page === page} onClick={() => this.goToPage(page)} />
                ))}
              </ul>
            </div>
            <FlatButton
              label="next"
              primary={current_page < total}
              onClick={this.nextPage}
              disabled={current_page === total}
            />
            <FlatButton
              label="last"
              primary={current_page < total}
              disabled={current_page === total}
              onClick={() => this.goToPage(total)}
            />
          </div>
        </div>
      </div>
    );
  }
}
