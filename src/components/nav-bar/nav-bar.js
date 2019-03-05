import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserService, AuthService } from '../../services/index';
import { getUsernameQuery } from '../../helpers/index';
import './nav-bar.scss';

const userService = new UserService();
const authService = new AuthService();

const Menu = withRouter(({ history, menuRef }) => (
  // Here, this.menu will be the DOM node of <ul> .... </ul>
  <ul className="nav-bar__settings" ref={menuRef}>
    <Link to="/landing" className="nav-bar__settings__item nav-bar__settings__item--link">
      <FontAwesomeIcon icon="cog" />
      <span> Settings </span>
    </Link>
    <button type="button" onClick={authService.logOut.bind(null, history)} className="nav-bar__settings__item nav-bar__settings__item--btn">
      <FontAwesomeIcon icon="sign-in-alt" />
      <span> Log out </span>
    </button>
  </ul>
));


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      username: '',
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  async componentDidMount() {
    try {
      const res = await userService.get(getUsernameQuery(this.props.location.search));
      this.setState({ username: res.data });
    } catch (err) {
      this.props.history.push('/landing');
    }
  }

  showMenu() {
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu(e) {
    // Check if the event is fired from the Menu's children
    if (!this.menu.contains(e.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

  render() {
    return (
      <div className="nav-bar">
        <Link to="/landing" className="nav-bar__brand">
          <FontAwesomeIcon icon="mars" />
          <span> SmallTalk </span>
        </Link>
        <div className="nav-bar__user-group">
          <span className="nav-bar__user-group__username"> Hello, {this.state.username} </span>
          <FontAwesomeIcon className="nav-bar__user-group__user-cog" icon="user-cog" onClick={this.showMenu} />
        </div>
        {/* Get a refernce of DOM node of Menu */}
        {/* Pass a callback funtion inside functional component */}
        { this.state.showMenu ? <Menu menuRef={(element) => { this.menu = element; }} /> : null }
      </div>
    );
  }
}

export default NavBar;
