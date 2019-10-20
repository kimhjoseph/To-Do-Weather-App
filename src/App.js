import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './style.css';

import WeatherComponent from './components/WeatherComponent';
import ChecklistComponent from './components/ChecklistComponent';

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={WeatherComponent}/>
        <ChecklistComponent/>
      </div>
    </Router>
  );
}

export default App;
