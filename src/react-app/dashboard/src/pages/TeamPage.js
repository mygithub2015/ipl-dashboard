import { React, useEffect, useState } from 'react'
import './css/TeamPage.css'
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';

export const TeamPage = () => {

  const [team, setTeam] = useState({matches: {}});
  // const [loading, setLoading] = useState(false);

  useEffect(
    () => {
      const fetchMatches = async () => {
        const response = await fetch('http://localhost:8090/teams/Delhi%20Capitals');
        const data = await response.json();
        setTeam(data);
        console.log(team);
      };
      fetchMatches();
    }, []

  );
  // setLoading(true); 
  
  //       axios.get( 
  //           'http://localhost:8090/teams/Delhi%20Capitals') 
  //           .then((response) => { 
  //               setTeam(response.data); 
  //               setLoading(false); 
  //           }) 
  //           .catch((error) => { 
  //               console.log(error); 
  //               setLoading(false); 
  //           }); 
  //   }, []); // This is the dependency array 
  
  //   if (loading) { 
  //       return <p>Loading data...</p>; 
  //   }

  return (
    <div className="team-page">
      <h2>{team.teamName}</h2>
      <MatchDetailCard match = {team.matches[0]}/>
      {team.matches.slice(1).map(match => <MatchSmallCard match = {match} />)}
    </div>
  );
};
