import React from 'react';
import TodoContainer from './container/TodoContainer/TodoContainer';
import Navbar from './component/navigation/navbar';
import { Redirect, Route } from 'react-router-dom';
import Completed from './container/Completed/Completed';
import Deleted from './container/Deleted/Deleted';
import Auth from './container/Auth/Auth';

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Route path="/" exact component={TodoContainer} />
      <Route path="/deleted" exact component={Deleted} />
      <Route path="/completed" exact component={Completed} />
      <Route path="/login" component={Auth} />
      <Redirect to="/" />
    </div>
  );
}

export default App;
