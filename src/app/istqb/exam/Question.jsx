'use client'

import { useState } from "react";

const Question = ({ questionData, handleAnswer, handelResultado }) => {
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);  


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
        }
    }
    
    return (
        <div className='p-2 m-2 border '>
            <div className='flex flex-col'>
                <h3 className='text-2xl font-extrabold p-2'>{`Pregunta ${questionData.id}`}</h3>
                <p className='text-xl font-bold'>{questionData.enunciado}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: questionData.contenido_adicional_html }}>
            </div>
            <div>{(questionData.contenido_adicional_html)}</div>
            <div>
                <div className='font-bold p-5'>Respuestas: </div>
                <div className='px-10'>
                    {questionData.opciones.map((opcion, index) => (
                        <div key={index}
                            className={`flex hover:bg-sky-700 hover:text-white rounded p-1 cursor-pointer ${answerClassName(opcion.letra)} text-sm mb-2 transition-colors duration-300`}
                            onClick={() => handleChangeAnswer(opcion.letra)}
                        >
                            <h3>{opcion.letra})  </h3>
                            <h4 className='text-sm p-1'>{opcion.descripcion}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Question