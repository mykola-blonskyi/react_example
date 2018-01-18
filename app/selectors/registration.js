import { createSelector } from 'reselect';

export const state = globalState => globalState.registration;

export const pending = createSelector(state, state => state.get('pending'));

export const user_name = createSelector(state, state => state.get('user_name'));

export const flash = createSelector(createSelector(state, state => state.get('flash')), flash => flash);

export default createSelector(pending, user_name, flash, (pending, user_name, flash) => ({
  pending,
  user_name,
  flash
}));
