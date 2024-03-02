import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../images/inotebook-logo.jpg"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const Header = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("token");

    if (!authToken) {
         navigate("/signup");
    }
}, []);


  const authToken = localStorage.getItem("token");

  const [userDetails, setUserDetails] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/signup");

    toast.error("You have logged out sucessfuly !", {
      position: 'top-center',
      autoClose: 3000
    });
  }

  const fetchUserDetails = async () => {
    try {
      const URL = process.env.REACT_APP_API_BASE_URL;
      const options = {
        method: "POST",
        headers: {
          'auth-token': authToken,
          'Content-Type': 'application/json'
        }
      }
      const data = await fetch(`${URL}/api/user/auth/getuser`, options);
      const response = await data.json();
      setUserDetails(response.findedUser);

    } catch (error) {
      console.log(`Error happens while fetching user with: ${error}`);
    }
  };



  useEffect(() => {
    fetchUserDetails();
  }, [authToken]);


  return (
    <>
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
          {/* buttons  */}
          <div className="btn-container flex justify-center gap-2">
            {!authToken &&
              <>
                <button onClick={() => navigate("/signup")} className="inline-flex items-center px-2 bg-blue-500 hover:bg-blue-600 text-white -tracking-tighter border-0 py-2  selection:focus:outline-none  rounded text-base mt-4 md:mt-0"> Signup
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>

                <button onClick={() => navigate("/login")} className="inline-flex items-center gap-1 px-2 bg-blue-500 hover:bg-blue-600 text-white -tracking-tighter border-0 py-2  focus:outline-none  rounded text-base mt-4 md:mt-0"> Login
                  <i className="fa-solid fa-right-to-bracket"></i>
                </button>
              </>
            } {authToken &&
              <>
                <button onClick={handleLogout} className="inline-flex items-center gap-1 px-2 bg-blue-500 hover:bg-blue-600 text-white -tracking-tighter border-0 py-2  focus:outline-none  rounded text-base mt-4 md:mt-0"> Logout
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
                <div onClick={()=> navigate("/userdetails")} className="rounded-full flex justify-center items-center w-[41px] h-[40px] bg-red-600 hover:bg-red-400 transition">
                  <span className="text-xl cursor-pointer text-white tracking-wider">{userDetails && userDetails.length !== 0 ? userDetails.name[0] : ""}</span>
                </div>
              </>
            }
          </div>

        </div>
      </header>
    </>

  )
}

export default Header
