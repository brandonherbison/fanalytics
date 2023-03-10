import { useEffect, useState } from "react"
import { getPassingStatsByYear } from "./Managers"
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


export const PassingStats = () => {
    const [passingStats, setPassingStats] = useState({})
    const [teams, setTeams] = useState([])
    const [year, setYear] = useState(0)
    const [phase, setPhase] = useState("")
    const [teamNames, setTeamNames] = useState([])
    const [teamYards, setTeamYards] = useState([])
    const [completions, setCompletions] = useState([])
    const [touchdowns, setTouchdowns] = useState([])
    const [buttonPressed, setButtonPressed] = useState(false)

    useEffect(
        () => {
            getPassingStatsByYear(phase, year)
                .then((data) => {
                    setPassingStats(data)
                })
        },
        [year, phase]
    )

    useEffect(
        () => {
            const teamList = passingStats?._embedded?.teamPassingStatsList
            setTeams(teamList)
            const names = teamList?.map(team => team.name)
            setTeamNames(names)
            const yards = teamList?.map(team => team.passYards)
            setTeamYards(yards)
            const completions = teamList?.map(team => team.completions)
            setCompletions(completions)
            const touchdowns = teamList?.map(team => team.touchdowns)
            setTouchdowns(touchdowns)
        },
        [passingStats]
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
    const data2 = {
        labels,
        datasets: [
            {
                label: 'Completions',
                data: completions,
                borderColor: 'rgb(24, 99, 132)',
                backgroundColor: 'rgba(0, 0, 255, 0.5)',
            }
        ],
    };
    const data3 = {
        labels,
        datasets: [
            {
                label: 'Touchdowns',
                data: touchdowns,
                borderColor: 'rgb(99, 99, 200)',
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
                <h2>Passing Stats</h2>
                <div className="max-w-7xl m-auto border ">
                    <Bar data={data} options={options} />
                </div>
                <div className="max-w-7xl m-auto border ">
                    <Bar data={data2} options={options} />
                </div>
                <div className="max-w-7xl m-auto border ">
                    <Bar data={data3} options={options} />
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