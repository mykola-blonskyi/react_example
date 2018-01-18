import { createSelector } from 'reselect';

export const state = globalState => globalState.projectsReducer;

export const pending = createSelector(state, state => state.get('pending'));

export const projectsList = createSelector(
  createSelector(state, state => state.get('projects_list')),
  projectsList => projectsList
);

export const newProject = createSelector(
  createSelector(state, state => state.get('new_project')),
  newProject => newProject
);

export const projectThumb = createSelector(
  createSelector(state, state => state.get('project_thumbnail')),
  projectThumb => projectThumb
);

export const uploadProgress = createSelector(
  createSelector(state, state => state.get('upload_progress')),
  uploadProgress => uploadProgress
);

export const removedImage = createSelector(
  createSelector(state, state => state.get('removed_image')),
  removedImage => removedImage
);

export default createSelector(
  pending,
  projectsList,
  newProject,
  projectThumb,
  uploadProgress,
  removedImage,
  (pending, projectsList, newProject, projectThumb, uploadProgress, removedImage) => ({
    pending,
    projectsList,
    newProject,
    projectThumb,
    uploadProgress,
    removedImage
  })
);
