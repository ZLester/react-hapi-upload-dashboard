import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './App';
import Users from './Users';
import './index.css';

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Users} />
    </Route>
  </Router>
), document.getElementById('root'));
