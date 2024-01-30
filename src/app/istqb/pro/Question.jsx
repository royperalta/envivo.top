'use client'
import './style.css'
import Divider from '@mui/material/Divider'
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';

const Question = ({ questionData, handleAnswer, limpiar }) => {
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        setSelectedAnswer(null)
        setAnswered(false)
    }, [questionData])

    const handleChangeAnswer = (answerId) => {
        if (!answered) {
            setSelectedAnswer(answerId);
            handleAnswer(questionData.id, answerId)
            setAnswered(true);
        }
    }


    const answerClassName = (answerId) => {
        if (answered && answerId === questionData.respuesta_correcta) {
            return 'bg-green-600 text-white';
        }
        else if (answered && answerId === selectedAnswer && answerId !== questionData.respuesta_correcta) {
            return 'bg-red-800 text-white';
        } else if (selectedAnswer === null) {
            return ''
        }
    }

    return (
        <Card className='p-8 m-4' sx={{ backgroundColor: '#f6f6f9' }}>

            <div className='flex flex-col'>
                <h3 className='text-2xl font-extrabold p-2'>{`Pregunta ${questionData.id}`}</h3>

                <Divider variant="middle" className=''/>
                <p className='text-xl font-bold py-3'>{questionData.enunciado}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: questionData.contenido_adicional_html }}>
            </div>
            <div>
                <div className='font-bold p-5'>Respuestas: </div>
                <div className='px-10 '>
                    {questionData.opciones.map((opcion, index) => (
                        <div key={index}
                            className={`flex items-center rounded p-1 cursor-pointer ${answerClassName(opcion.letra)} text-sm mb-2  transition-colors duration-300`}
                            onClick={() => handleChangeAnswer(opcion.letra)}
                        >
                            <h3>{opcion.letra})  </h3>
                            <h4 className='text-sm p-1'>{opcion.descripcion}</h4>
                        </div>
                    ))}
                </div>
            </div>

        </Card>
    )
}

export default Question