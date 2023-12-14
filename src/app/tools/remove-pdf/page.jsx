'use client'
import { useState } from "react"

export default function RemovePage() {


    const [formData, setFormData] = useState({
        removePages: [],
        file: null
    })


    const handleOnChange = (event) => {
        const { name, value, type, files } = event.target
        console.log(value)
        if (type === 'file') {
            setFormData((prevData) => ({
                ...prevData,
                [name]: files[0], // Solo tomamos el primer archivo si hay varios
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: [...value.split(",")],
            }));
        }

    }

    console.log(formData)
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('removePages', JSON.stringify(formData.removePages))
            formDataToSend.append('file', formData.file)

            console.log(formDataToSend)
            const response = await fetch('https://envivo.top:9300/api/pdf/load', {
                method: 'POST',
                body: formDataToSend
            })

            if (response.ok) {
                const responseData = await response.blob()
                const link = document.createElement('a')
                link.href = URL.createObjectURL(responseData)
                link.download = 'archivo_procesado.pdf'

                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                URL.revokeObjectURL(link.href)

            } else {
                console.log('Error en la solicitud')
            }
        } catch (error) {
            console.log('Error ' + error)
        }

    }


    return (
        <div className="flex justify-center items-center">
            <form onSubmit={handleSubmit} className=" w-96 gap-5 flex flex-col">
                <input type="file" name="file" onChange={handleOnChange} />
                <label>
                    Páginas a eliminar separado por comas 1,2,3
                </label>
                <input type="text" name="removePages" className="border p-2 font-extrabold" onChange={handleOnChange} />

                <button className="bg-red-800 p-2 text-white rounded-full" type="submit" >Enviar</button>
            </form>

        </div>
    )
}
