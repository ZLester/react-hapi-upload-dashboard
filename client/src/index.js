import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './App';
import Users from './Users';
import './index.css';

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Users} />
      <Route path="/image" component={Image} />
    </Route>
  </Router>
), document.getElementById('root'));
