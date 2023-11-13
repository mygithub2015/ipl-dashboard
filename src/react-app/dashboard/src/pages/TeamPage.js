import { React, useEffect, useState } from 'react'
import './css/TeamPage.scss'
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart'

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
      <div className='team-name-div'>
        <h2 className='team-name'>{team.teamName}</h2>
      </div>
      <div className='team-win-loss-div'>
        Win / Losses
        <PieChart
          data={[
            {title: 'Losses', value: team.totalMatches - team.totalWins, color: '#a34d5d'},
            {title: 'Wins', value: team.totalWins, color: '#4da375'},
          ]} />;
      </div>
      <div className="match-detail-div">
        <h3>Latest Matches</h3>
        <MatchDetailCard teamName={team.teamName} match={team.matches[0]} />
      </div>
      {team.matches.slice(1).map(match =>
        <MatchSmallCard teamName={team.teamName} match={match} />)}
      <div className='more-link'>
        <a href="#">More &gt;</a>
      </div>
    </div>
  );
};
