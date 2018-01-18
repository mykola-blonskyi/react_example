import { createSelector } from 'reselect';

export const state = globalState => globalState.logout;

export const pending = createSelector(state, state => state.get('pending'));

export const flash = createSelector(createSelector(state, state => state.get('flash')), flash => flash);

export default createSelector(pending, flash, (pending, flash) => ({
  pending,
  flash
}));
