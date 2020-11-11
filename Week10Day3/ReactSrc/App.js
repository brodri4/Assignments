import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

class App extends Component {
  constructor() {
    super()

    this.state = {
      games: []
    }
  }

  render() {
    const gameItems = this.state.games.map(game => {
      console.log(game.imageUrl)
      return <li>
        <img src={game.imageUrl} />
        <b>{game.title}</b> - <b>{game.year}</b>
        <br></br>
        <p>{game.description}</p>
    </li>
    })


    return (
      <div>
        <ul>{gameItems}</ul>
      </div>
    )
  }

  fetchGames = () => {
    fetch('http://localhost:8080/')
    .then(response => response.json())
    .then(results => {
      this.setState({
        games: results
      })
    })
  }

  componentDidMount() {
    this.fetchGames()
    
  }
  




}

export default App;
