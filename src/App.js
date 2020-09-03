import React, { useState } from 'react'
import './App.css'
import Intro from './components/intro/Intro'

function App() {
  const [word, setWord] = useState('bbb'.toUpperCase())
  const arrWord = word.split('')

  const [gameStarted, setGameStarted] = useState(false)
  const [inputLetter, setInputLetter] = useState('')
  const [arrayOfCorrectGuesses, setArrayOfCorrectGuesses] = useState([])
  const [arrayOfWrongGuesses, setArrayOfWrongtGuesses] = useState([])
  const [gameWon, setGameWon] = useState(false)

  const startGameHandler = () => {
    setGameStarted(true)
  }

  const guessHandler = (e) => {
    e.preventDefault()
    setInputLetter('')
    const guess = inputLetter.toUpperCase()
    const correctGuess = arrWord.includes(guess)

    if (arrayOfCorrectGuesses.includes(guess)) {
      alert('Letter already guessed')
    } else if (correctGuess) {
      setArrayOfCorrectGuesses((correctGuessesList) => [
        ...correctGuessesList,
        guess,
      ])
    } else if (guess === '') {
      alert('please enter a letter')
    } else if (guess.match(/[^\w\s]/gi)) {
      alert('only letters from latin alphabet please')
    } else if (!isNaN(guess)) {
      alert('no numbers here')
    } else if (arrayOfWrongGuesses.includes(guess)) {
      alert('Letter already guessed')
    } else {
      setArrayOfWrongtGuesses((wrongGuessesList) => [
        ...wrongGuessesList,
        guess,
      ])
    }
  }

  const wordHandler = async () => {
    const response = await fetch(
      'https://random-word-api.herokuapp.com/word?number=1'
    )
    const data = await response.json()
    const fetchedWord = data[0].toUpperCase()
    setWord(fetchedWord)
  }

  let winCheckUniqueLetters = arrWord
    .filter((letter, i, arr) => arr.indexOf(letter) === i)
    .sort()
    .join('')

  let winCheckCorrectGuesses = arrayOfCorrectGuesses
    .filter((letter, i, arr) => arr.indexOf(letter) === i)
    .sort()
    .join('')

  winCheckUniqueLetters === winCheckCorrectGuesses && alert('game won')
  arrayOfWrongGuesses.length === 6 && alert('game over')

  return (
    <div className='App container d-flex flex-column align-items-center'>
      {!gameStarted && <Intro startGame={startGameHandler} />}
      {gameStarted && (
        <div>
          {word.toUpperCase()}
          <div className='d-flex'>
            {arrWord.map((letter, i) => (
              <div
                className='p-3 mx-1 border rounded-sm d-flex align-items-center justify-content-center letterbox'
                key={i}
              >
                {arrayOfCorrectGuesses.includes(letter) ? (
                  <div className='h2 mb-0 d-inline-block'>{letter}</div>
                ) : (
                  <div className='h2 mb-0 d-inline-block'>_</div>
                )}
              </div>
            ))}
          </div>
          <div>{arrayOfWrongGuesses}</div>
          <form>
            <input
              size='1'
              maxLength='1'
              placeholder=''
              value={inputLetter}
              onChange={(event) => setInputLetter(event.target.value)}
            />
            <button type='submit' onClick={guessHandler}>
              GUESS
            </button>
          </form>
          <button onClick={wordHandler}>GET A WORD</button>
        </div>
      )}
    </div>
  )
}

export default App
