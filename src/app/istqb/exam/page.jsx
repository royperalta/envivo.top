'use client'
import React, { useEffect, useState } from 'react'
import JSONDATA from './istqb.json'
import Pregunta from './Pregunta'
export default function Exam() {


  const [datos, setDatos] = useState([])

  useEffect(() => {
    setDatos(JSONDATA)
  }, [])
  

  return (
    <div className='w-screen h-screen mx-auto lg:w-[850px]'>
      <h1 className='text-center p-2 font-extrabold text-2xl'>Preguntas de ISTQB</h1>
      <Pregunta datos={datos} />
    </div>
  )
}
