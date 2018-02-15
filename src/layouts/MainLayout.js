import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Grid } from 'semantic-ui-react';

import HeaderLayout from './HeaderLayout';
import MainContentLayout from './MainContentLayout';

const style = {
  rowOne: {
    padding: 0,
    background: 'white',
    boxShadow: '0px 1px 0 #dfe5ec',
    borderRadius: '0 0 3px 3px',
    borderLeft: '1px solid #dfe5ec',
    borderRight: '1px solid #dfe5ec',
    borderBottom: '1px solid #d2dbe3',
    overflow: 'hidden',
  },
  rowTwo: {
    flex: '1 1 auto',
    padding: 0,
    background: 'white',
    boxShadow: '0px 1px 0 #dfe5ec',
    borderRadius: '0 0 3px 3px',
    borderLeft: '1px solid #dfe5ec',
    borderRight: '1px solid #dfe5ec',
    borderBottom: '1px solid #d2dbe3',
    overflow: 'hidden',
  },
  mainGrid: {
    height: ' 100vh',
    display: 'flex',
    flexFlow: 'column',
    margin: '0 -36px',
    paddingBottom: '24px',
  },
};

const MainLayout = props => (
  <div style={{ background: '#e7ebf0', height: '100%' }}>
    <Container>
      <Grid style={style.mainGrid}>
        <Grid.Row columns={2} stretched style={style.rowOne}>
          <HeaderLayout />
        </Grid.Row>
        <Grid.Row columns={2} stretched style={style.rowTwo}>
          <MainContentLayout>{props.children}</MainContentLayout>
        </Grid.Row>
      </Grid>
    </Container>
  </div>
);

export default withRouter(MainLayout);
