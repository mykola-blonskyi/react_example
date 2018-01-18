import Immutable from 'immutable';

import createReducer from '../utils/createReducer';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE
} from '../actions/login';

const initialState = Immutable.fromJS({
  pending: true,
  flash: null,
  user_name: null
});

export default createReducer(initialState, {
  [LOGIN_REQUEST]: (state, {payload}) => state.merge({
    pending: true,
    flash: null
  }),
  [LOGIN_SUCCESS]: (state, {payload}) => state.merge({
    pending: false,
    flash: null,
    user_name: payload
  }),
  [LOGIN_FAILURE]: (state, {payload}) => state.merge({
    pending: false,
    error: true,
    flash: {
      type: 'error',
      title: 'Error!',
      text: payload
    }
  })
});