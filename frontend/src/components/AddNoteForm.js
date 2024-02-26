import React, { useContext, useState } from 'react'
import NoteContext from '../context/Notes/NoteContext';


const AddNoteForm = () => {
     // States variables
     const [notes, setNotes] = useState({ title: "", description: "", tags: "" });

     const context = useContext(NoteContext);

     const { addNotes } = context;

     const { title, description, tags } = notes;

     // AddNotes function
     const handleAddNotes = () => {
          addNotes(title, description, tags);
     };


     // If the values of the input fields will be changed then 
     const handleChange = (e) => {
          setNotes({ ...notes, [e.target.name]: e.target.value });
     };


     return (
          <div className="form-container w-full">
               <div className="form-wrapper my-3 w-full mx-auto flex flex-col gap-1">
                    <div className="form-input">
                         <label id="title" className="tracking-wider leading-7 text-sm text-gray-600">Todo title</label>
                         <input value={title}
                              name="title"
                              type="text"
                              onChange={handleChange}
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="form-input">
                         <label id="description" className="tracking-wider leading-7 text-sm text-gray-600">Todo description</label>
                         <textarea
                              name="description"
                              value={description}
                              onChange={handleChange}
                              className="w-full h-[100px] bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"> </textarea>
                    </div>
                    <div className="form-input">
                         <label id="tags" className="tracking-wider leading-7 text-sm text-gray-600">Todo tag</label>
                         <input
                              name="tags"
                              value={tags}
                              onChange={handleChange}
                              placeholder='...eg #general'
                              type="text"
                              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
               </div>
               <button onClick={handleAddNotes} className="bg-blue-500 hover:bg-blue-600 text-white -tracking-tighter border-0 py-2 px-4 flex items-center focus:outline-none  rounded text-base  md:mt-0">
                    <i className="fa-solid fa-plus mr-1"></i>  Add Todo
               </button>
          </div>
     )
}


export default AddNoteForm
