const logInReducer = (
  state = {
    logged: false,
    nick: 'Test',
    email: 'Testing',
    uid: ''
  },
  action
) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        logged: true,
        nick: action.payload.nick,
        email: action.payload.email,
        uid: action.payload.uid
      };
    default:
      return state;
  }
};

export default logInReducer;
