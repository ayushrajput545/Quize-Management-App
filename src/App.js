import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Quize from './pages/Quize';
import ScoreBoard from './pages/ScoreBoard';
import QuizeHistory from './pages/QuizeHistory';

function App() {
  return (
    <div className="App">
       
       <Routes>
         <Route path='/' element={<Home/>}/>
         <Route path='/quize' element={<Quize/>}/>
         <Route path='/scoreboard' element={<ScoreBoard/>}/>
         <Route path='/quizehistory' element={<QuizeHistory/>}/>


       </Routes>
    </div>
  );
}

export default App;
