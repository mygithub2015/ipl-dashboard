import { React } from 'react'
import { Link } from 'react-router-dom';

export const MatchSmallCard = ({ teamName, match }) => {
    if (!match) return null;
    const otherTeam = (match.team1 === teamName) ? match.team2 : match.team1;
    const otherTeamRoute = `/teams/${otherTeam}`;
    return (
        <div className="match-small-card">
            <h5>vs <Link to={otherTeamRoute}>{otherTeam} </Link></h5>
            <h6> {match.matchWinner} won by {match.resultMargin} {match.result} </h6>
        </div>
    );
};