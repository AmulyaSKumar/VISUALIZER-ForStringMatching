import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainHome from './mainhome';
import { Home } from './home';
import Diagram from './maincomponents/statediagram';
import AutomataComponent from './maincomponents/statetable';
import Quiz from './components/quiz';
import Info from './components/Info';
import Compare from './maincomponents/compare';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/quiz/info" element={<Info/>}/>
        <Route path="/home/statediagram" element={<Diagram/>}/>
        <Route path="/home/statetable" element={<AutomataComponent/>}/>
        <Route path='/comparison' element={<Compare/>}/>
      </Routes>
    </Router>
  );
}

export default App;
