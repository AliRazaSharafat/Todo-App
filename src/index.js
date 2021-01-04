import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'; //React router dom provider
import { applyMiddleware, createStore, combineReducers, compose } from 'redux'; //Redux modules
import CompletedReducer from './store/reducers/Completed';  //Completed Reducer
import TodoReducer from './store/reducers/Todo';  //Todo Reduceer
import DeletedReducer from './store/reducers/Deleted';  //Deleted Reducer
import thunk from 'redux-thunk';  //for asynchronous tasks
import { Provider } from 'react-redux'; //combine redux with react

const rootReducer = combineReducers({
  todo: TodoReducer,
  completed: CompletedReducer,
  deleted: DeletedReducer
})
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);
