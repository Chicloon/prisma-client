import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';

import CreateChannel from './CreateChannel';
import LeftMenu from '../components/LeftMenu';

export const LeftHeaderWrapper = styled.div`
  align-self: center;
  flex-grow: 1;
  cursor: pointer;
  padding: 0 12px;
`;

class LeftHeader extends React.Component {
  state = {
    showMenu: true,
    newChannelModal: false,
  };

  menuTrigger = () => {
    console.log(this.state.showMenu);
    this.setState(state => ({ showMenu: !state.showMenu }));
    console.log('show menu', this.state.showMenu);
  };

  logoutTrigger = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.props.history.push('/');
  };

  newChannelModalTrigger = () => {
    this.setState(state => ({ newChannelModal: !state.newChannelModal }));
  };

  render() {
    const { showMenu, newChannelModal } = this.state;
    console.log('rendering left header', this.state);
    return (
      <React.Fragment>
        <LeftHeaderWrapper onClick={this.menuTrigger}>
          <Icon
            name={showMenu ? 'remove' : 'sidebar'}
            size="large"
            style={{ margin: '0 40px 0 0', cursor: 'pointer' }}
          />
          <span>Telegram-clone</span>
        </LeftHeaderWrapper>
        {showMenu && (
          <LeftMenu
            menuTrigger={this.menuTrigger}
            logoutTrigger={this.logoutTrigger}
            newChannelModalTrigger={this.newChannelModalTrigger}
          />
        )}
        <CreateChannel onClose={this.newChannelModalTrigger} open={newChannelModal} />
      </React.Fragment>
    );
  }
}

export default LeftHeader;
