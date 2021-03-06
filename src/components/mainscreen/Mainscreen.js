import React, { useState, useEffect } from 'react'
import './Mainscreen.css'

import neutralFaceImg from '../../assets/faces/neutralface.svg'
import sadFaceImg from '../../assets/faces/sadface.svg'
import screamingFaceImg from '../../assets/faces/screamingface.svg'
import tearFaceImg from '../../assets/faces/tearface.svg'
import preDedFaceImg from '../../assets/faces/prededface.svg'
import dedFaceImg from '../../assets/faces/dedface.svg'

export const Mainscreen = (props) => {
  const [inputLetter, setInputLetter] = useState('')
  const [arrayOfCorrectGuesses, setArrayOfCorrectGuesses] = useState([])
  const [arrayOfWrongGuesses, setArrayOfWrongtGuesses] = useState([])

  const [letterGuessed, setLetterGuessed] = useState(false)
  const [enterLetter, setEnterLetter] = useState(false)
  const [noSpecialChars, setNoSpecialChars] = useState(false)
  const [noNumbers, setNoNumbers] = useState(false)

  const [neutralFace, setNeutralFace] = useState(false)
  const [sadFace, setSadFace] = useState(false)
  const [screamingFace, setScreamingFace] = useState(false)
  const [tearFace, setTearFace] = useState(false)
  const [preDedFace, setPreDedFace] = useState(false)
  const [dedFace, setDedFace] = useState(false)
  const [renderBody, setRenderBody] = useState(false)
  const [renderLeftArm, setRenderLeftArm] = useState(false)
  const [renderRightArm, setRenderRightArm] = useState(false)
  const [renderLeftLeg, setRenderLeftLeg] = useState(false)
  const [renderRightLeg, setRenderRightLeg] = useState(false)

  const [gameWon, setGameWon] = useState(false)
  const [gameLost, setGameLost] = useState(false)

  const arrWord = props.word.split('')

  const guessHandler = (e) => {
    e.preventDefault()
    setInputLetter('')
    const guess = inputLetter.toUpperCase()
    const correctGuess = arrWord.includes(guess)

    if (arrayOfCorrectGuesses.includes(guess)) {
      setLetterGuessed(true)
    } else if (correctGuess) {
      setArrayOfCorrectGuesses((correctGuessesList) => [
        ...correctGuessesList,
        guess,
      ])
    } else if (guess === '') {
      setEnterLetter(true)
    } else if (guess.match(/[^\w\s]/gi)) {
      setNoSpecialChars(true)
    } else if (!isNaN(guess)) {
      setNoNumbers(true)
    } else if (arrayOfWrongGuesses.includes(guess)) {
      setLetterGuessed(true)
    } else {
      setArrayOfWrongtGuesses((wrongGuessesList) => [
        ...wrongGuessesList,
        guess,
      ])
    }
  }

  const modalHandler = () => {
    setLetterGuessed(false)
    setEnterLetter(false)
    setNoSpecialChars(false)
    setNoNumbers(false)
  }

  let winCheckUniqueLetters = arrWord
    .filter((letter, i, arr) => arr.indexOf(letter) === i)
    .sort()
    .join('')

  let winCheckCorrectGuesses = arrayOfCorrectGuesses
    .filter((letter, i, arr) => arr.indexOf(letter) === i)
    .sort()
    .join('')

  useEffect(() => {
    arrayOfWrongGuesses.length === 1 && setNeutralFace(true)
    arrayOfWrongGuesses.length === 2 && setRenderBody(true)
    arrayOfWrongGuesses.length === 2 && setSadFace(true)
    arrayOfWrongGuesses.length === 2 && setNeutralFace(false)
    arrayOfWrongGuesses.length === 3 && setRenderLeftArm(true)
    arrayOfWrongGuesses.length === 3 && setScreamingFace(true)
    arrayOfWrongGuesses.length === 3 && setSadFace(false)
    arrayOfWrongGuesses.length === 4 && setRenderRightArm(true)
    arrayOfWrongGuesses.length === 4 && setTearFace(true)
    arrayOfWrongGuesses.length === 4 && setScreamingFace(false)
    arrayOfWrongGuesses.length === 5 && setRenderLeftLeg(true)
    arrayOfWrongGuesses.length === 5 && setPreDedFace(true)
    arrayOfWrongGuesses.length === 5 && setTearFace(false)
    arrayOfWrongGuesses.length === 6 && setRenderRightLeg(true)
    arrayOfWrongGuesses.length === 6 && setDedFace(true)
    arrayOfWrongGuesses.length === 6 && setPreDedFace(false)
    winCheckUniqueLetters === winCheckCorrectGuesses && setGameWon(true)
    arrayOfWrongGuesses.length === 6 && setGameLost(true)
  }, [
    arrayOfWrongGuesses.length,
    winCheckUniqueLetters,
    winCheckCorrectGuesses,
    props.word,
  ])

  // winCheckUniqueLetters === winCheckCorrectGuesses && setGameWon(true)
  // alert('game won')
  // arrayOfWrongGuesses.length === 6 &&
  //   alert(`game over. Word was "${props.word}"`)

  return (
    <div className={'container d-flex flex-column align-items-center'}>
      {(letterGuessed || enterLetter || noSpecialChars || noNumbers) && (
        <div className={'info-modal'}>
          <div className={'info-box'}>
            <div className={'information'}>
              {letterGuessed && 'Letter already guessed'}
              {enterLetter && 'Please enter a letter'}
              {noSpecialChars &&
                'No special characters and letters only from latin alphabet please'}
              {noNumbers && 'No numbers here'}
            </div>
            <button
              className={'btn btn-dark'}
              onClick={modalHandler}
              autoFocus={true}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className={'gallows'}>
        {neutralFace && (
          <img src={neutralFaceImg} alt='' className={'faces-of-doom'} />
        )}
        {sadFace && <img src={sadFaceImg} alt='' className={'faces-of-doom'} />}
        {tearFace && (
          <img src={tearFaceImg} alt='' className={'faces-of-doom'} />
        )}
        {screamingFace && (
          <img src={screamingFaceImg} alt='' className={'faces-of-doom'} />
        )}
        {preDedFace && (
          <img src={preDedFaceImg} alt='' className={'faces-of-doom'} />
        )}
        {dedFace && <img src={dedFaceImg} alt='' className={'faces-of-doom'} />}
        {renderBody && <span className={'body-of-doom'}></span>}
        {renderLeftArm && <span className={'left-arm-of-doom'}></span>}
        {renderRightArm && <span className={'right-arm-of-doom'}></span>}
        {renderLeftLeg && <span className={'left-leg-of-doom'}></span>}
        {renderRightLeg && <span className={'right-leg-of-doom'}></span>}
      </div>
      {/* {word.toUpperCase()} */}
      <div className={'win-lose-message'}>
        {gameWon && 'YOU WON!'}{' '}
        {gameLost && `YOU DIED. The word was ${props.word}`}
      </div>
      <div className='d-flex mb-4'>
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
      <div className={'d-flex flex-column align-items-center'}>
        <div>
          <u>incorrect letters:</u>
        </div>
        <div className='d-flex wrong-guesses-list'>
          {arrayOfWrongGuesses.map((letter, i) => (
            <div
              className='p-2 d-flex align-items-center justify-content-center'
              key={i}
            >
              <div className='h2 d-inline-block'>{letter}</div>
            </div>
          ))}
        </div>
      </div>
      <form className={'d-flex align-items-center justify-content-center'}>
        <input
          autoFocus={true}
          disabled={
            letterGuessed ||
            enterLetter ||
            noSpecialChars ||
            noNumbers ||
            gameWon ||
            gameLost
          }
          size='1'
          maxLength='1'
          placeholder=''
          value={inputLetter}
          onChange={(event) => setInputLetter(event.target.value)}
          className={'mr-2 p-1 text-center'}
        />
        {!(gameWon || gameLost) && (
          <button
            type='submit'
            disabled={
              letterGuessed || enterLetter || noSpecialChars || noNumbers
            }
            onClick={guessHandler}
            className={'btn btn-dark py-1 px-2'}
          >
            GUESS
          </button>
        )}
        {(gameWon || gameLost) && (
          <button
            onClick={props.restartGame}
            className={'btn btn-dark py-1 px-2'}
          >
            PLAY AGAIN?
          </button>
        )}
      </form>
    </div>
  )
}

export default Mainscreen
