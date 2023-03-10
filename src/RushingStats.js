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
                 <select className="border" onChange={
                    (event) => {
                        setPhase(event.target.value)
                    }
                }>
                    <option value="select">Select phase..</option>
                    <option value="offense">Offense</option>
                    <option value="defense">Defense</option>
                </select>

                <div className="py-24 text-center">
                    <h2 className="text-5xl text-center py-5">Insights</h2>
                    <div className="flex justify-evenly w-full m-auto">
                        <div className="w-64 h-64 shadow shadow-lg rounded-xl bg-white border border-blue-500 px-4">
                            <BsFillArrowUpCircleFill className="text-7xl text-blue-500 mx-auto mt-8" />
                            <h2 className="text-2xl text-center my-4">Trending Up</h2>
                            <p className="text-md">The team with the most yards in {year} was the {teams[teamYards.indexOf(Math.max(...teamYards))].name}</p>
                        </div>
                        <div className="w-64 h-64 shadow shadow-lg rounded-xl bg-white border border-blue-500 px-4">
                            <BsFillArrowDownCircleFill className="text-7xl text-blue-500 mx-auto mt-8" />
                            <h2 className="text-2xl text-center my-4">Trending Down</h2>
                            <p className="text-md">The team with the least yards in {year} was the {teams[teamYards.indexOf(Math.min(...teamYards))].name}</p>
                        </div>
                        <div className="w-64 h-64 shadow shadow-lg rounded-xl bg-white border border-blue-500 px-4">
                            <BsFillArrowRightCircleFill className="text-7xl text-blue-500 mx-auto mt-8" />
                            <h2 className="text-2xl text-center my-4">Average</h2>
                            <p className="text-md">The average yards per team in {year} was {Math.round(teamYards.reduce((a, b) => a + b, 0) / teamYards.length)}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="flex border border-blue-500 max-w-3xl m-auto mt-16 text-center shadow shadow-lg rounded-xl py-5 justify-center gap-1 items-center">
                <h2>I want to see rushing stats for the year:</h2>
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
                <select onChange={
                    (event) => {
                        setPhase(event.target.value)
                    }
                }>
                    <option value="select">Select phase..</option>
                    <option value="offense">Offense</option>
                    <option value="defense">Defense</option>
                </select>
                <button className="bg-blue-500 text-white p-0.5 rounded" onClick={() => { setButtonPressed(true) }
                }>Submit</button>

            </div>
        )
    }
}