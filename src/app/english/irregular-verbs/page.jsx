'use client'
import React, { useEffect, useRef, useState } from 'react'
import data from './data.json'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { Input } from '@mui/base/Input';

export default function IrregularVerbs() {


    const [verbs, setVerbs] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    let audioRef = useRef()
    //console.log(data)

    useEffect(() => {
        audioRef.current = new Audio()
        const filteredVideos = data.filter((verb) =>
            verb.baseForm.toLowerCase().includes(searchQuery.toLowerCase()) ||
            verb.pastSimple.toLowerCase().includes(searchQuery.toLowerCase()) ||
            verb.pastParticiple.toLowerCase().includes(searchQuery.toLowerCase())
        )

        setVerbs(filteredVideos)

    }, [searchQuery])

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

        <div className='mx-auto w-[500px] gap-2'>
            <div>
                <form
                    className="fixed top-0 flex items-center gap-2 bg-[#2c4772] w-[500px] p-3"
                    onSubmit={handleSearchSubmit}>
                    <SearchIcon fontSize='large' className='text-white' />
                    <input
                        placeholder='Type the verb...'
                        type="search"
                        id="site-search"
                        name="q"
                        value={searchQuery}
                        onChange={handleSearchQuery}
                        className='mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300'
                    />
                </form>
                <div className=" ">
                    <div className='my-4 h-10'></div>
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
                            <Card key={id} className="p-2 my-4 bg-[#f1f8fd]" sx={{ minWidth: 275 }}>
                                <div className='font-extrabold text-2xl flex gap-3' onClick={() => handlePlay(id)}>
                                    <div>
                                        <Typography className='text-[#2c4772] font-bold' variant="h5" component="div">{id} - {baseForm} / {pastSimple} / {pastParticiple}</Typography>
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
                                        {translate.map((item, index) => (
                                            <label key={index} className='bg-[#3a6cbb] px-3 py-0.4 rounded text-white m-0.5'>{` ${item} `}</label>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <div className='flex gap-2 flex-col'>
                                        <Typography sx={{ mb: 0.1 }} color="text.secondary">
                                            Examples:
                                        </Typography>
                                        {biblicalExamples.map(({ english, spanish }, index) => (
                                            <div className='' key={index}>
                                                <li className='font-bold'> {`${english}`}</li>

                                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                    {spanish}
                                                </Typography>
                                            </div>
                                        ))}
                                        {
                                            examples.map(({ english, spanish }, index) => (
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
        </div>

    )
}

