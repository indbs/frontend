export const login_action = (user_name) => ({
  type: 'LOGIN',
  title: 'USER LOGIN',
  user_name: user_name
})

export const logout_action = () => ({
  type: 'LOGOUT',
  title: 'USER LOGOUT',
  user_name: ''
})