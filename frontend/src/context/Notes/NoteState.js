import React, { useState } from "react"


import NoteContext from "./NoteContext";

const NoteState = (props) => {

     const [number, setNumber] = useState(0);

     const updateNum = (delay) => {
          setTimeout(() => {
               setNumber(number + 1);
          }, delay * 1000)
     };


     return (
          <NoteContext.Provider value={{ number, updateNum }}>
               {props.children}
          </NoteContext.Provider >
     );
};


export default NoteState;