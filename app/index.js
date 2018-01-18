import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';
import { Iterable } from 'immutable';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { assign, mapValues } from 'lodash';

import reducers from './reducers/index';

import Main from './layouts/Main';
import EmptyProjectsView from './views/EmptyProjects';
import ProjectsView from './views/Projects';
import DetailsView from './views/Details';
import LoginView from './views/Login';
import RegistrationView from './views/Registration';
import ProjectWizardView from './views/ProjectWizardView';
import TestView from './views/TestView';

import { dbConnect } from './actions/autorization';
import Auth from './modules/Auth';

import './styles/index.scss';

const requireAuth = (nextState, replace) => {
  if (!Auth.isUserLoggedIn()) {
    replace({ pathname: '/login' });
  }
};

const store = createStore(
  combineReducers(
    assign(reducers, {
      form: formReducer,
      routing: routerReducer
    })
  ),
  applyMiddleware(thunk, routerMiddleware(hashHistory))
);

const history = syncHistoryWithStore(hashHistory, store)

const Application = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/login" component={LoginView} />
        <Route path="/regisration" component={RegistrationView} />

        <Route onEnter={requireAuth}>
          <Route path="/" component={ProjectsView} />
          <Route path="/details" component={DetailsView} />
          <Route path="/project_create" component={ProjectWizardView} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

dbConnect();

render(<Application />, document.getElementById('root'));
