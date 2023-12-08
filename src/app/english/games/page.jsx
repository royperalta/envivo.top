'use client'
import { HiSpeakerWave } from "react-icons/hi2";
import { obtenerTresNumerosUnicos } from "./obtenerNumeros";
import { useEffect, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoReloadCircle } from "react-icons/io5";
import Style from './page.module.css'

export default function Page() {

  const activities = [
    {
      id: 1,
      frase: "Put on your shoes",
      traduccion: "Ponte los zapatos.",
      audio: './activities/audios/Put on your shoes.mp3',
      image: './activities/images/Put on your shoes.jfif'
    },
    {
      id: 2,
      frase: "Help yourself",
      traduccion: "Sírvete.",
      audio: './activities/audios/Help yourself.mp3',
      image: './activities/images/Help yourself.jfif'
    },
    {
      id: 3,
      frase: "Pass me the salt",
      traduccion: "Sírvete.",
      audio: './activities/audios/Pass me the salt.mp3',
      image: './activities/images/Pass me the salt.jfif'
    },
    {
      id: 4,
      frase: "Get ready",
      traduccion: "Sírvete.",
      audio: './activities/audios/Get ready.mp3',
      image: './activities/images/Get ready.jfif'
    },
    {
      id: 5,
      frase: "Bring me a towel",
      traduccion: "Sírvete.",
      audio: './activities/audios/Bring me a towel.mp3',
      image: './activities/images/Bring me a towel.jfif'
    }

  ]


  const [seleccionados, setSeleccionados] = useState([])
  const [respuesta, setRespuesta] = useState({})
  const [correcto, setCorrecto] = useState(false)
  const [incorrecto, setIncorrecto] = useState(false)
  const [reload, setReload] = useState(false)


  const audioRef = useRef()

  useEffect(() => {
    if (reload) {
      audioRef.current = new Audio()
      let numerosSeleccionado = obtenerTresNumerosUnicos(5)
      let tresSeleccionados = activities.filter((obj) => numerosSeleccionado.includes(obj.id))
      setSeleccionados(tresSeleccionados)
      //GENERO NUMERO ALEATORIO    
      const numeroAleatorio = Math.floor(Math.random() * 3)
      setRespuesta(tresSeleccionados[numeroAleatorio])
      setReload(false)
    }
  }, [reload])


  const handleRespuesta = (activity) => {
    if (activity.id === respuesta.id) {
      setCorrecto(true)
      audioRef.current.src = `./${activity.audio}`
      audioRef.current.play()

    } else {
      setIncorrecto(true)
    }
  }


  const handlePlay = (fuente) => {
    audioRef.current.src = `./${fuente}`
    audioRef.current.play()
  }

  const handleReload = () => {
    setReload(true)
    setSeleccionados([])
    setRespuesta({})
    setCorrecto(false)
    setIncorrecto(false)
  }

  /*  document.body.addEventListener("pointermove", (e)=>{
     const { currentTarget: el, clientX: x, clientY: y } = e;
     const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
     el.style.setProperty('--posX',  x-l-w/2);
     el.style.setProperty('--posY',  y-t-h/2);
   }) */

  return (
    <div className={`${Style.contenido} bg-gradient-to-r from-cyan-500 to-blue-500 p-2 `}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {seleccionados.map((activity, index) => (
            <div className={`relative flex justify-center items-center`} key={index} onClick={() => handleRespuesta(activity)}>
              <div>
                <img src={activity.image} alt="" className="rounded-lg" />
              </div>
              <div className={`${correcto === true && activity.id === respuesta.id ? 'absolute top-0 h-full bg-green-300 w-full opacity-60 rounded-lg' : ''} flex justify-center items-center`}>
              </div>

              <div className={`${incorrecto === true && activity.id !== respuesta.id ? 'absolute top-0 h-full bg-red-300 w-full opacity-60 rounded-lg' : ''} flex justify-center items-center`}>
              </div>


              <div className="absolute">
                {correcto === true && activity.id === respuesta.id ?
                  <div className="flex flex-col gap-4 justify-center items-center">
                    <FaCircleCheck size={60} color="white" />
                    <span className="text-4xl font-extrabold text-white">Great Job!!!</span>
                  </div>
                  : ''}                
              </div>
            </div>
          ))}
        </div>
        <div className="py-5 flex justify-around items-start"
        >
          <div className="flex w-4/6"
            onClick={() => handlePlay(respuesta.audio)}>
            <HiSpeakerWave className="w-1/6 text-white" size={60} />
            <div className="w-5/6 h-full text-white text-4xl font-extrabold  pointer">{respuesta.frase}</div>
          </div>
          <div className="w-2/6 flex justify-center items-center ">
            <IoReloadCircle className="text-yellow-200" size={70} onClick={handleReload} />
          </div>
        </div>
      </div>
    </div>
  )
}
