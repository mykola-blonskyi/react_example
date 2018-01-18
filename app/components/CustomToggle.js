import React from 'react';

export default class CustomToggle extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  render() {
    return (
      <div className="project_actions" onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  }
}
