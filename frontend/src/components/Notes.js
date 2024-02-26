import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/Notes/NoteContext';

import NotesItems from "./NotesItems.js"
import AddNoteForm from './AddNoteForm.js';

const Notes = () => {

     const context = useContext(NoteContext);

     const { notes } = context;


     return (
          <div className="notes-container mx-auto w-[95%]">
               <h1 className='mt-4  text-2xl font-semibold'>Add Your Todos</h1>
               <AddNoteForm />
               <h1 className='text-xl mt-10'>You have <span className="font-bold">{notes.length}</span> todos</h1>
               <div className="notes-wrapper  flex md:justify-start w-full mb-5  mt-2 justify-center flex-wrap gap-4">
                    <NotesItems notes={notes} />
               </div>
          </div>
     )
}

export default Notes
