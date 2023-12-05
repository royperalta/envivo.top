'use client'


import React, { useEffect, useRef, useState } from 'react'
import { GrNext, GrPrevious } from "react-icons/gr";
import {PREGUNTAS} from './questions.js'
import {
  AiOutlineSound,
  AiFillSound,
} from "react-icons/ai";
import PopUp from './PopUp';


export default function PageCatecismo() {
  


  const [numberQuestion, setNumberQuestion] = useState(0)
  const [respuesta, setRespuesta] = useState("")
  const [verRespuesta, setVerRespuesta] = useState(false)
  const [validacionRespuesta, setValidacionRespuesta] = useState(false)

  const [error, setError] = useState(false)


  let audioRef = useRef()

  useEffect(() => {
    audioRef.current = new Audio()
  }, [])

  const handleNext = () => {
    if (numberQuestion < PREGUNTAS.length - 1) {
      document.getElementsByTagName("textarea")[0].value = ""
      setNumberQuestion(numberQuestion + 1)
    }
  }

  const handlePrev = () => {
    if (numberQuestion > 0) {
      document.getElementsByTagName("textarea")[0].value = ""
      setNumberQuestion(numberQuestion - 1)
    }
  }

  const handleVerRespuesta = () => {
    setVerRespuesta(true)
  }

  const handleCloseRespuesta = () => {
    setVerRespuesta(false)
    setValidacionRespuesta(false)
    setError(false)
  }

  const handleRespuesta = (event) => {
    console.log(event.target.value)
    setRespuesta(event.target.value)
  }
  const handleCheck = () => {

    if (respuesta.includes(PREGUNTAS[numberQuestion].answer) && respuesta !== '') {
      setValidacionRespuesta(true)
    } else {
      setError(true)
    }

  }

  const handleAudioQuestion = () => {
    audioRef.current.src = `/audio/${numberQuestion + 1}q.mp3`
    audioRef.current.play();
  }

  const handleListenAnswer = () => {
    audioRef.current.src = `/audio/${numberQuestion + 1}a.mp3`
    audioRef.current.play()
  }

  return (
    <div className='w-full bg-[#634339] h-screen text-white flex flex-col '>
      <div className=' flex flex-col'>
        <div className='flex flex-col'>
          <h2 className='h-5 p-7 text-center'>Question {PREGUNTAS[numberQuestion].id}</h2>
          <div className='h-f bg-gradient-to-c from-[#f5d954] via-[#f5d954] to-[##f5d954] flex flex-col justify-center items-center'>
            <div
              onClick={handleAudioQuestion}
              className='flex w-96 h-52 justify-center items-center text-3xl cursor-pointer'>
              <div><AiOutlineSound className='mx-2 text-yellow-300'/></div>
              <div className='font-extrabold text-yellow-50 shadow-2xl'>{PREGUNTAS[numberQuestion].question}</div>
            </div>
            <div onClick={handleListenAnswer} className='gap-2 w-96 flex justify-center items-center p-4 cursor-pointer bg-[#b07a69]'>
              <div><AiFillSound /></div>
              <div>Listen to the answer</div>
            </div>
            <div>
              <textarea
                className='w-96 h-36 p-4 text-black text-2xl rounded-md border-[#e3c7be]'
                type="text"
                onChange={handleRespuesta}
                placeholder='Type the answer...'
              />
            </div>
            <div className='p-3 drop-shadow-2xl'>
              <button
                className='bg-[#b07a69] p-2 rounded-md'
                onClick={handleCheck}
              >Check</button>
            </div>

            <div className='absolute bottom-0'>
              {verRespuesta && (
                <PopUp onClose={handleCloseRespuesta} play={handleListenAnswer}>
                  {PREGUNTAS[numberQuestion].answer}
                </PopUp>
              )}

              {validacionRespuesta && (
                <PopUp onClose={handleCloseRespuesta} color={true}>
                  Great job!...
                </PopUp>
              )}

              {error && (
                <PopUp onClose={handleCloseRespuesta} color={false}>
                  Oops! Try again!...
                </PopUp>
              )}
            </div>
            <div className='w-96 flex justify-around gap-10 bottom-20 items-center'>

              <GrPrevious onClick={handlePrev} className='w-[40px] h-[40px]' />

              <button onClick={handleVerRespuesta} >{verRespuesta ? '' : 'Show answer'}</button>

              <GrNext onClick={handleNext} className='w-[40px] h-[40px]' />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
