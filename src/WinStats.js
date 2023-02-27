import { useEffect, useState } from "react"
import { getWinStatsByYear } from "./Managers"



export const WinStats = () => {
    const [winStats, setWinStats] = useState({})
    const [teams, setTeams] = useState([])
    const [year, setYear] = useState(0)
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
        },
        [winStats]
    )

    if (teams) {
        return (
            <>
                <h2>Win Stats</h2>
                {
                    teams.map(
                        (team, index) => {
                            return <div key={index}>
                            <p>{team.name}</p>
                            <p>{team.wins}</p>
                            </div>

                        }
                    )
                }
                
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
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>

                </select>
            </>
        )
    }
}