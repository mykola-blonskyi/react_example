export default function createReducer(initialState, handlers) {
  return (state = initialState, action, ...rest) => {
      const reducer = handlers[action.type];
      return reducer ? reducer(state, action, ...rest) : state;
  };
}