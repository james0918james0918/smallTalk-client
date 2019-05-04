import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, Dropdown, Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserService } from '../../services/index';
import './nav-bar.scss';

const userService = new UserService();

const SettingMenu = () => (
  <Menu>
    <Menu.Item>
      <Icon type="setting" />
      setting
    </Menu.Item>
    <Menu.Item>
      <Icon type="logout" />
      Log out
    </Menu.Item>
  </Menu>
);


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    };
  }

  componentDidMount() {
    (async () => {
      try {
        const res = await userService.get();
        this.setState({ username: res.data });
      } catch (err) {
        this.props.history.push('/landing');
      }
    })();
  }

  render() {
    return (
      <div className="nav-bar">
        <Link to="/landing" className="nav-bar__brand">
          <FontAwesomeIcon icon="mars" />
          <span> SmallTalk </span>
        </Link>
        <Dropdown
        overlay={SettingMenu}
        className="nav-bar__dropdown"
        >
          <div>
            Hello, { this.state.username }
            <Icon
            type="down"
            style={{
              fontSize: '1.5rem'
            }}
            />
          </div>
        </Dropdown>
      </div>
    );
  }
}

export default withRouter(NavBar);
