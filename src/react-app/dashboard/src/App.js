import './App.css';
import { TeamPage } from './pages/TeamPage'
import { MatchPage } from './pages/MatchPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <h2>IPL Dashboard</h2>
      <hr />
      <Router>
        <Routes>
          <Route path="/teams/:teamName/matches/:year" element={<MatchPage />} />
            <Route path="/teams/:teamName" element={<TeamPage />} />
        </Routes>


      </Router>
    </div>
  );
}

export default App;
