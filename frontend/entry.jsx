import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as reducers from './reducers';
import Home from './components/Home.js';
import Login from './components/Login.js';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import * as apiFunctions from './api/apiFunctions.js';

import { RECIEVE_USER } from './constants.js';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const count = reducers.count;
const user = reducers.user;
const tasks = reducers.tasks;

const reducer = combineReducers({
  count,
  user,
  tasks,
  routing: routerReducer,
});

const store = createStore(
  reducer
);

let currentValue;
function handleChange() {
  const previousValue = currentValue;
  currentValue = store.getState().user;

  if (previousValue !== currentValue) {
    if (currentValue && currentValue.id) {
      browserHistory.push('/home');
    } else if (currentValue) {
      browserHistory.push('/login');
    }
  }
}

store.subscribe(handleChange);

export const setUser = (userpar) => ({
  type: RECIEVE_USER,
  user: userpar,
});

apiFunctions.doAuthenticate()
  .then((response) => {
    const userAction = setUser(response.data);
    store.dispatch(userAction);
  })
  .catch((err) => {
    console.log('USER FAILURE', err); //eslint-disable-line
  });

function redirectIfNotAuthenticated(nextState, replace) {
  const loggedinUser = store.getState().user;
  if (!(loggedinUser && loggedinUser.id)) {
    replace({
      pathname: '/login',
    });
  }
}

function redirectIfAuthenticated(nextState, replace) {
  const loggedinUser = store.getState().user;
  if (loggedinUser && loggedinUser.id) {
    replace({
      pathname: '/home',
    });
  }
}

const history = syncHistoryWithStore(browserHistory, store);
const layout = (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" />
          <Route path="/login" component={Login} onEnter={redirectIfAuthenticated} />
          <Route path="/home" component={Home} onEnter={redirectIfNotAuthenticated} />
        </Router>
      </div>
    </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
  layout
  ,
  document.getElementById('mount')
);
