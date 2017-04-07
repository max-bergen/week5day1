import React, {Component} from 'react';

class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar">
        <a href="/" class="navbar-brand"></a>
        <span className="client-size">{this.props.size} users online</span>
      </nav>
    );
  }
}

export default Nav;
