export default (state = {}, action = { type: 'EMPTY_ACTION', payload: null }) => ({
  ...state,
  empty: action.type === 'EMPTY_ACTION'
});
