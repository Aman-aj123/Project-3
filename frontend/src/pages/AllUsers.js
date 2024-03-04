import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import RandomColor from '../components/RandomColor';

const AllUsers = () => {
     const navigate = useNavigate();

     const [usersData, setUsersData] = useState([]);

     const token = localStorage.getItem("token");

     useEffect(() => {
          if (!token) {
               navigate("/signup");
          };
     }, []);

     // Fetching all the users
     const fetchAllUsers = async () => {
          const URL = process.env.REACT_APP_API_BASE_URL;
          const options = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json",
                    "auth-token": token
               }
          };
          
          try{
          const data = await fetch(`${URL}/api/fetchAllUsers`, options);
          const response = await data.json();
          setUsersData(response.users);
          } catch(error){
          console.log(`Error happens while fetching all users with: ${error}`);
          }

     }

     useEffect(() => {
          fetchAllUsers();
     }, []);



     return (
          <div className='users-container my-8'>
               <div className='users-wrapper  w-[80%] mx-auto'>
                    {[...usersData].reverse().map((element, index) => (
                         <div key={index} className="users gap-3 items-center flex mb-4">
                              <div style={{ background: RandomColor() }} className='user-proifle w-[68px] h-[65px] flex justify-center items-center text-2xl text-white rounded-full cursor-pointer hover:opacity-85 transition'>{element?.name[0].toUpperCase()}</div>
                              <h2 className='user-name'>{`${element?.name[0].toUpperCase()}${element?.name.slice(1, element.name.length)}`}</h2>
                         </div>
                    ))}
               </div>
          </div>
     )
}

export default AllUsers
