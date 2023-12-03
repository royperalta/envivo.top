'use client'
import React, { useEffect, useRef, useState } from 'react'
import { GrNext, GrPrevious } from "react-icons/gr";
import {
  AiOutlineSound,
  AiFillSound,
} from "react-icons/ai";
import PopUp from './PopUp';


export default function PageCatecismo() {
  const PREGUNTAS = [
    {
      id: 1,
      question: "What is the chief end of man?",
      answer: "Man's chief end is to glorify God, and to enjoy him forever"
    },
    {
      id: 2,
      question: "What rule hath God given to direct us how we may glorify and enjoy him?",
      answer: "The Word of God, which is contained in the Scriptures of the Old and New Testaments, is the only rule to direct us how we may glorify and enjoy him"
    },
    {
      id: 3,
      question: "What do the Scriptures principally teach?",
      answer: "The Scriptures principally teach what man is to believe concerning God, and what duty God requires of man"
    }
  ]




  const [numberQuestion, setNumberQuestion] = useState(0)
  const [respuesta, setRespuesta] = useState("")
  const [verRespuesta, setVerRespuesta] = useState(false)
  const [validacionRespuesta, setValidacionRespuesta] = useState(false)

  const [error,setError] = useState(false)


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
      <div className='w-screen h-screen flex flex-col'>
        <div className='flex flex-col'>
          <h2 className='h-5 p-7 text-center'>Question {PREGUNTAS[numberQuestion].id}</h2>
          <div className='h-f bg-[#634339] flex flex-col justify-center items-center'>
            <div
              onClick={handleAudioQuestion}
              className='flex w-96 h-52 justify-center gap-3 items-center text-3xl cursor-pointer'>
              <div><AiOutlineSound /></div>
              <div>{PREGUNTAS[numberQuestion].question}</div>
            </div>
            <div onClick={handleListenAnswer} className='w-96 flex justify-center items-center p-4 cursor-pointer bg-[#b07a69]'>
              <div><AiFillSound /></div>
              <div>Listen the answer</div>
            </div>
            <div>
              <textarea
                className='w-96 h-56 p-4 text-black text-2xl rounded-md border-[#e3c7be]'
                type="text"
                onChange={handleRespuesta}
                placeholder='Type the answer...'
              />
            </div>
            <div className='p-3'>
              <button
                className='bg-[#b07a69] p-2 rounded-md'
                onClick={handleCheck}
              >Check</button>
            </div>

            <div className='absolute bottom-0'>
              {verRespuesta && (
                <PopUp onClose={handleCloseRespuesta}>
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
