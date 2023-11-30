'use client'

import { useState } from "react"

export default function RouterPassword() {

  const [mac, setMac] = useState([])
  const [resultado, setResultado] = useState('')
  const handleClick = () => {

    const regex = /^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/;

    const esValida = regex.test(mac);

    console.log(esValida); // Devolverá true si la MAC es válida, de lo contrario, false


    if (esValida) {
      let arrayMac = ''
      if (mac.includes("-")) {
         arrayMac = mac.split("-")
      } else {
         arrayMac = mac.split(":")
      }
      let tmpclave = ''
      let claveFinal = ''

      for (let index = 0; index < arrayMac.length / 2; index++) {
        let primero = arrayMac[index * 2]
        let segundo = arrayMac[index * 2 + 1]
        tmpclave += `${segundo}${primero}`
        console.log(tmpclave)
      }

      for (let index = 0; index < tmpclave.length; index++) {
        if (index === 5) {
          claveFinal += `${tmpclave[index]}@`
        } else {
          claveFinal += tmpclave.charAt(index)
        }

      }
      console.log(claveFinal)
      setResultado(`#${claveFinal}*`.toUpperCase())
    } else {
      alert('La dirección MAC no tiene el formato correcto')
    }



  }

  const handleMac = (event) => {
    console.log(event.target.value)
    setMac(event.target.value.trim())
    setResultado('')
  }

  return (
    <div>
      <div className="vh-100">

        <div className="flex justify-center items-center flex-col h-screen gap-4">
          <h1 className="text-center text-2xl font-extrabold">Obtener Password de Router con la MAC</h1>
          <label className="flex flex-col justify-center items-center gap-2">
            Ingrese la MAC:
            <input type="text"
              onChange={handleMac}
              className="border rounded-md border-black h-[40px] block p-3 text-center text-xl font-extrabold"
              placeholder="44-d9-e7-24-96-ce"
            />
          </label>
          <button
            onClick={handleClick}
            className="bg-red-600 text-center text-white h-10 p-2 rounded-full w-48"
          >
            OBTENER CLAVE
          </button>

          {resultado ? (
            <div className="bg-green-200 rounded-md p-2">
              <p>{resultado}</p>
            </div>
          ) : ''}
        </div>
      </div>
    </div>
  )
}
