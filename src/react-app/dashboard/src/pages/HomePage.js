import { React, useEffect, useState } from 'react'
import './css/HomePage.scss'
import { TeamTile } from '../components/TeamTile';

export const HomePage = () => {

    const [teams, setTeams] = useState([]);

    useEffect(
        () => {
            const fetchTeams = async () => {
                const response = await fetch(`${process.env.REACT_APP_API_ROOT_URL}/teams`);
                const data = await response.json();
                setTeams(data);
                console.log("all teams", teams);
            };
            fetchTeams();
        }, [teams]

    );

    return (
        <div className="home-page">
            <div className="header-div">
                <h2 className="app-name">IPL Dashboard</h2>
            </div>
            <div className="team-grid">
                {teams.map(team => <TeamTile key = {team.id} teamName={team.teamName} />)}
            </div>
        </div>
    );
}