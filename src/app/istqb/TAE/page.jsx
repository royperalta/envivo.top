'use client'
import React, { useEffect, useState } from 'react'
import JSON1 from './jsons/istqb1.json'
import JSON2 from './jsons/istqb2.json'
import JSON3 from './jsons/istqb3.json'
import JSON4 from './jsons/istqb4.json'
import JSON5 from './jsons/istqb5.json'
import JSON6 from './jsons/istqb6.json'
import JSON7 from './jsons/istqb7.json'
import JSON8 from './jsons/istqb8.json'
import JSON9 from './jsons/istqb9.json'
import JSON10 from './jsons/istqb10.json'
import Preguntas from './Preguntas'
export default function Exam() {


  const [datos, setDatos] = useState([])
  const [numberExam, setNumberExam] = useState(1)



 

  const lista = [
    { id: 1, json: JSON1 },
    { id: 2, json: JSON2 },
    { id: 3, json: JSON3 },
    { id: 4, json: JSON4 },
    { id: 5, json: JSON5 },
    { id: 6, json: JSON6 },
    { id: 7, json: JSON7 },
    { id: 8, json: JSON8 },
    { id: 9, json: JSON9 },
    { id: 10, json: JSON10 }
  ]

  const fetchData = (number) => {
    const jsons = [null, JSON1, JSON2, JSON3,JSON4,JSON5,JSON6,JSON7,JSON8,JSON9,JSON10]
    setDatos(jsons[number])
  }

  useEffect(() => {
    fetchData(1)
  }, [])

  const handleReset = (number) => {
    setDatos([]);
    const jsons = [null, JSON1, JSON2, JSON3,JSON4,JSON5,JSON6,JSON7,JSON8,JSON9,JSON10]
    setDatos(jsons[number])
    setNumberExam(number)
  }


  return (
    <div className='w-screen h-screen mx-auto lg:w-[850px]'>
      <h1 className='text-center p-2 font-extrabold text-2xl text-[#23242e]'>Simulador Certified Tester Test Automation Engineer (CT-TAE)</h1>
      <div className='font-extrabold text-center text-4xl text-[#353745]'> EXAMEN {numberExam}</div>
      <div className='grid grid-cols-3 md:grid-cols-7 gap-2 mt-5'>
        {lista.map((examen, index) => (
          <div
            key={index}
            className={`${numberExam === (index+1) ? 'bg-[#6a708d] text-white':'bg-gray-200 text-black'} cursor-pointer  p-2 m-1 font-bold border rounded-md`}
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
