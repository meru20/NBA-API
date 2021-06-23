import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './App.css';

const App = () => {

  const[players, setPlayers] = useState([]);

  const[player1Stats, setPlayer1Stats] = useState([]);
  const[player1, setPlayer1] = useState([]);

  const[player2Stats, setPlayer2Stats] = useState([]);
  const[player2, setPlayer2] = useState([]);

  const getAllPlayers = async () => {
    const response = await axios.get('https://www.balldontlie.io/api/v1/players');
    setPlayers(response.data.data);
    
    console.log(response.data);
    console.log(response.data.data);
    console.log(response.data.data[0].first_name, response.data.data[0].last_name, response.data.data[0].position, response.data.data[0].team.full_name);
    
  }

// Version 1
// Not working since it did not retrieve stats right away
// Printed in console as undefined when calling player1Stats
  
// const getPlayer1Stats = async (playerId) => {
    
  //   if (!playerId) { playerId = 0 };
    
  //   console.log(playerId);
  //   const response = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${playerId}`);
  //   let player1 = response.data.data[0];
  //   setPlayer1Stats(player1);
    
  //   console.log(response.data);
  //   console.log(response.data.data[0]);
  //   console.log(response.data.data[0]?.ast);
  //   console.log(response.data.data[0]?.reb);
  //   console.log(response.data.data[0]?.pts);
    
  //   console.log(player1Stats);
  
  //   console.log(player1Stats?.ast);
  //   console.log(player1Stats?.reb);
  //   console.log(player1Stats?.pts);
// }

// Version 2
// Has two go through 2 async functions
// Double check system to make sure the

const getPlayer1Stats = async (playerId) => {
  
  if (!playerId) { playerId = 0 };
  
  console.log(playerId);

  try {
    const response = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${playerId}`);
    let player1 = response.data.data[0];
    setPlayer1(player1);

    console.log(response.data);
    console.log(response.data.data[0]);
    console.log(response.data.data[0]?.ast);
    console.log(response.data.data[0]?.reb);
    console.log(response.data.data[0]?.pts);
    
    console.log(player1);
    console.log(player1?.ast);
    console.log(player1?.reb);
    console.log(player1?.pts);

  }
  catch (e) {
    console.log(e);
  }
  
}

const fetchPlayer1 = async (playerId) => {

  if (!playerId) { playerId = 0 };
  
  console.log(playerId);

  try {
    const response = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${playerId}`);
    let player1 = response.data.data[0];
    setPlayer1Stats(player1);
    getPlayer1Stats(playerId);
  }
  catch (e) {
    console.log(e);
  }

}

// Version 1
// Not working since it did not retrieve PlayerStats right away
// Printed in console as undefined when calling player2Stats

// const getPlayer2Stats = async (playerId) => {

//   if (!playerId) { playerId = 0 };

//   console.log(playerId);
//   const response = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${playerId}`);
//   setPlayer2Stats(response.data.data[0]);
  
//   console.log(response.data.data);
//   console.log(response.data.data[0]);
//   console.log(response.data.data[0]?.ast);
//   console.log(response.data.data[0]?.reb);
//   console.log(response.data.data[0]?.pts);

//   console.log(player2Stats);
//   console.log(player2Stats?.ast);
//   console.log(player2Stats?.reb);
//   console.log(player2Stats?.pts);

// }

// Version 2
// Has two go through 2 async functions
// Double check system

