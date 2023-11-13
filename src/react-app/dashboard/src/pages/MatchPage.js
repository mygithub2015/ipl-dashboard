import { React, useEffect, useState } from 'react'
import './css/TeamPage.css'
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const MatchPage = () => {

  const [matches, setMatches] = useState([]);
  const { teamName, year } = useParams()

  useEffect(
    () => {
      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8090/teams/${teamName}/matches?year=${year}`);
        const data = await response.json();
        setMatches(data);
        console.log("matches", matches);
      };
      fetchMatches();
    }, []

  );
  return (
    <div className="match-page">
        <h1>Match Page</h1>
        {matches.map(match => <MatchDetailCard teamName = {teamName} match={match} />)}

    </div>
  );
};
