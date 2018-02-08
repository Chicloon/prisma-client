import 'semantic-ui-css/semantic.min.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Test from './components/Test';
import LoginFrom from './containers/LoginForm';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Test} />
          <Route exact path="/login" component={LoginFrom} />
        </Switch>
      </Router>
    );
  }
}

export default App;
