import React, { useState } from 'react'
import './App.css'

function App() {
  const [word, setWord] = useState('hangman')
  const [inputLetter, setInputLetter] = useState('')
  const [renderCorrectGuess, setRenderCorrectGuess] = useState(false)
  const [arrayOfCorrectGuesses, setArrayOfCorrectGuesses] = useState([])
  const [arrayOfWrongGuesses, setArrayOfWrongtGuesses] = useState([])
  const arrWord = word.split('')
  // console.log(arrWord)
  // console.log(inputLetter)

  const guessHandler = () => {
    let correctGuess = arrWord.includes(inputLetter)

    arrWord.forEach((element) => {
      inputLetter === element && setRenderCorrectGuess(true)
      // console.log(element.toUpperCase())
    })

    correctGuess
      ? setArrayOfCorrectGuesses((correctGuessesList) => [
          ...correctGuessesList,
          inputLetter,
        ])
      : setArrayOfWrongtGuesses((wrongGuessesList) => [
          ...wrongGuessesList,
          inputLetter,
        ])
  }

  arrayOfWrongGuesses.length === 6 && alert('game over')
  console.log(arrayOfCorrectGuesses)
  // console.log(arrayOfWrongGuesses)
  console.log(renderCorrectGuess)
  return (
    <div className='App container d-flex flex-column align-items-center'>
      {word}
      <div className='d-flex'>
        {arrWord.map((letter, i) => (
          <div
            className='p-3 mx-1 border rounded-sm d-flex align-items-center justify-content-center letterbox'
            key={i}
          >
            {renderCorrectGuess && (
              <h2
                className='h2 d-inline-block'
                // style={
                //   renderCorrectGuess
                //     ? { backgroundColor: 'blue' }
                //     : { backgroundColor: 'none' }
                // }
              >
                {letter}
              </h2>
            )}
          </div>
        ))}
      </div>
      <div>{arrayOfWrongGuesses}</div>
      <div>
        <input
          required
          type='text'
          size='1'
          maxLength='1'
          onInput={(event) => setInputLetter(event.target.value)}
        />
        <button onClick={guessHandler}>GUESS</button>
      </div>
    </div>
  )
}

export default App
