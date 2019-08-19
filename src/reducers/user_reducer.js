export const user_behavior = (state={}, action) => {
  switch (action.type){
    case 'LOGIN':
      return {
        logged_in: true,
        user_name: action.user_name
      }
    case 'LOGOUT':
      return {
        logged_in: false,
        user_name: ''
      }
    default:
      return state
  }
}