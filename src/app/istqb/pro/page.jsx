'use client'
import React, { useEffect, useState } from 'react'
import JSON1 from './jsons/istqb1.json'
import JSON2 from './jsons/istqb2.json'
import JSON3 from './jsons/istqb3.json'
import Preguntas from './Preguntas'
export default function Exam() {


  const [datos, setDatos] = useState([])
  const [numberExam, setNumberExam] = useState(1)


  const lista = [
    { id: 1, json: JSON1 },
    { id: 2, json: JSON2 },
    { id: 3, json: JSON3 }
  ]

  const fetchData = (number) => {
    const jsons = [null, JSON1, JSON2, JSON3]
    setDatos(jsons[number])
  }

  useEffect(() => {
    fetchData(1)
  }, [])

  const handleReset = (number) => {
    setDatos([]);
    const jsons = [null, JSON1, JSON2, JSON3]
    setDatos(jsons[number])
    setNumberExam(number)
  }


  return (
    <div className='w-screen h-screen mx-auto lg:w-[850px]'>
      <h1 className='text-center p-2 font-extrabold text-2xl text-[#23242e]'>Seleccione la lista de preguntas</h1>
      <div className='font-extrabold text-center text-4xl text-[#353745]'> EXAMEN {numberExam}</div>
      <div className='flex'>
        {lista.map((examen, index) => (
          <div
            key={index}
            className='bg-[#6a708d] text-white p-2 m-1 font-bold border rounded-md'
            onClick={() => { fetchData(index + 1); handleReset(index + 1) }}
          >
            Examen: {examen.id}
          </div>
        ))}
      </div>
      {datos && <Preguntas datos={datos} />}
    </div>
  )
}
