import Immutable from 'immutable';

import createReducer from '../utils/createReducer';

import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILURE
} from '../actions/registration';

const initialState = Immutable.fromJS({
  pending: true,
  error: null,
  user_name: null
});

export default createReducer(initialState, {
  [USER_REGISTER_REQUEST]: (state, {payload}) => state.merge({
    pending: true,
    error: null
  }),
  [USER_REGISTER_SUCCESS]: (state, {payload}) => state.merge({
    pending: false,
    error: null,
    user_name: payload.user_name
  }),
  [USER_REGISTER_FAILURE]: (state, {payload}) => state.merge({
    pending: false,
    error: true,
    flash: {
      type: 'error',
      title: 'Error!',
      text: payload
    }
  })
});