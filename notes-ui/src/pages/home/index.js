import React, { useState, useEffect } from 'react'
import Notes from '../../components/Notes'
import FormModal from '../../components/modal/Form'
import axios from 'axios'


const Index = () => {
    const [showModal, setShowModal] = useState(false);
    const [note, setNote] = useState(null)
    const [notes, setNotes] = useState([])
    const [deleteNote, setDeleteNote] = useState(false)

    useEffect(() => {

        axios.get('http://localhost:8000/').then(res => {
            setNotes(res.data)
        }).catch(err => {
            console.warn("Something wronge happens")
        })


    }, [showModal, deleteNote])

    return (
        <div>

            {/* notes */}
            <div className="flex-bw">
                <p className='text-3xl font-semibold'>Notes</p>
                <button className='btn text-white bg-blue-500 hover:bg-blue-600' onClick={() => setShowModal(true)}>+ Add Note</button>
            </div>
            {
            }
            <Notes notes={notes} setNote={setNote} setShowModal={setShowModal} deleteNote={deleteNote} setDeleteNote={setDeleteNote} />
            {
                showModal && <FormModal setShowModal={setShowModal} note={note} notes={notes} setNote={setNote} />
            }

        </div>
    )
}

export default Index
