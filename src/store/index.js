



import { createStore, applyMiddleware } from 'redux';
import reducer from "../reducers";
import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';



/*
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  );

//const store = createStore(reducer); // Терерь этот store доступен любой чайлдовой компоненнте этого провайдера
                                                            // сomposeWithDevTools(applyMiddleware(thunk))) это улучшенный метод DevTools  ко всему что передается ему во внутрь
                                                            // из проекта в проект

*/

const initialState = {  
    windowTables: true,
    windowGraphic: false,
    id: 456, 
    selcted_oven: 'raisa',
    selectedBorn: 1,
    lastBorn: 10
};

export const store = createStore(reducer, initialState);
console.log("initial state", store.getState());

