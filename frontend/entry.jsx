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

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const count = reducers.count;

const reducer = combineReducers({
  count,
  routing: routerReducer,
});

const store = createStore(
  reducer
);

const history = syncHistoryWithStore(browserHistory, store);
const layout = (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" component={Login} />
          <Route path="/home" component={Home} />
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
