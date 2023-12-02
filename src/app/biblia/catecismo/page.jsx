'use client'
import React, { useEffect, useRef, useState } from 'react'
import {
  AiOutlineSound,
  AiFillSound
} from "react-icons/ai";
import PopUp from './PopUp';


export default function PageCatecismo() {
  const PREGUNTAS = [
    {
      id: 1,
      question: "What is the chief end of man?",
      answer: "Man’s chief end is to glorify God, and to enjoy him for ever"
    },
    {
      id: 2,
      question: "What rule hath God given to direct us how we may glorify and enjoy him?",
      answer: "The Word of God, which is contained in the Scriptures of the Old and New Testaments, is the only rule to direct us how we may glorify and enjoy him. "
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


  let audioRef = useRef()

  useEffect(() => {
    audioRef.current = new Audio()
  }, [])

  const handleNext = () => {
    if (numberQuestion < PREGUNTAS.length - 1) {
      setNumberQuestion(numberQuestion + 1)
    } else {
      alert('No hay mas preguntas')
    }
  }

  const handlePrev = () => {
    if (numberQuestion > 0) {
      setNumberQuestion(numberQuestion - 1)
    } else {
      alert('No hay mas preguntas')
    }
  }

  const handleVerRespuesta = () => {
    setVerRespuesta(true)
  }

  const handleCloseRespuesta = () => {
    setVerRespuesta(false)
  }

  const handleRespuesta = (event) => {
    setRespuesta(event.target.value)
  }
  const handleCheck = () => {

    if (respuesta.includes(PREGUNTAS[numberQuestion].answer)) {
      alert('Correcto')
    } else {
      alert('Intente nuevamente')
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
    <div className='w-full bg-[#634339] h-screen text-white flex flex-col justify-center items-center'>
      <div className='w-screen h-screen flex justify-center flex-col'>
        <div className='relative'>
          <h2 className='h-10 text-center'>Question {PREGUNTAS[numberQuestion].id}</h2>
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
                className='w-96 h-40 p-4 text-black text-2xl rounded-md'
                type="text"
                onChange={handleRespuesta}
              />
            </div>
            <div>
              <button
                onClick={handleCheck}
              >Check</button>
            </div>
            <div>
              <button onClick={handleVerRespuesta} >{verRespuesta ? '' : 'Ver respuesta'}</button>
            </div>
            <div className='absolute bottom-0'>
              {verRespuesta && (
                <PopUp onClose={handleCloseRespuesta}>
                  {PREGUNTAS[numberQuestion].answer}
                </PopUp>
              )}
            </div>
          </div>

          <div className='flex justify-between items-center gap-10 bottom-20'>
            <button onClick={handlePrev} className='border-[#8c5949] bg-[#f6edea] text-[#8c5949] rounded-md p-2'>Prev</button>
            <button onClick={handleNext} className='border-[#8c5949] bg-[#f6edea] text-[#8c5949] rounded-md p-2'>Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
