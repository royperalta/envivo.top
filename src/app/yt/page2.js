'use client'
import { useState } from 'react'
import axios from 'axios'
import { saveAs } from 'file-saver'

export default function Home() {
    const [isLoading, setIsLoading] = useState(false)
    const [descargar, setDescargar] = useState(false)
    const [image, setImage] = useState(false)
    const [urlImage, setUrlImage] = useState('')
    const [imageLoaded, setImageLoaded] = useState(false);



    const handleChangeInput = async (event) => {
        const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/(c\/|channel\/|user\/)?[^\/\s]+|youtu\.be\/)([^\s]*)$/;


        if (youtubeUrlRegex.test(event.target.value)) {
            console.log(event.target.value)
            setIsLoading(true)
            setImage(false)
            const url = event.target.value
            try {
                const responseImage = await axios.post(`http://localhost:30000/api/image/`, {
                    url: url
                })
                console.log(responseImage.data)
                if (responseImage.status === 200) {
                    setImage(true)
                    setUrlImage(responseImage.data.id)
                    setImageLoaded(true);
                }

                const response = await axios.post('http://localhost:30000/api/download', {
                    url: url
                })
                console.log(response.data)
                if (response.status === 200) {
                    setIsLoading(false)
                    const respuesta = await axios.get(`http://localhost:30000/api/downloads/${response.data.id}`, {
                        responseType: 'blob'
                    })
                    console.log(response.data)
                    if (respuesta.status === 200) {

                        const blob = new Blob([respuesta.data])
                        const filename = `${decodeURIComponent(response.data.title)}`
                        saveAs(blob, filename)

                        // Eliminar el archivo
                        axios.post(`http://localhost:30000/api/eliminar`, {
                            id: response.data.id
                        }).then((responseEliminar) => {
                            console.log(responseEliminar.data);
                        }).catch((error) => {
                            console.error(error);
                        });
                    }

                } else {
                    console.log('no se eencontro el video')
                }

            } catch (error) {
                console.log(error)
            }
        }


    }

    return (
        <main>
            <div className="flex flex-col h-screen justify-center items-center">
                <h1 className={`text-4xl font-bold text-gray-900 text-center mb-8 `}>Downloader Music Youtube</h1>

                <input
                    placeholder='Paste link here...'
                    onChange={handleChangeInput}
                ></input>

                <div>
                    {isLoading ? (
                        <div className="loading">
                            <div className="ball"></div>
                            <div className="ball"></div>
                            <div className="ball"></div>
                            <div className="ball"></div>
                            <div className="ball"></div>
                        </div>

                    ) : ''}
                    {descargar ? <button>DESCARGAR</button> : ''}
                </div>

                {image ? (
                    <div className={`image ${imageLoaded ? 'visible' : ''}`}>
                        <img src={`http://localhost:30000/images/${urlImage}.webp`} />
                    </div>
                ) : ''}

            </div>

        </main>
    )
}
