var mockApiData = [
    {
      id: 1,
      name: 'USER 1'
    },
    {
      id: 2,
      name: 'USER 2'
    },
    {
      id: 3,
      name: 'USER 3'
    },
    {
      id: 4,
      name: 'USER 4'
    }
  ];
  
  
  export const getUsers = () => dispatch => {
    setTimeout(() => {
      console.log('I got users');
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: mockApiData })
    }, 2000)
  }