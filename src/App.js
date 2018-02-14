import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { meQuerry } from './graphql/querries';

import Test from './components/Test';
import LoginForm from './containers/LoginForm';
import SignupForm from './containers/SignupForm';
import CreateChat from './containers/CreateChat';
import ChannelList from './containers/ChannelList';

class App extends Component {
  render() {
    const { me, loading } = this.props.data;
    console.log(me);
    if (loading) {
      return null;
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Test} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/create-channel" component={CreateChat} />
          <Route exact path="/channel-list" component={ChannelList} />
        </Switch>
      </Router>
    );
  }
}

export default compose(graphql(meQuerry))(App);
