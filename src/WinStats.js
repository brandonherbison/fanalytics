import { useEffect, useState } from "react"
import { getWinStatsByYear } from "./Managers"
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
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export const WinStats = () => {
    const [winStats, setWinStats] = useState({})
    const [teams, setTeams] = useState([])
    const [year, setYear] = useState(0)
    const [teamWins, setTeamWins] = useState([])
    const [teamNames, setTeamNames] = useState([])
    const [buttonPressed, setButtonPressed] = useState(false)

    useEffect(
        () => {
            getWinStatsByYear(year)
                .then((data) => {
                    setWinStats(data)
                })

            
        },
        [year]
    )

    useEffect(
        () => {
            const teamList = winStats?._embedded?.teamWinStatsList
            setTeams(teamList)
            const wins = teamList?.map(team => team.wins)
            setTeamWins(wins)
            const names = teamList?.map(team => team.name)
            setTeamNames(names)
        },
        [winStats]
    )
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: `Win Stats for ${year}`,
            },
        },
    };

    const labels = teamNames;

    const data = {
        labels,
        datasets: [
            {
                label: 'Team Wins',
                data: teamWins,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(59 130 246)',
            }
        ],
    };


    let years = []
    for (let i = 2022; i > 2000; i--) {
        years.push(i)
    }


    if (buttonPressed) {
        return (
            <div className="w-7/12 m-auto my-10">

                <div className="border w-full">
                    <Bar data={data} options={options} />
                </div>
                <select className="border" onChange={
                    (event) => {
                        setYear(event.target.value)
                    }
                }>
                    <option value="select">Change Year..</option>
                    {
                        years.map(
                            (year) => {
                                return <option key={year} value={year}>{year}</option>
                            }
                        )
                    }

                </select>

                <div className="py-24 text-center">
                    <h2 className="text-5xl text-center py-5">Insights</h2>
                <div className="flex justify-evenly w-full m-auto">
                    <div className="w-64 h-64 shadow shadow-lg rounded-xl bg-white border border-blue-500 px-4">
                        <BsFillArrowUpCircleFill className="text-7xl text-blue-500 mx-auto mt-8" />
                        <h2 className="text-2xl text-center my-4">Trending Up</h2>
                        <p className="text-md">The team with the most wins in {year} was the {teams[teamWins.indexOf(Math.max(...teamWins))].name}</p>
                    </div>
                    <div className="w-64 h-64 shadow shadow-lg rounded-xl bg-white border border-blue-500 px-4">
                        <BsFillArrowDownCircleFill className="text-7xl text-blue-500 mx-auto mt-8" />
                        <h2 className="text-2xl text-center my-4">Trending Down</h2>
                        <p className="text-md">The team with the least wins in {year} was the {teams[teamWins.indexOf(Math.min(...teamWins))].name}</p>
                    </div>
                    <div className="w-64 h-64 shadow shadow-lg rounded-xl bg-white border border-blue-500 px-4">
                        <BsFillArrowRightCircleFill className="text-7xl text-blue-500 mx-auto mt-8" />
                        <h2 className="text-2xl text-center my-4">Average</h2>
                        <p className="text-md">The average wins per team in {year} was {Math.round(teamWins.reduce((a, b) => a + b, 0) / teamWins.length)}</p>
                    </div>
                </div>
            </div>
            </div>
        )
    }
    else {
        return (
            <div className="flex border border-blue-500 max-w-lg m-auto mt-16 text-center shadow shadow-lg rounded-xl py-5 justify-center gap-1 items-center">
                <h2>I want to see win stats for the year:</h2>
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
                <button className="bg-blue-500 text-white p-0.5 rounded" onClick={() => { setButtonPressed(true) }
                }>Submit</button>

            </div>
        )
    }
}