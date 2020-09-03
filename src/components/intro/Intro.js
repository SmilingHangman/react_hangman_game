import React from 'react'
import './Intro.css'
import knot from '../../assets/hangmans_knot.svg'

export const Intro = (props) => {
  return (
    <div className={'container d-flex flex-column align-items-center'}>
      <h3 className={'h3 mt-5 text-center'}>
        SmilingHangman
        <br />
        one man industries
      </h3>
      <h5 className={'h5 mb-5'}>proudly present</h5>
      <img src={knot} alt='' className={'h4 mb-5'} />
      <h2 className={'h2'}>HANGMAN</h2>
      <p className={'p'}>A word guessing game</p>
      <button onClick={props.startGame}>START GAME</button>
    </div>
  )
}

export default Intro
