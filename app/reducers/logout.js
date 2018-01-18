import Immutable from 'immutable';

import createReducer from '../utils/createReducer';

import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actions/logout';

const initialState = Immutable.fromJS({
  pending: false,
  error: null
});

export default createReducer(initialState, {
  [LOGOUT_REQUEST]: (state, {payload}) => state.merge({
    pending: true,
    error: null
  }),
  [LOGOUT_SUCCESS]: (state, {payload}) => state.merge({
    pending: false,
    error: null
  }),
  [LOGOUT_FAILURE]: (state, {payload}) => state.merge({
    pending: false,
    error: true,
    flash: {
      type: 'error',
      title: 'Error!',
      text: payload
    }
  })
});