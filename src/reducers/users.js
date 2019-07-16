






const initialState = [];
                                                                    // reducer принимает два значения – state и action. 
                                                                    // В Redux-приложении всё проходит через редуктор. 
                                                                    // Поэтому  поле action.type, чтобы reducer определял нужное действие:


function users(state = initialState, action) {
  if (action.type === 'ADD_USER') {
    return [
      ...state,
      action.payload
    ];
  } else if (action.type === 'FETCH_USERS_SUCCESS') {
    return action.payload;
  }
  return state;
}

export default users;