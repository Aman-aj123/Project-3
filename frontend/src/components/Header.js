import React, { useContext, useEffect, useState } from 'react'

// Files 
import NoteContext from "../context/Notes/NoteContext";

const Header = () => {
  const State = useContext(NoteContext);

  useEffect(() => {
    State.updateNum(1);
  }, [State.number]);




  return (
    <div>
      <h1>I am header section.. ! the number is {State.number}  </h1>
    </div>
  )
}

export default Header
