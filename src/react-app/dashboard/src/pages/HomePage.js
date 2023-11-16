import { React, useEffect, useState } from 'react'
import './css/HomePage.scss'
import { useParams } from 'react-router-dom';
import { MatchDetailCard } from '../components/MatchDetailCard';
import { MatchSmallCard } from '../components/MatchSmallCard';
import { PieChart } from 'react-minimal-pie-chart'
import { Link } from 'react-router-dom';
import { TeamTile } from '../components/TeamTile';

export const HomePage = () => {

    const [teams, setTeams] = useState([]);

    useEffect(
        () => {
            const fetchTeams = async () => {
                const response = await fetch(`http://localhost:8090/teams`);
                const data = await response.json();
                setTeams(data);
                console.log("all teams", teams);
            };
            fetchTeams();
        }, []

    );

    return (
        <div className="home-page">
            <div className="header-div">
                <h2 className="app-name">IPL Dashboard</h2>
            </div>
            <div className="team-grid">
                {teams.map(team => <TeamTile teamName={team.teamName} />)}
            </div>
        </div>
    );
}