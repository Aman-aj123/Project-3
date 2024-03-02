import React, { useContext, useState, useEffect } from 'react'
import NoteContext from '../context/Notes/NoteContext';

const NotesItems = ({ notes }) => {

     const [mainClass, setMainClass] = useState("none");
     const [noteValue, setNoteValue] = useState({ title: "", description: "", tags: "", id: "" });
     const context = useContext(NoteContext);

     const { title, description, tags, id } = noteValue;
     const { deleteNote, editNote } = context;


     // If the edit button is clicked
     const handleEdit = (editTodo) => {
          setMainClass("flex");
          setNoteValue({ ...editTodo, id: editTodo._id });
     };


     // If the noteValue is chaged then Rereindeer
     useEffect(() => {
          if (noteValue) {
               setNoteValue(prevNotes => ({
                    ...prevNotes,
                    title: title || "",
                    description: description || "",
                    tags: tags || "",
                    id: id || ""
               }));
               console.log(notes);
          }
     }, [notes, id]);

     

     const handleChange = (e) => {
          setNoteValue({ ...noteValue, [e.target.name]: e.target.value });
     };

     const handleCancel = () => {
          setMainClass("none");
     };

     const handleEditClick = () => {
          editNote(title, description, tags, id);
          setMainClass("none");
     };



     return (
          <>

               {/* Edit form  */}
               <div style={{ background: 'rgba(0,0,0,0.4)', display: mainClass }} className="form-main-wrapper fixed top-0 h-screen  w-full left-0 flex justify-center items-center">
                    <div className="form-container bg-white p-3 rounded z-10 md:w-[35%] w-[75%]">
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
                                        className="w-full h-[100px] bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-normal transition-colors duration-200 ease-in-out"> </textarea>
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
                         <div className='btn-wrapper flex w-full gap-1'>
                              <button onClick={handleEditClick}
                                   disabled={!(title?.length >= 5 && description?.length >= 8)}
                                   className={` ${title?.length < 5 || description?.length < 8 ? "opacity-40 cursor-not-allowed" : ""} bg-green-500 hover:bg-green-600 text-white -tracking-tighter border-0 py-2 px-4 flex items-center focus:outline-none  rounded text-base  md:mt-0`}>
                                   Save
                              </button>
                              <button onClick={handleCancel} className=' bg-red-500 hover:bg-red-600 text-white -tracking-tighter border-0 py-2 px-4 flex items-center focus:outline-none  rounded text-base  md:mt-0'>
                                   Cancel</button>
                         </div>
                    </div>
               </div>



               {Array.isArray(notes) && notes.length !== 0 && [...notes].reverse().map((element, index) => (

                    <div key={index} className="notes-items   h-fit border border-gray-200 rounded-sm w-[325px] px-2 py-2">
                         <h4 className="font-semibold  text-black text-xl">{element.title}</h4>
                         <p className="text-gray-800 my-1 w-full leading-5">{element.description}</p>
                         <p className='text-sm text-gray-700' key={index}>{element.tags ? `#${element.tags}` : ""}</p>
                         <div className='btn-wrapper mt-3'>
                              <button onClick={() => handleEdit(element)} className=' cursor-pointer  bg-green-600 py-1 hover:bg-green-700 transition px-2 rounded-sm text-sm tracking-wider text-gray-100'><i className="fa-solid fa-pen-to-square text-sm"></i> Edit</button>
                              <button onClick={() => { deleteNote(element._id) }} className=' cursor-pointer ml-3 bg-red-600 py-1 hover:bg-red-700 transition px-2 rounded-sm text-sm tracking-wider text-gray-100'><i className="fa-solid fa-trash text-sm"></i> Delete</button>
                         </div>

                    </div>
               ))
               }

               {notes && notes.length === 0 &&
                    <div className="empty-container">
                         <img className='w-[80%] md:w-[300px]' src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-3609561-3016826.png?f=webp" />
                    </div>
               }

          </>

     );
};

export default NotesItems;
