import { useEffect, useState } from "react"
import { getRushingStatsByYear } from "./Managers"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const RushingStats = () => {
    const [rushingStats, setRushingStats] = useState({})
    const [teams, setTeams] = useState([])
    const [year, setYear] = useState(0)
    const [phase, setPhase] = useState("")
    const [teamNames, setTeamNames] = useState([])
    const [teamYards, setTeamYards] = useState([])
    const [buttonPressed, setButtonPressed] = useState(false)

    useEffect(
        () => {
            getRushingStatsByYear(phase, year)
                .then((data) => {
                    setRushingStats(data)
                })
        },
        [year, phase]
    )

    useEffect(
        () => {
            const teamList = rushingStats?._embedded?.teamRushingStatsList
            setTeams(teamList)
            const names = teamList?.map(team => team.name)
            setTeamNames(names)
            const yards = teamList?.map(team => team.yards)
            setTeamYards(yards)
        },
        [rushingStats]
    )

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Rushing Stats for ${year} (${phase})`,
            },
        },
    };

    const labels = teamNames;

    const data = {
        labels,
        datasets: [
            {
                label: 'Team Yards',
                data: teamYards,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
            }
        ],
    };


    let years = []
    for (let i = 2022; i > 2000; i--) {
        years.push(i)
    }


    if (buttonPressed) {
        return (
            <>
            <select onChange={
                (event) => {
                    setYear(event.target.value)
                }
            }>
                <option value="select">Select year..</option>
                {
                    years.map(
                        (year) => {
                            return <option key={year} value={year}>{year}</option>
                        }
                    )
                }

            </select>
            <h2>Phase Selector</h2>
                <select onChange={
                    (event) => {
                        setPhase(event.target.value)
                    }
                }>
                    <option value="select">Select phase..</option>
                    <option value="offense">Offense</option>
                    <option value="defense">Defense</option>
                </select>
            <h2>Rushing Stats</h2>
            <div className="max-w-7xl m-auto border ">
                <Bar data={data} options={options} />
            </div>
        </>
        )
    }
    else {
        return (
            <>
                <h2>Year Selector</h2>
                <select onChange={
                    (event) => {
                        setYear(event.target.value)
                    }
                }>
                    <option value="select">Select year..</option>
                    {
                        years.map(
                            (year) => {
                                return <option key={year} value={year}>{year}</option>
                            }
                        )
                    }

                </select>
                <h2>Phase Selector</h2>
                <select onChange={
                    (event) => {
                        setPhase(event.target.value)
                    }
                }>
                    <option value="select">Select phase..</option>
                    <option value="offense">Offense</option>
                    <option value="defense">Defense</option>
                </select>
                <button onClick={() => { setButtonPressed(true) }
                }>Submit</button>


            </>
        )
    }
}