const getPlayer2Stats = async (playerId) => {
  
  if (!playerId) { playerId = 0 };
  
  console.log(playerId);

  try {
    const response = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${playerId}`);
    let player2 = response.data.data[0];
    setPlayer2(player2);

    console.log(response.data);
    console.log(response.data.data[0]);
    console.log(response.data.data[0]?.ast);
    console.log(response.data.data[0]?.reb);
    console.log(response.data.data[0]?.pts);
    
    console.log(player2);
    console.log(player2?.ast);
    console.log(player2?.reb);
    console.log(player2?.pts);

  }
  catch (e) {
    console.log(e);
  }
  
}

const fetchPlayer2 = async (playerId) => {

  if (!playerId) { playerId = 0 };
  
  console.log(playerId);

  try {
    const response = await axios.get(`https://www.balldontlie.io/api/v1/season_averages?season=2018&player_ids[]=${playerId}`);
    let player2 = response.data.data[0];
    setPlayer2Stats(player2);
    getPlayer2Stats(playerId);
  }
  catch (e) {
    console.log(e);
  }

}

  // FETCH DATA

  useEffect(() => {
    getAllPlayers();

    getPlayer1Stats();
    getPlayer2Stats();

  }, []);

  // CHART SETUP

  useEffect(() => {

    const ctx = document.getElementById("myChart");
    const myChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: [
          'Assists',
          'Rebounds',
          'Points'
        ],
        datasets: [{
          label: 'Player 1',
          data: [player1Stats?.ast, player1Stats?.reb, player1Stats?.pts],
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
          pointBackgroundColor: 'rgb(255, 99, 132)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
          label: 'Player 2',
          data: [player2Stats?.ast, player2Stats?.reb, player2Stats?.pts],
          fill: true,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          pointBackgroundColor: 'rgb(54, 162, 235)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
      }
    });

    return () => {
      myChart.destroy();
    }
    
  }, [player1Stats, player2Stats]);

  return (
    <div className="mb-5" id="app">

    {/* NAVBAR */}

    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <a className="nav-link active" aria-current="page" href="#">Team Dashboard</a>
            <a className="nav-link" href="#">Player Statistics</a>
          </div>
        </div>
      </div>
    </nav>

    <h2 className="text-center my-3">Player Statistics</h2>

    <div className="container">
        
        {/* DROPDOWN MENU */}

        <form className="my-5">
          <select className="form-select btn-primary my-3" aria-label="Default select example" onChange={event => fetchPlayer1(event.target.value)}>
            <option value="0">Select Player 1</option>
            {players.map((player, index) => {
                return (
                  <option key={index} value={player.id}>{player.first_name} {player.last_name}</option>
                );
            })}
          </select>

        <select className="form-select btn-primary my-3" aria-label="Default select example" onChange={event => fetchPlayer2(event.target.value)}>
            <option value="0">Select Player 2</option>
            {players.map((player, index) => {
                return (
                  <option key={index} value={player.id}>{player.first_name} {player.last_name}</option>
                );
            })}
          </select>

        </form>

        {/* CHART */}
        <canvas className="my-5" id="myChart"></canvas>

        {/* SCORE COMPARISON TABLE */}

        <div className="my-5" id="score-comparison">

        <h3 className="text-center my-3">Player Overview</h3>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Player</th>
                  <th scope="col">Assists</th>
                  <th scope="col">Rebounds</th>
                  <th scope="col>">Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>{(!player1Stats?.ast) ? 'N/A': player1Stats?.ast}</td>
                  <td>{(!player1Stats?.reb) ? 'N/A': player1Stats?.reb}</td>
                  <td>{(!player1Stats?.pts) ? 'N/A': player1Stats?.pts}</td>
                </tr>

                <tr>
                  <th scope="row">2</th>
                  <td>{(!player2Stats?.ast) ? 'N/A': player2Stats?.ast}</td>
                  <td>{(!player2Stats?.reb) ? 'N/A': player2Stats?.reb}</td>
                  <td>{(!player2Stats?.pts) ? 'N/A': player2Stats?.pts}</td>
                </tr>
              </tbody>
            </table>

          </div>

        {/* 2018-2019 PLAYER ROSTER */}
        <div className="my-5" id="players">

          <h3 className="text-center my-3">Player Roster</h3>
        
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Position</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index}</th>
                    <td>{player.first_name}</td>
                    <td>{player.last_name}</td>
                    <td>{(!player.position) ? 'N/A' : player.position}</td>
                    <td>{player.team.full_name}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </div>

      </div>

    </div>
  );
}

export default App;
