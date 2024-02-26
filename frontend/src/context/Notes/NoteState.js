import React, { useState } from "react"


import NoteContext from "./NoteContext";

const NoteState = (props) => {


     const allNotes = [{
          "_id": "65dc8297c417906cce283064",
          "user": "65dc8215c417906cce283062",
          "title": "Going market",
          "description": "Today I have to go market and buy vegetables",
          "tags": "market",
          "date": "2024-02-26T12:22:47.845Z",
          "__v": 0
     }, {
          "_id": "65dc82dfc417906cce283066",
          "user": "65dc8215c417906cce283062",
          "title": "Motivating with itself",
          "description": "Tomarrow is my exam So I have to motivate me for exam ! ",
          "tags": "motivation",
          "date": "2024-02-26T12:23:59.307Z",
          "__v": 0
     },
     {
          "_id": "65dc8297c417906cce283064",
          "user": "65dc8215c417906cce283062",
          "title": "Going market",
          "description": "Today I have to go market and buy vegetables",
          "tags": "market",
          "date": "2024-02-26T12:22:47.845Z",
          "__v": 0
     },
     {
          "_id": "65dc8297c417906cce283064",
          "user": "65dc8215c417906cce283062",
          "title": "Going market",
          "description": "Today I have to go market and buy vegetables",
          "tags": "market",
          "date": "2024-02-26T12:22:47.845Z",
          "__v": 0
     }


     ];

     const [notes, setNotes] = useState(allNotes);

     // Add note 
     const addNotes = (title, description, tags) => {
          // TODO API Call
          const providedNote = {
               "title": title,
               "description": description,
               "tags": tags
          }
          setNotes(notes.concat(providedNote));
     };

     // Delete note 
     const deleteNote = (noteid) => {
          
          const isDelete =  window.confirm(`Are you shure to delete your note ??`)

           if(isDelete){
               const deletedNote = notes.filter((element) => element._id !== noteid)
               setNotes(deletedNote);
          }
     };

     return (
          <NoteContext.Provider value={{ notes, addNotes, deleteNote }}>
               {props.children}
          </NoteContext.Provider >
     );
};


export default NoteState;