import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

//---> Files 
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"

import NoteState from "./context/Notes/NoteState";
import Header from "./components/Header";
import AddNoteForm from "./components/AddNoteForm";
import Signup from "./components/Signup";
import Login from "./components/Login"
import Userdetails from "./pages/Userdetails";
import About from "./pages/About";
import AllUsers from "./pages/AllUsers";

function App() {
console.log(`Name is: ${process.env.REACT_APP_AMAN}`);

  return (
    <NoteState>
      <BrowserRouter>
        <Header />
        <Routes>

          <Route exact path="/" element={<Home />} />
          <Route exact path="/addtodo" element={<AddNoteForm />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/userdetails" element={<Userdetails />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/users" element={<AllUsers />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
