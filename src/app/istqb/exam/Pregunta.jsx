import React, { useState } from 'react'
import Question from './Question'

export default function Pregunta(props) {
    const { datos } = props
    const { preguntas } = datos
    const [answer, setAnswers] = useState({})

    //console.log(preguntas)
    const handleAnswer = (questionId, answerId) => {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answerId }));
    };

    //console.log(answer)



    const calculateResults = () => {

        let correctCount = 0;
        let incorrectCount = 0;

        preguntas?.forEach((question) => {
            const selectedAnswerId = answer[question.id];
            console.log(selectedAnswerId)
            if (selectedAnswerId === question.respuesta_correcta) {
                //console.log("Correcto")
                correctCount++;
            } else {
                //console.log("Incorrecto")
                incorrectCount++;
            }
        });

        return { correctCount, incorrectCount };
    };

    const results = calculateResults();


    return (
        <div>
            {
                preguntas?.map((pregunta, index) => (
                    <Question
                        key={index}
                        questionData={pregunta}
                        handleAnswer={handleAnswer}
                    />
                ))
            }
            <div className='h-[100px]'>

            </div>
            <div className='fixed bottom-0 left-0 right-0 bg-violet-500 text-white p-1 rounded flex items-center justify-center gap-2'>
                <div>Resultado: </div>
                <div className='border p-2 flex items-center flex-items gap-2'>
                    <div>Correcto: </div>
                    <h3 className='font-bold '>
                        {results.correctCount}
                    </h3>
                </div>
                {/* <div className='border p-2 flex items-center flex-items gap-2'>
                    <div>Incorrecto:</div>
                    <h3 className='font-bold'>
                        {results.incorrectCount}
                    </h3>
                </div> */}

            </div>
        </div>

    )
}
