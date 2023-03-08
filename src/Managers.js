const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8a3378e12dmsh072ecacfd973324p17ee9fjsn0b5e8f6eb728',
		'X-RapidAPI-Host': 'nfl-team-stats.p.rapidapi.com'
	}
};

export const getReceivingStatsByYear = (year) => {
    return fetch(`https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/receiving-stats/offense/${year}`, options)
	.then(response => response.json())
}

export const getRushingStatsByYear = (phase, year) => {
    return fetch(`https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/rushing-stats/${phase}/${year}`, options)
    .then(response => response.json())
}

export const getPassingStatsByYear = (phase, year) => {
    return fetch(`https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/passing-stats/${phase}/${year}`, options)
    .then(response => response.json())
}

export const getWinStatsByYear = (year) => {
    return fetch(`https://nfl-team-stats.p.rapidapi.com/v1/nfl-stats/teams/win-stats/${year}`, options)
    .then(response => response.json())
}