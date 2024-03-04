import React, { useState, useEffect } from 'react'
import RandomColor from "../components/RandomColor"

const Userdetails = () => {
     document.title = "iNotebook - User details";

     const authToken = localStorage.getItem("token");

     const [userDetails, setUserDetails] = useState("");
     const [randomColor, setRandomColor] = useState("");


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



     const getRandomColor = () => {
          const genRandomColor = RandomColor();
          setRandomColor(genRandomColor);
     }

     useEffect(() => {
          getRandomColor();
     }, []);

     return (
          <div className="userdetails-wrapper w-[90%] mx-auto">
               <div style={{ background: randomColor }} className="rounded-full flex justify-center items-center w-[140px] h-[140px] hover:opacity-75 transition my-4">
                    <span className="text-6xl cursor-pointer text-white tracking-wider">{userDetails && userDetails.length !== 0 ? userDetails?.name[0].toUpperCase() : ""}</span>
               </div>
               <div className="user-info">
                    <h1 className="mb-1 font-semibold">Username - <span className='ml-3 font-normal'>{userDetails && `${userDetails?.name[0].toUpperCase()}${userDetails?.name.slice(1, userDetails?.name.length)}`}</span></h1>
                    <h1 className="mb-1 font-semibold">Email - <span className='ml-3 font-normal'>{userDetails && userDetails?.email}</span></h1>
                    <h1 className="mb-1 font-semibold">User Id - <span className='ml-3 font-normal'>{userDetails && userDetails?._id}</span></h1>
                    <h1 className='font-semibold'>Account created   - <span className='ml-3 font-normal'>{userDetails && new Date(userDetails?.date).toLocaleString()}</span></h1>
               </div>
          </div>
     )
}

export default Userdetails
