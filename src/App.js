import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Test from './components/Test';
import NotFound from './components/NotFound';
import LoginForm from './containers/LoginForm';
import SignupForm from './containers/SignupForm';
import CreateChannel from './containers/CreateChannel';
import ChannelList from './containers/ChannelList';
import MainLayout from './layouts/MainLayout';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <MainLayout>
            <React.Fragment>
              <Route exact path="/create-channel" component={CreateChannel} />
              <Route exact path="/" component={Test} />
              <Route exact path="/channel-list" component={ChannelList} />
            </React.Fragment>
          </MainLayout>
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
