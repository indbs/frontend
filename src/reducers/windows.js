




const initialState = [
    'My home window',
    'My work window'
  ];
  
  function windows(state = initialState, action) {               // ф-ция меняет данные в store и  возвращает новое значение. Это Ф-ция редьюсер.
    if (action.type === 'SHOW_WINDOW') {
      return state;
    } else if (action.type === 'HIDE_WINDOW') {
      return state;
    }
    return state;
  }

  export default windows;