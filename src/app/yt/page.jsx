'use client'

import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { saveAs } from 'file-saver'
import Image from "next/image";

export default function Page() {

  if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = 'https://envivo.top:9300'
  } else {
    axios.defaults.baseURL = 'http://localhost:9300'
  }

  const [link, setLink] = useState()
  const [image, setImage] = useState("")
  const [estadoDescargar, setEstadoDescargar] = useState(false)
  const [estadoImagen, setEstadoImagen] = useState(false)
  const [messageError, setMessageError] = useState(false)
  const [loading, setLoading] = useState(false)

  const [mp3, setMp3] = useState(false)


  const handleDescargarImagen = async (event) => {
    event.preventDefault()

    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    const isValid = urlRegex.test(link)

    if (!isValid) {

      return setMessageError(true)
    }

    setMessageError(false)
    setEstadoDescargar(true)
    try {

      const responseImage = await axios.post(`/api/imagen`, {
        url: link,
        mp3: mp3
      })
      setImage(responseImage.data.img)
      setEstadoImagen(true)
      if (responseImage.status == 200) {
        setLoading(true)
      }

    } catch (error) {
      if (error.response) {
        const { status, data } = error.response
        if (status === 400) {
          setMessageError(true)
          setEstadoImagen(false)

        } else if (status === 500) {
          setMessageError(true)
          setEstadoImagen(false)

        }
      }
    }
    //-----------------------------FIN IMAGEN-----------------------

  }

  const handleDescargar = async (event) => {
    event.preventDefault()
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    const isValid = urlRegex.test(link)

    if (!isValid) {
      return setMessageError(true)
    }

    try {
      const download = await axios.post("/api/descargar", {
        link: link,
        mp3, mp3
      })
      if (download.status === 200) {

        const download2 = await axios.get(`/api/download/${download.data.id}/${download.data.idCarpeta}/${mp3}`, {
          responseType: 'blob'
        })
        console.log(download2)
        if (download2.status === 200) {
          const blob = new Blob([download2.data])

          const filename = `${decodeURIComponent(download.data.title)}`
          saveAs(blob, filename)
          setEstadoDescargar(false)
          setLoading(false)
          // Eliminar el archivo
          axios.post(`/api/eliminar`, {
            id: download.data.id,
            idCarpeta: download.data.idCarpeta
          }).then((responseEliminar) => {
            console.log(responseEliminar.data);
          }).catch((error) => {
            console.error(error);
          });
        }
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response
        if (status === 400) {
          setMessageError(true)

        } else if (status === 500) {
          setMessageError(true)
        }
      }
    }
  }

  const handlerInput = (event) => {
    const { value } = event.target
    setLink(value);
    setMessageError(false)
    setEstadoDescargar(false)
  }

  const handleCheckBoxs = (event) => {
    setMp3(event.target.checked)
    setEstadoDescargar(false)
  }


  const handleEjecutarAmbos = async (event) => {
    await Promise.all([handleDescargar(event), handleDescargarImagen(event)])

  }

  return (
    <div className="flex justify-center items-center">
      <Head>
        <title>Descargar videos de TikTok, YouTube e Instagram</title>
        <meta name="description" content="Descarga videos de TikTok, twitter, YouTube e Instagram de forma fácil y rápida. ¡Prueba nuestra herramienta gratuita ahora mismo!" />
        <meta name="keywords" content="descargar videos, TikTok, YouTube, twitter, Instagram, mp3, descarga de videos" />
        <meta name="author" content="envivo.top" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Descargar videos de TikTok, twitter, YouTube e Instagram" />
        <meta property="og:description" content="Descarga videos de TikTok, twitter, YouTube e Instagram de forma fácil y rápida. ¡Prueba nuestra herramienta gratuita ahora mismo!" />
        <meta property="og:url" content="https://envivo.top/yt" />
        <meta property="og:image" content="https://envivo.top/logoenvivo.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Descargar videos de TikTok, YouTube e Instagram" />
        <meta name="twitter:description" content="Descarga videos de TikTok, YouTube e Instagram de forma fácil y rápida. ¡Prueba nuestra herramienta gratuita ahora mismo!" />
        <meta name="twitter:image" content="Descargar videos de TikTok, YouTube e Instagram, twitter" />
        <meta name="twitter:card" content="Descargar videos de TikTok, YouTube e Instagram, twitter" />
      </Head>
      <div className="flex flex-col items-center">
        <h1 className="my-5 text-2xl text-center font-extrabold">Download Youtube Tiktok</h1>
        <div className="flex justify-between items-center" >
          <form onSubmit={handleEjecutarAmbos}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <input
                className="border rounded-full w-[360px] px-3.5 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 text-sm "
                onChange={handlerInput}
                placeholder="https://example.com/"
                required
                type="text"
              />
              <label className="text-l text-gray-700 ">
                <input
                  type="checkbox"
                  onChange={handleCheckBoxs}
                  className="form-checkbox h-5 w-5 text-indigo-600 m-2"
                />
                Audio mp3
              </label>

              <label className={`flex ${estadoDescargar === false ? 'cursor-pointer bg-red-600' : ' bg-gray-600'} text-white p-2 my-5 rounded-full p-2`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'white', margin: '0 0px 0 2px' }}>
                  <path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path>
                </svg>
                <input
                  value="Descargar"
                  disabled={estadoDescargar === false ? false : true}
                  type="submit"
                  className={`${estadoDescargar === false ? 'cursor-pointer ' : ''} px-3`}
                />
              </label>



            </div>
          </form>
        </div>
        {messageError ? (
          <div className="flex gap-2 bg-red-600 text-white p-2 rounded-md m-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'white', transform: '', msFilter: '' }}>
              <path d="M11 7h2v7h-2zm0 8h2v2h-2z"></path>
              <path d="m21.707 7.293-5-5A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707zM20 15.586 15.586 20H8.414L4 15.586V8.414L8.414 4h7.172L20 8.414v7.172z"></path>
            </svg>
            ! Error de descarga
          </div>
        ) : ''}


        <div className={`${estadoDescargar && !messageError === true ? 'loader' : ''} my-6 relative w-[300px] h-[250px]`}>
          <div className="relative inset-0 flex items-center justify-center">
            {estadoImagen ? (
              <div className="flex py-4 justify-center items-center animate__animated animate__fadeIn">
                <Image
                  className="animate__animated animate__fadeIn shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]"
                  src={image}
                  alt=""
                  width={300}
                  height={300}
                />
              </div>

            ) : ""}
            {loading && !messageError ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
              </div>
            ) : ""}
          </div>
        </div>


      </div>
    </div>
  )

}