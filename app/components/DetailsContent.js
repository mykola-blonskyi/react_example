import React from 'react';
import classNames from 'classnames';

import { Dropdown, MenuItem } from 'react-bootstrap';

import CustomToggle from './CustomToggle';

export default class DetailsContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tab_1: true,
      tab_2: false
    };
  }

  tabClickHandler(tab_num) {
    if (tab_num === 2) {
      this.setState({ tab_1: false, tab_2: true });
    } else {
      this.setState({ tab_1: true, tab_2: false });
    }
  }

  render() {
    return (
      <div className="content">
        <div className="version_header clearfix">
          <Dropdown id="dropdown-custom-1" pullRight>
            <CustomToggle bsRole="toggle">
              <i className="fa fa-ellipsis-v" aria-hidden="true" />
            </CustomToggle>
            <Dropdown.Menu className="dropdown-menu-right">
              <MenuItem eventKey="1">action 1</MenuItem>
              <MenuItem eventKey="2">action 2</MenuItem>
            </Dropdown.Menu>
          </Dropdown>

          <div className="version_image">
            <img src="./images/item_322429.png" alt="Version A" />
          </div>

          <div className="version_title">Version A</div>
        </div>

        <div className="tabs_wrapper">
          <div className="tab_header clearfix">
            <div
              className={classNames('tab', { active: this.state.tab_1 })}
              onClick={() => {
                this.tabClickHandler(1);
              }}
            >
              optimization bot
            </div>
            <div
              className={classNames('tab', { active: this.state.tab_2 })}
              onClick={() => {
                this.tabClickHandler(2);
              }}
            >
              manual simulations
            </div>
          </div>

          <div className="tab_content">
            <div className="content_1">
              <img className="optimization_bot" src="./images/grafik-assets/robot.svg" />

              <div className="start_optimization_wrapper">
                <div className="possible_solutions">
                  Wow, I see there are
                  <b>20,424,424,011</b> possible solutions to combine materials and technologies in this scenario.
                </div>

                <div className="dont_worry">
                  Don‘t worry. I can help you find the best solution
                  <br /> – tailor-made to meet your goals.
                </div>

                <div className="free_optimization">You have 1 optimization run free in your trial plan.</div>

                <div className="start_optimization_btn">start optimization</div>

                <div className="estimated_time">Estimated server run time: approx. 48:00 h</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
