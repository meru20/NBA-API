import { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerMenu from './components/PlayerMenu';
import PlayerChart from './components/PlayerChart';
import PlayerStatsTable from './components/PlayerStatsTable';
import PlayerRoster from './components/PlayerRoster';
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

  return (
    <div className="mb-5" id="app">

    <h2 className="text-center my-3">Player Statistics</h2>

    <div className="container">
        
        {/* DROPDOWN MENU */}

        <PlayerMenu players={players} fetchPlayer1={fetchPlayer1} fetchPlayer2={fetchPlayer2} />

        {/* CHART */}
        <PlayerChart player1Stats={player1Stats} player2Stats={player2Stats} />

        {/* SCORE COMPARISON TABLE */}

        <PlayerStatsTable player1Stats={player1Stats} player2Stats={player2Stats} />

        {/* 2018-2019 PLAYER ROSTER */}
        <PlayerRoster players={players} />

      </div>

    </div>
  );
}

export default App;
