import react from "react";

import {nanoid} from "nanoid"

import  ReactDOM  from "react-dom";


import Die from "./Tenzie/die.js"


/* import useWindowSize from 'react-use/lib/useWindowSize' */
import Confetti from 'react-confetti' 




export default function TenzieApp () {
 


const [dice, setDice] = react.useState(allNewDice())
const [tenzie, setTenzie] = react.useState(false)
const [count, setCount] = react.useState(0)
  

function holdDice (id) {

    setDice(oldDice => oldDice.map(item => {
    
    if (id === item.id) {
  return   {
    ...item, 
    isHeld: !item.isHeld

}}
else return item
}
))}

function generateNewDie () {
    return   {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
    }
}

function allNewDice() {

    const newDice = [];

for(let i = 0; i < 10; i++) {

    newDice.push(generateNewDie())
}
return newDice;
}


const diceElements = dice.map(die => 
         <Die key={die.id} value={die.value} isHeld={die.isHeld} toggle={() => holdDice(die.id)}/>
    )


    function rollDice() {
        
      if(!tenzie) {
      setCount(prevCount => prevCount +1)
      setDice(prevDice => prevDice.map(die => {

      return die.isHeld ? die
      :  generateNewDie()
      }
    
        ))}
        else {
          setTenzie(false)
          setDice(allNewDice())
        }
    }


    react.useEffect(() => {

    const tenzieWin = dice.every(element => element.value === dice[0].value && element.isHeld)
        
        if (tenzieWin) {
          setTenzie(true)
        }
       
        
          
          }, [dice])


return (

<main className="mainSection">
 {tenzie && <Confetti/>}

<div className="container">
{!tenzie && <h1 className="title">Tenzies</h1>}
{tenzie ? <h1 className="win-title">You Won!</h1> : <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>}
{tenzie && <h4>With {count} rolls!</h4>}
<div className="dice--container">

{diceElements}

</div>

<button className= "dice--button" onClick={rollDice}>{tenzie ? "New Game" : "Roll"}</button>

</div>







</main>



)


}
