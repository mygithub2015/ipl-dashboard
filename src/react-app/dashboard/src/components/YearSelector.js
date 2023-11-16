import { React } from 'react'
import { Link } from 'react-router-dom';
import '../pages/css/YearSelector.scss'

export const YearSelector = ({teamName}) => {

    let years = [];
    const endYear = process.env.REACT_APP_DATA_END_YEAR;
    const startYear = process.env.REACT_APP_DATA_START_YEAR;
    for(let i = startYear; i <= endYear; i++) {
        years.push(i);
    }
    return (
        <ol className = "year-selector">
            { years.map(year => (
            <li key = {year}>
                <Link to={`/teams/${teamName}/matches/${year}`}> {year} </Link>
            </li>
            ))}
        </ol>
       
    );
}