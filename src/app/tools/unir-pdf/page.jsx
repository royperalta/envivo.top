'use client'
import { useState } from 'react';


export default function UnirPDF() {
  const [descargar, setDescargar] = useState(false)
  const [formData, setFormData] = useState({
    files: null
  })

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      files: event.target.files
    })
  }

  const handleFileUpload = async () => {

    if (formData.files !== null && formData.files.length > 1) {
      const formDataToSend = new FormData()
      // Recorre los archivos y agrégales uno por uno
      for (let i = 0; i < formData.files.length; i++) {
        formDataToSend.append('pdfFiles', formData.files[i]);
      }
      console.log(formData.files)
      try {
        const response = await fetch('http://localhost:9300/api/pdf/merge', {
          method: 'POST',
          body: formDataToSend,

        })

        if (response.ok) {
          setDescargar(true)
          const responseData = await response.blob();
          return responseData; // Retorna los datos para la descarga
        } else {
          console.log('Error en la solicitud');
          return null;
        }
      } catch (error) {
        console.log(error)
      }
    } else if (formData.files.length < 2) {
      console.log("agregue mas archivos")
    } else {
      console.log("No hay archivo")
    }
  }

  const handleDownload = async () => {
    if (descargar) {
      const responseData = await handleFileUpload();

      if (responseData) {

        const link = document.createElement('a');
        link.href = URL.createObjectURL(responseData);
        link.download = 'archivo_procesado.pdf';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }
    } else {
      console.log("Nose puede descargar")
    }
  };

  console.log(formData)
  
  return (
    <div>
      <div className='flex flex-col h-screen  justify-center w-screen items-center'>
        <div> <h1>PDF File Upload and Download</h1></div>
        <div>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <div>
          <button onClick={handleFileUpload}>Unir</button>
        </div>

        <div>
          {
            descargar && (
              <button onClick={handleDownload} >
                Download
              </button>
            )
          }
        </div>

      </div>
      
    </div>
  )
}


function ArrowUpRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}


