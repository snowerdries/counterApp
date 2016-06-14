import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';

import * as reducers from './reducers';
import { Home, Login } from './components';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const reducer = combineReducers({
  reducers,
  routing: routerReducer,
});

const store = createStore(
  reducer
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" component={Login} />
          <Route path="/home" component={Home} />
        </Router>
      </div>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('mount')
);
