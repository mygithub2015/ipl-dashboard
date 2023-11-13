import { React, useEffect, useState } from 'react'
import './css/TeamPage.css'
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {

  const [team, setTeam] = useState({ matches: [] });
  // const [loading, setLoading] = useState(false);
  const { teamName } = useParams()

  useEffect(
    () => {
      const fetchMatches = async () => {
        const response = await fetch(`http://localhost:8090/teams/${teamName}`);
        const data = await response.json();
        setTeam(data);
        console.log("matches", team.matches);
      };
      fetchMatches();
    }, [teamName]

  );

  if (!team || !team.teamName) {
    return <h1> Team not found! </h1>
  }
  return (
    <div className="team-page">
      <h2>{team.teamName}</h2>
      <MatchDetailCard teamName = {team.teamName} match={team.matches[0]} />
      {team.matches.slice(1).map(match => <MatchSmallCard teamName = {team.teamName} match={match} />)}
    </div>
  );
};
