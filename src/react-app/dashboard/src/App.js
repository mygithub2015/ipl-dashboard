import './App.scss';
import { TeamPage } from './pages/TeamPage'
import { MatchPage } from './pages/MatchPage';
import { HomePage } from './pages/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <h2>IPL Dashboard</h2>
      <hr /> */}
      <Router>
        <Routes>
          <Route path="/teams/:teamName/matches/:year" element={<MatchPage />} />
          <Route path="/teams/:teamName" element={<TeamPage />} />
          <Route path="/teams" element={<HomePage />} />
        </Routes>


      </Router>
    </div>
  );
}

export default App;
