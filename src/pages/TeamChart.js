import instance from '../api/apiConfig';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const TeamStats = (team) => {
    const [chartData, setChartData] = useState({});
    const [homeTeam, setHomeTeam] = useState([]);
    const [vistorTeam, setVisitorTeam] = useState([]);
    
    const chart = () => {
        let homeTeamScore = []; 
        let visitorTeamScore = [];
        let visitorName = [];
        let homeName = [];
        let gameId = [];
        
        instance.get('/games')
        .then(res => {
            console.log('main',res);
            for( const dataObj of res.data.data) {
                homeTeamScore.push(parseInt(dataObj.home_team_score))
                visitorTeamScore.push(parseInt(dataObj.visitor_team_score))
                visitorName.push(dataObj.visitor_team.name)
                homeName.push(dataObj.home_team.name)
                gameId.push(parseInt(dataObj.id))
              }
            setChartData({
                labels : visitorName,
                datasets: [
                    {
                      label:res.data.data[0].home_team.name,
                      backgroundColor:  'rgb(255, 99, 132)',
                      data: homeTeamScore,
                    },
                    {
                      label:'Visitors Team',
                      backgroundColor: 'rgb(75, 192, 192)',
                      data: visitorTeamScore
                    }
                  ]
                })
           })
        .catch(err => {
            console.log(err)
        })
        
       console.log( homeTeamScore);
       console.log('visitorTeamScore',visitorTeamScore);
      }

    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
      console.log('chart',chartData)
    useEffect (() => {
        chart()
    },[])
    
    return (
        <div className ='row text-center'>
          <h1> 2018 GAME STATS</h1>
            <div>
              <Bar data={chartData} options={options}/>
            </div>
        </div>

    )
}
export default TeamStats;