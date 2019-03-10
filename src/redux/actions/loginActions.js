export const logUser = (email, nick, uid) => ({
  type: 'LOGIN_USER',
  payload: { email, nick, uid }
});

export const eslint = 'eslint';
