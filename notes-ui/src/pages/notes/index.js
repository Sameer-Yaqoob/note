import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'

const Index = () => {
    const [note, setNote] = useState(null)
    const { id } = useParams();
    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/note/${id}`).then(res => {
                setNote(res.data)
            }).catch(err => {
                console.warn("Something wronge happens")
            })
        }
    }, [id])

    return (
        <div>
            {
                note && <div className='flex-bw'>
                    <h1 className='capitalize font-semibold text-2xl text-indigo-500 my-8'>{note.title}</h1>

                    <Link to={'/'}>
                        <button className='btn bg-gray-200 hover:bg-black hover:text-white'>&#11164; Home</button>
                    </Link>
                </div>
            }
            {
                note && <p className='text-justify'>{note.description}</p>
            }
        </div>
    )
}

export default Index
