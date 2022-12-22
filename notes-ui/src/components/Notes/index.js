import React from "react";
import { EditIcon, DeleteIcon } from "../icons/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import {Link} from 'react-router-dom'

export default function Index({ notes, setNote, setShowModal, setDeleteNote, deleteNote }) {

  const notify = (res) => toast(res);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/note/${id}`).then(res => {
      notify("Note  Deleted successfully");
      setDeleteNote(!deleteNote)

    }).catch(error => {
      notify("Something wronge happens")

    })

  };

  const handleEdit = (user) => {
    setNote(user)
    setShowModal(true);
  };

  return (
    <div className="my-5">
      <table className="w-full border-collapse border border-gray-300">
        <tbody>
          {notes?.map((note, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-3">
                <div className="">
                  <div className="flex-bw text-2xl">
                    <Link to={`/${note.id}`}>
                    <p className="capitalize font-semibold">
                      {note.title}
                    </p>
                    </Link>

                    <div className="flex space-x-4">
                    <button title="Edit" onClick={() => handleEdit(note)}>
                      <EditIcon />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => handleDelete(note.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                  </div>
                    <div className="flex items-center">
                      <p className="text-gray-400 text-lg text-justify mt-2">
                        {note.description}
                      </p>
                    </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer
        toastStyle={{ backgroundColor: "#22c55e", color: "#ffff" }}
      />
    </div>
  );
}
