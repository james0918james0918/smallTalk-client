import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const teamMenu = ({ history, match, location }) => (
  <Menu
    mode="inline"
    theme="dark"
    defaultSelectedKeys={['announcement']}
  >
    <Menu.Item
      key="announcement"
      onClick={() => {
        history.push(`${match.url}/announcement`, { id: location.state.id });
      }}
    >
      <Icon type="notification" />
      <span> announcement </span>
    </Menu.Item>
    <Menu.Item>
      <Icon type="notification" />
      <span> test 1 </span>
    </Menu.Item>
    <Menu.Item>
      <Icon type="notification" />
      <span> test 2 </span>
    </Menu.Item>
  </Menu>
);

export default withRouter(teamMenu);
