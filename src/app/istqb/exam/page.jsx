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
    <div className='w-[860px] h-screen mx-auto bg-gray-100'>
      <h1>Preguntas de ISTQB</h1>
      <Pregunta datos={datos} />
    </div>
  )
}
