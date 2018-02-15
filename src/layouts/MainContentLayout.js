import React from 'react';
import { Grid, Icon, Input } from 'semantic-ui-react';
import styled from 'styled-components';

const LeftHeaderWrapper = styled.div`
  align-self: center;
  flex-grow: 1;
  cursor: pointer;
  padding: 0 12px;
`;

const ColumnHeaderWrapper = styled.div`
  background: #5682a3;
  color: white;
  min-height: 48px;
  padding: 0;
  flex-grow: 0 !important;
  flex-direction: row !important;
  justify-content: flex-start !important;
  display: flex !important;
  & > * {
    align-self: center;
  }
`;

class HeaderLayout extends React.Component {
  // state = {
  //   showMenu: false,
  //   newChannelModal: false,
  // };

  // menuTrigger = () => {
  //   this.setState(state => ({ showMenu: !state.showMenu }));
  // };

  // logoutTrigger = () => {
  //   localStorage.removeItem('token');
  //   this.props.history.push('/');
  // };

  // newChannelModalTrigger = () => {
  //   this.setState(state => ({ newChannelModal: !state.newChannelModal }));
  // };

  render() {
    // const { showMenu, newChannelModal } = this.state;
    // const { data: { loading, me } } = this.props;
    // console.log(this.props);
    // if (loading) return <div />;
    return (
      // <Grid.Row>
      <React.Fragment>
        <Grid.Column width={5} style={{ padding: 0 }}>
          <div style={{ borderRight: '2px solid #E9EBED', height: '100%' }}>
            <Input
              fluid
              placeholder="Search..."
              iconPosition="left"
              style={{ flexGrow: 0, padding: '12px' }}
            >
              <Icon name="search" flipped="horizontally" style={{ left: 'auto' }} />
              <input style={{ background: '#F2F2F2' }} />
            </Input>
            {/* <ChannelsList me={me} /> */}
          </div>
        </Grid.Column>

        <Grid.Column width={11} style={{ padding: 0 }}>
          <div style={{ background: 'green' }}>{this.props.children}</div>
        </Grid.Column>
      </React.Fragment>

      // </Grid.Row>
    );
  }
}

export default HeaderLayout;
