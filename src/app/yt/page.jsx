'use client'

import axios from "axios";
import { useState } from "react";
import { saveAs } from 'file-saver'

export default function page() {
  const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(c\/|channel\/|user\/)?[^\/\s]+|youtu\.be\/)([^\s]*)$/;
  const [link, setLink] = useState()
  const [image, setImage] = useState("")
  const [estadoDescargar, setEstadoDescargar] = useState(false)
  const [estadoImagen, setEstadoImagen] = useState(false)


  const handleDescargar = async (event) => {
    event.preventDefault()
    if (youtubeUrlRegex.test(link)) {
      setEstadoDescargar(true)     
      const responseImage = await axios.post(`http://localhost:30000/api/imagen/`, {
        url: link
      })

      if (responseImage.status === 200) {
        setImage(responseImage.data.img)
        setEstadoImagen(true)

      }

      //-----------------------------FIN IMAGEN-----------------------
      const download = await axios.post("http://localhost:30000/api/descargar", {
        link: link
      })
      if (download.status === 200) {

        const download2 = await axios.get(`http://localhost:30000/api/download/${download.data.id}`, {
          responseType: 'blob'
        })

        if (download2.status === 200) {
          const blob = new Blob([download2.data])

          const filename = `${decodeURIComponent(download.data.title)}`
          saveAs(blob, filename)
          setDescargado(true)
          setEstadoDescargar(false)
          // Eliminar el archivo
          axios.post(`http://localhost:30000/api/eliminar`, {
            id: download.data.id
          }).then((responseEliminar) => {
            console.log(responseEliminar.data);
          }).catch((error) => {
            console.error(error);
          });
        }
      }
    }
  }



  const handlerInput = (event) => {
    const { value } = event.target
    setLink(value);
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center">
        <h1 className="my-5 text-2xl text-center font-extrabold">De youtube a mp3</h1>
        <div className="flex justify-between items-center" >
          <form onSubmit={handleDescargar}>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <input
                className="border rounded-full w-[360px] px-3.5 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition-all duration-300 text-sm "
                onChange={handlerInput}
                placeholder="https://youtube.com/"
                required
                type="text"
              />
              <button
                disabled={estadoDescargar === false ? false : true}
                type="submit"
                className={`${estadoDescargar === false ? 'bg-red-600' : 'bg-gray-600'} text-white p-2 rounded-full`}
              >
                Descargar
              </button>
            </div>
          </form>
        </div>

        <div className={`${estadoDescargar === true ? 'loader' : ''} my-6 relative w-[300px] h-[250px]`}>
          <div className="absolute inset-0 flex items-center justify-center">
            {estadoImagen ? (
              <div className="flex py-4 justify-center items-center">
                <img className="rounded border" src={image} alt="" width={300} height={300} />
              </div>
            ) : ""}
            {estadoDescargar ? (
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