import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Test from './components/Test';
import LoginForm from './containers/LoginForm';
import SignupForm from './containers/SignupForm';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Test} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/create-chat" component={CreateChat} />
        </Switch>
      </Router>
    );
  }
}

export default App;
