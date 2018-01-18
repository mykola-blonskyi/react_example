import React from 'react';
import classNames from 'classnames';

export default class DetailsSideBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      active_a: true,
      active_b: false
    };
  }

  onClickHandler(vers){
    if(vers === 'a'){
      this.setState({active_a: true, active_b: false});
    } else {
      this.setState({active_a: false, active_b: true});
    }
  }

  render() {
    return (
      <aside className="proj_menu">
        <div className="menu_title">
          <img src="./images/grafik-assets/nav-myscenarios.svg" alt="My scenarios" /> My scenarios
        </div>
        <ul className="menu">
          <li className={classNames({active: this.state.active_a})} onClick={() => {
            this.onClickHandler('a')
          }}>Version A</li>
          <li className={classNames({active: this.state.active_b})} onClick={() => {
            this.onClickHandler('b')
          }}>Version B</li>
          <li className="add_new">+ Add new scenario</li>
        </ul>

        <div className="compare_btn">
          <img src="./images/grafik-assets/nav-compare.svg" alt="My scenarios" /> Compare
        </div>

        <div className="favorites_btn">
          <img src="./images/grafik-assets/nav-favorites.svg" alt="My scenarios" /> Favorites
        </div>
      </aside>
    );
  }
}
