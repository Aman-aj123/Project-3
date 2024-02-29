import { BrowserRouter, Routes, Route } from "react-router-dom";

//---> Files 
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

import NoteState from "./context/Notes/NoteState";
import Header from "./components/Header";
import AddNoteForm from "./components/AddNoteForm";

function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <Header />
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/addtodo" element={<AddNoteForm />}></Route>

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
