import { React } from 'react';
import { Link } from 'react-router-dom';

import '../pages/css/TeamTile.scss'

export const TeamTile = ({ teamName }) => {

    return (
        <div className='team-tile'>
            <h1>
                <Link to={`/teams/${teamName}`}>
                {teamName}
                </Link>
            </h1>
        </div>
    );
}