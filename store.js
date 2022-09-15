import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
    form: formReducer,

});


const store = createStore(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)



export default store;
// import allReducers from './reducers/Userreducers'
// import { createStore } from "redux";
// const store = createStore(allReducers);
// export default store;

// const store = (window.devToolsExtension
//     ? window.devToolsExtension()(createStore)
//     : createStore)(reducers);



// import { createStore } from 'redux'
// import allreducers from './reducers/index'
// const store = (window.devToolsExtension
//     ? window.devToolsExtension()(createStore)
//     : createStore)(allreducers);
// console.log(store.getState())
// export default store;