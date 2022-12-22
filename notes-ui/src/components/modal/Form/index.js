import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from 'axios';

import { useFormik } from "formik";
import { schema } from "./schema";

export default function Index({ setShowModal, note, setNote }) {
  const notify = (res) => toast(res);

  useEffect(() => {

  }, []);

  const handleSubmit = () => {
    const data = {
      title: formik.values.title.toLowerCase(),
      description: formik.values.description.toLowerCase(),
    };


    if (note?.id) {
      axios.put(`http://localhost:8000/note/${note.id}`, data).then(res=>{
        notify("Note updated successfully");
      }).catch(error=>{
        notify("Something wronge happens");
      })

    } else {
      axios.post(`http://localhost:8000/note`, data)
      .then(res=>{
        notify("Note added successfully");
      }).catch(error=>{
        notify("Something wronge happens");
      })

    }

    setShowModal(false)
    setNote(null)
  };

  const formik = useFormik({
    initialValues: {
      title: `${note ? note.title : ""}`,
      description: `${note ? note.description : ""}`,
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  const handleCancel = () => {
    setNote(null)
    setShowModal(false);
  };



  return (
    <div
      data-testid="noteModal"
      className={`modal fade fixed top-0 left-0 w-full h-full outline-none overflow-x-hidden overflow-y-auto  flex justify-center items-center `}
      style={{ backgroundColor: "rgba(0,0,0,.8)" }}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className=" bg-gray-200 p-5 space-y-5 w-96 rounded-lg">
          <div>
            <label htmlFor="title">Note Title</label>
            <input
              id="title"
              type="text"
              {...formik.getFieldProps("title")}
              className="px-3 py-2 w-full rounded-md"
              placeholder="Enter Title"
            />

            {formik.touched.title && formik.errors.title ? (
              <div className="text-red-500">*{formik.errors.title}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              {...formik.getFieldProps("description")}
              className="px-3 py-2 w-full rounded-md"
            />

            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500">*{formik.errors.description}</div>
            ) : null}
          </div>

          <div className="flex justify-between">
            <input
              type="submit"
              value="submit"
              className="btn bg-indigo-500 text-white hover:bg-indigo-600"
            />
            <button
              className="btn bg-gray-400 hover:bg-gray-500"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <ToastContainer
        toastStyle={{ backgroundColor: "#22c55e", color: "#ffff" }}
      />
    </div>
  );
}
