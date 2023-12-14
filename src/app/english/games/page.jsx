'use client'
import { HiSpeakerWave } from "react-icons/hi2";
import { obtenerTresNumerosUnicos } from "./obtenerNumeros";
import { useEffect, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoReloadCircle } from "react-icons/io5";
import { TfiFaceSad } from "react-icons/tfi";
import Style from './page.module.css'
import { DATA } from "./data";

export default function Page() {

  const activities = DATA


  const [seleccionados, setSeleccionados] = useState([])
  const [respuesta, setRespuesta] = useState({})
  const [correcto, setCorrecto] = useState(false)
  const [incorrecto, setIncorrecto] = useState(false)
  const [reload, setReload] = useState(false)
  const [estadoAudio, setEstadoAudio] = useState(false)


  const audioRef = useRef()
  const audioRef2 = useRef()

  useEffect(() => {

    const resetAudios = () => {
      audioRef.current = new Audio()
      audioRef2.current = new Audio()
    }


    const generateRandomActivy = () => {
      let numerosSeleccionado = obtenerTresNumerosUnicos(5)
      let tresSeleccionados = activities.filter((obj) => numerosSeleccionado.includes(obj.id))
      setSeleccionados(tresSeleccionados)
      //GENERO NUMERO ALEATORIO    
      const numeroAleatorio = Math.floor(Math.random() * 2)
      setRespuesta(tresSeleccionados[numeroAleatorio])
    }
    resetAudios()
    generateRandomActivy()

    if (reload) {
      resetAudios()
      generateRandomActivy()
      setReload(false)
    }

  }, [reload])


  const handleRespuesta = (activity) => {
    if (estadoAudio) {
      if (activity.id === respuesta.id) {

        audioRef2.current.src = `./activities/audios/click.mp3`
        audioRef2.current.play()
        /*  audioRef.current.src = `./${activity.audio}`
         audioRef.current.play() */
        setCorrecto(true)

      } else {
        audioRef2.current.src = `./activities/audios/negative.mp3`
        audioRef2.current.play()
        setIncorrecto(true)

      }
    } else {
      alert("Listen to audio")
    }
  }

  const handlePlay = (fuente) => {

    audioRef.current.src = `./${fuente}`
    audioRef.current.play()
    setEstadoAudio(true)
  }

  const handleReload = () => {
    setEstadoAudio(false)
    setSeleccionados([])
    setRespuesta({})
    setCorrecto(false)
    setIncorrecto(false)
    setReload(true)
  }

  return (
    <div className={`${Style.contenido} bg-gradient-to-r from-cyan-500 to-blue-500 p-2  `}>
      <div className="min-h-screen flex flex-col">
       
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-grow">
          {seleccionados.map((activity, index) => (
            <div
              className={`relative flex justify-center items-center`}
              key={index}
              onClick={() => handleRespuesta(activity)}
            >
              <div>
                <img
                  src={activity.image}
                  alt=""
                  className="rounded-lg" />
              </div>
              <div
                className={`${correcto === true && activity.id === respuesta.id ? 'absolute top-0 h-full bg-green-300 w-full opacity-60 rounded-lg' : ''} flex justify-center items-center`}
              >
              </div>

              <div
                className={`${incorrecto === true && activity.id !== respuesta.id ? 'absolute top-0 h-full bg-red-300 w-full opacity-60 rounded-lg' : ''} flex justify-center items-center`}
              >
              </div>

              <div className="absolute">
                {
                  incorrecto === true && activity.id !== respuesta.id ?
                    <div>
                      <div className="relative text-white">
                        <TfiFaceSad size={70} />
                      </div>
                    </div> :
                    ''
                }
              </div>

              <div className="absolute">
                {correcto === true && activity.id === respuesta.id ?
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <FaCircleCheck
                      size={60}
                      color="white"
                    />
                    <span className="text-4xl font-extrabold text-white">Great Job!!!</span>
                  </div>
                  : ''}
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-0 w-full bg-red-300 p-4">
          <div
            className="flex w-4/6"
            onClick={() => handlePlay(respuesta.audio)}>
            <HiSpeakerWave
              className="w-1/6 text-white"
              size={60}
            />
            <div className="w-5/6 h-full text-white text-4xl font-extrabold">
              {respuesta.frase}
            </div>
          </div>
          <div className="w-2/6 flex justify-center items-center ">
            <IoReloadCircle
              id="boton"
              className="text-yellow-200"
              size={70}
              onClick={handleReload}
            />
          </div>
        </div>


      </div>
    </div>
  )
}
