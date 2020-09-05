import React, { useState } from 'react'
import './App.css'
import Intro from './components/intro/Intro'
import Mainscreen from './components/mainscreen/Mainscreen'

function App() {
  const [word, setWord] = useState('hangman'.toUpperCase())
  const [gameStarted, setGameStarted] = useState(false)

  const startGameHandler = async () => {
    const response = await fetch(
      'https://random-word-api.herokuapp.com/word?number=1'
    )
    const data = await response.json()
    const fetchedWord = data[0].toUpperCase()
    setWord(fetchedWord)
    setGameStarted(true)
  }

  return (
    <div className='App container d-flex flex-column align-items-center'>
      {!gameStarted && <Intro startGame={startGameHandler} />}
      {gameStarted && <Mainscreen word={word} />}
      {/* remember to change gameStarted ! */}
    </div>
  )
}

export default App
