'use client'
import React, { useEffect, useRef, useState } from 'react'
import data from './data.json'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function IrregularVerbs() {


    const [verbs, setVerbs] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    let audioRef = useRef()
    //console.log(data)

    useEffect(() => {
        audioRef.current = new Audio()
        const filteredVideos = data.filter((verb) => verb.baseForm.toLowerCase().includes(searchQuery.toLowerCase()))

        setVerbs(filteredVideos)

    }, [searchQuery])

    console.log(verbs)
    console.log(searchQuery)

    let handleSearchQuery = (event) => {
        setSearchQuery(event.target.value)
    }

    let handleSearchSubmit = (e) => {
        e.preventDefault()
    }
    let handlePlay = (id) => {
        audioRef.current.src = `./activities/irregularVerbs/${id}.mp3`
        audioRef.current.play()
    }

    return (
        <div className='flex justify-center gap-2 m-2'>
            <div className=" mx-auto sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white ">
                <form className="" onSubmit={handleSearchSubmit}>
                <Typography variant="h5" component="div">Search the verbs:</Typography>
                    <label htmlFor="site-search"></label>
                    <input
                        type="search"
                        id="site-search"
                        name="q"
                        value={searchQuery}                        
                        onChange={handleSearchQuery}
                        className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    />
                    {/* Puedes agregar más elementos al formulario si es necesario */}
                    {/* <datalist id='verbs'>
                        {data.map(({ id, baseForm }) => (<option key={id}>{baseForm}</option>))}
                    </datalist> */}
                </form>

                {
                    verbs.map(({
                        id,
                        baseForm,
                        pastSimple,
                        pastParticiple,
                        translate,
                        examples,
                        pronInSpanishBaseForm,
                        pronInSpanishPastParticiple,
                        pronInSpanishPastSimple,
                        biblicalExamples

                    }) => (
                        <Card key={id} className="p-2 my-4" sx={{ minWidth: 275 }}>
                            <div className='font-extrabold text-2xl flex gap-3' onClick={() => handlePlay(id)}>
                                <div>
                                    <Typography variant="h5" component="div">{id} - {baseForm} / {pastSimple} / {pastParticiple}</Typography>
                                    <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                        {pronInSpanishBaseForm} / {pronInSpanishPastSimple} / {pronInSpanishPastParticiple}
                                    </Typography>
                                </div>
                                <div>
                                    <VolumeUpIcon />
                                </div>
                            </div>
                            <div>

                                <div className='py-5'>                                   
                                    {translate.map((item,index) => (
                                        <label key={index} className='bg-violet-200 p-2 m-0.5'>{` ${item} `}</label>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className='flex gap-2 flex-col'>
                                    <Typography sx={{ mb: 0.1 }} color="text.secondary">
                                        Examples:
                                    </Typography>
                                    {biblicalExamples.map(({ english, spanish },index) => (
                                        <div className='' key={index}>
                                            <li className='font-bold'> {`${english}`}</li>
                                            
                                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                {spanish}
                                            </Typography>
                                        </div>
                                    ))}
                                    {
                                        examples.map(({ english, spanish },index) => (
                                            <div className='' key={index}>
                                                <li className='font-bold'> {`${english}`}</li>
                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    {spanish}
                                                </Typography>                                               
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>

                        </Card>
                    ))
                }

            </div>
        </div>
    )
}

