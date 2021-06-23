import instance from '../api/apiConfig';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const TeamChart = ({getTeam}) => {
    const [chartData, setChartData] = useState({});
     const chart = () => {
        let homeTeamScore = []; 
        let visitorTeamScore = [];
        let visitorName = [];
        let homeName = [];
        let gameId = [];
        
        instance.get('/games')
        .then(res => {
            console.log('main',res);
            console.log('foundTeam',getTeam)
            // let games = res.data.data.filter(
            //   g => g.home_team.name === getTeam || g.visitor_team.name === getTeam
            //   );

            for( const dataObj of res.data.data) {
              
              console.log('dataObj', dataObj)
              
              if (getTeam === dataObj.home_team.name) {
                
              
                homeTeamScore.push(parseInt(dataObj.home_team_score))
                homeName.push(dataObj.home_team.name)
                visitorName.push(dataObj.visitor_team.name)
                visitorTeamScore.push(parseInt(dataObj.visitor_team_score))
                gameId.push(parseInt(dataObj.id))
              }
              else if (getTeam === dataObj.visitor_team.name){
                homeTeamScore.push(parseInt(dataObj.visitor_team_score))
                homeName.push(dataObj.visitor_team.name)
                visitorName.push(dataObj.home_team.name)
                visitorTeamScore.push(parseInt(dataObj.home_team_score))
                gameId.push(parseInt(dataObj.id))

              }
               
              }
            setChartData({
                labels : visitorName,
                datasets: [
                    {
                      label:homeName[0],
                      //label:res.data.data[0].home_team.name,
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
    },[getTeam])
    
    return (
        <div className ='row text-center'>
          <h1> 2018 GAME STATS</h1>
            <div>
              <Bar data={chartData} options={options}/>
            </div>
        </div>

    )
}
export default TeamChart;