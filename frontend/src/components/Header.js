import { NavLink, Link } from "react-router-dom";
import Logo from "../images/inotebook-logo.jpg"

const Header = () => {

  return (
    <header className="text-gray-600 body-font">

      <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={Logo} className="w-[40px]" />
          <span className="ml-3 text-xl">iNoteBook</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <NavLink to="/addtodo" className="mr-5 cursor-pointer transition hover:text-blue-500">Add Todo</NavLink>
          <NavLink to="/" className="mr-5 cursor-pointer hover:text-blue-500">Home</NavLink>
          <NavLink to="/about" className="mr-5 cursor-pointer transition hover:text-blue-500">About</NavLink>
          <NavLink to="/contact" className="mr-5 cursor-pointer transition hover:text-blue-500">Contact</NavLink>
          <NavLink to="/policy" className="mr-5 cursor-pointer transition hover:text-blue-500">Policy</NavLink>
        </nav>
        <button className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white -tracking-tighter border-0 py-2 px-3 focus:outline-none  rounded text-base mt-4 md:mt-0"> Signup
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>

  )
}

export default Header
