import { React } from 'react'
import { Link } from 'react-router-dom';

export const MatchDetailCard = ({teamName, match}) => {
    if (!match) return null;
    const otherTeam = (match.team1 === teamName) ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`
    return (
    <div className="match-detail-card">
    <h3>Latest Matches</h3>
    <h4> Match Details</h4>
    <h4>vs <Link to={otherTeamRoute}>{otherTeam} </Link></h4>
    <h5>{match.data}</h5>
    <h6>{match.venue}</h6>
    <h6> {match.matchWinner} won by {match.resultMargin} {match.result} </h6>
    </div>
  );
};