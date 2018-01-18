import Immutable from 'immutable';

import createReducer from '../utils/createReducer';

import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  GET_PROJECTS_REQUEST,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAILURE,
  UPLOAD_PROJECT_THUMB_REQUEST,
  UPLOAD_PROJECT_THUMB_PROGRESS,
  UPLOAD_PROJECT_THUMB_SUCCESS,
  UPLOAD_PROJECT_THUMB_FAILURE,
  DELETE_PROJECT_IMAGE_REQUEST,
  DELETE_PROJECT_IMAGE_SUCCESS,
  DELETE_PROJECT_IMAGE_FAILURE
} from '../actions/projects';

const initialState = Immutable.fromJS({
  pending: false,
  projects_list: [],
  project_thumbnail: {},
  upload_progress: 0,
  removed_image: {},
  errMsg: ''
});

export default createReducer(initialState, {
  [CREATE_PROJECT_REQUEST]: (state, { payload }) =>
    state.merge({
      pending: true
    }),
  [CREATE_PROJECT_SUCCESS]: (state, { payload }) => {
    let immutableProjectsList = state.get('projects_list');
    let projectsList = immutableProjectsList.toJS();
    let newProjectsList = projectsList.unshift(payload.new_project);

    return state.merge({
      pending: false,
      new_project: payload.new_project,
      projects_list: newProjectsList
    });
  },
  [CREATE_PROJECT_FAILURE]: (state, { payload }) =>
    state.merge({
      pending: false,
      errMsg: payload.errMsg
    }),
  [GET_PROJECTS_REQUEST]: (state, { payload }) =>
    state.merge({
      pending: true
    }),
  [GET_PROJECTS_SUCCESS]: (state, { payload }) =>
    state.merge({
      pending: false,
      projects_list: payload.projects_list
    }),
  [GET_PROJECTS_FAILURE]: (state, { payload }) =>
    state.merge({
      pending: false
    }),
  [UPLOAD_PROJECT_THUMB_REQUEST]: (state, { payload }) =>
    state.merge({
      pending: true
    }),
  [UPLOAD_PROJECT_THUMB_PROGRESS]: (state, { payload }) =>
    state.merge({
      pending: true,
      upload_progress: payload.progress
    }),
  [UPLOAD_PROJECT_THUMB_SUCCESS]: (state, { payload }) =>
    state.merge({
      pending: false,
      project_thumbnail: payload.thumbnail
    }),
  [UPLOAD_PROJECT_THUMB_FAILURE]: (state, { payload }) =>
    state.merge({
      pending: false,
      errMsg: payload.errMsg
    }),
  [DELETE_PROJECT_IMAGE_REQUEST]: (state, { payload }) =>
    state.merge({
      pending: true
    }),
  [DELETE_PROJECT_IMAGE_SUCCESS]: (state, { payload }) =>
    state.merge({
      pending: false,
      removed_image: payload.removed_image
    }),
  [DELETE_PROJECT_IMAGE_FAILURE]: (state, { payload }) =>
    state.merge({
      pending: false,
      errMsg: payload.errMsg,
      project_thumbnail: {}
    })
});
