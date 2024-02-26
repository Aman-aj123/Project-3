import React, { useContext } from 'react'
import NoteContext from '../context/Notes/NoteContext';

const NotesItems = ({ notes }) => {

     const context = useContext(NoteContext);

     const { deleteNote } = context;



     return (

          <>
               {[...notes].reverse()?.map((element, index) => (

                    <div key={index} className="notes-items border border-gray-200 rounded-sm w-[325px] px-2 py-2">
                         <h4 className="font-semibold  text-black text-xl">{element.title}</h4>
                         <p className="text-gray-800 my-1 w-full leading-5">{element.description}</p>
                         <p className='text-sm text-gray-700' key={index}># {element.tags}</p>
                         <div className='btn-wrapper mt-3'>
                              <button className=' cursor-pointer  bg-green-600 py-1 hover:bg-green-700 transition px-2 rounded-sm text-sm tracking-wider text-gray-100'><i className="fa-solid fa-pen-to-square text-sm"></i> Edit</button>
                              <button onClick={() => { deleteNote(element._id) }} className=' cursor-pointer ml-3 bg-red-600 py-1 hover:bg-red-700 transition px-2 rounded-sm text-sm tracking-wider text-gray-100'><i className="fa-solid fa-trash text-sm"></i> Delete</button>
                         </div>

                    </div >
               ))
               }

          </>

     );
}

export default NotesItems;
