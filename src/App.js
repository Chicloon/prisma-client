import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';

import { meQuerry } from './graphql/queries';

import Test from './components/Test';
import NotFound from './components/NotFound';
import LoginForm from './containers/LoginForm';
import SignupForm from './containers/SignupForm';
import CreateChannel from './containers/CreateChannel';
import ChannelList from './containers/ChannelList';
import MainLayout from './layouts/MainLayout';

const PrivateRoute = ({ me, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (me.id ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
          }}
        />
      ))
    }
  />
);

class App extends React.Component {
  render() {
    const { me, loading, error } = this.props.data;
    if (loading) {
      return null;
    }
    if (error) {
      console.error(error.message);
    }
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          {me ? (
            <MainLayout>
              <React.Fragment>
                <Route exact path="/create-channel" component={CreateChannel} />
                <PrivateRoute me={me} exact path="/" component={Test} />
                <Route exact path="/channel-list" component={ChannelList} />
              </React.Fragment>
            </MainLayout>
          ) : (
            <Redirect to="/login" />
          )}
          <Route path="*" exact component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default compose(graphql(meQuerry))(App);
