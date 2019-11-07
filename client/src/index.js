import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import './index.css';

import App from './App';
import Profile from './components/Profile'

import * as serviceWorker from './serviceWorker';

const Routes = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">App</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>

      <hr />

      <Route exact path="/" component={() => (<Redirect to='/app' />)} />
      <Route exact path="/app" component={App} />
      <Route path="/profile" component={Profile} />
    </div>
  </Router>
);

ReactDOM.render(<Routes />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
