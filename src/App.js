import React, { useState } from 'react'
import './App.css'

function App() {
  const [word, setWord] = useState('hangman'.toUpperCase())
  const [inputLetter, setInputLetter] = useState('')
  // const [renderCorrectGuess, setRenderCorrectGuess] = useState(false)
  const [arrayOfCorrectGuesses, setArrayOfCorrectGuesses] = useState([])
  const [arrayOfWrongGuesses, setArrayOfWrongtGuesses] = useState([])
  const [gameWon, setGameWon] = useState(false)
  const arrWord = word.split('')
  // console.log(arrWord)
  // console.log(inputLetter)

  const guessHandler = (e) => {
    e.preventDefault()
    setInputLetter('')
    let correctGuess = arrWord.includes(inputLetter)

    // arrWord.forEach((element) => {
    //   inputLetter === element && setRenderCorrectGuess(true)
    //   console.log(element.toUpperCase())
    // })

    // correctGuess
    //   ? setArrayOfCorrectGuesses((correctGuessesList) => [
    //       ...correctGuessesList,
    //       inputLetter,
    //     ])
    //   : setArrayOfWrongtGuesses((wrongGuessesList) => [
    //       ...wrongGuessesList,
    //       inputLetter,
    //     ])
    if (arrayOfCorrectGuesses.includes(inputLetter)) {
      alert('Letter already guessed')
    } else if (correctGuess) {
      setArrayOfCorrectGuesses((correctGuessesList) => [
        ...correctGuessesList,
        inputLetter,
      ])
    } else if (inputLetter === '') {
      alert('please enter a letter')
    } else if (!isNaN(inputLetter)) {
      alert('no numbers here')
    } else if (arrayOfWrongGuesses.includes(inputLetter)) {
      alert('Letter already guessed')
    } else {
      setArrayOfWrongtGuesses((wrongGuessesList) => [
        ...wrongGuessesList,
        inputLetter,
      ])
    }
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
  // console.log(winCheckUniqueLetters)
  // console.log(winCheckCorrectGuesses)

  arrayOfWrongGuesses.length === 6 && alert('game over')

  return (
    <div className='App container d-flex flex-column align-items-center'>
      {word.toUpperCase()}
      <div className='d-flex'>
        {arrWord.map((letter, i) => (
          <div
            className='p-3 mx-1 border rounded-sm d-flex align-items-center justify-content-center letterbox'
            key={i}
          >
            {arrayOfCorrectGuesses.includes(letter) ? (
              <div className='h2 d-inline-block'>{letter}</div>
            ) : (
              <div className='h2 d-inline-block'></div>
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
          onChange={(event) => setInputLetter(event.target.value.toUpperCase())}
        />
        <button type='submit' onClick={guessHandler}>
          GUESS
        </button>
      </form>
    </div>
  )
}

export default App
