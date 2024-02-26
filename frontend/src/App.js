import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

//---> Files 
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

import NoteState from "./context/Notes/NoteState";

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
