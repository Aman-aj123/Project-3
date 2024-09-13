import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Packages 
import Swal from 'sweetalert2'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
     document.title = "iNotebook - Signup";
     const navigate = useNavigate();

     const [creditionals, setCreditionals] = useState({ name: "", email: "", password: "" });
     const [loading, setLoading] = useState(false);
     const { name, email, password } = creditionals;
     

     const handleChange = (e) => {
          setCreditionals({ ...creditionals, [e.target.name]: e.target.value });
     };


     const handleSubmit = async (e) => {
          e.preventDefault();
          setLoading(true);

          const URL = process.env.REACT_APP_API_BASE_URL;
          const options = {
               method: "POST",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify({ name, email, password })
          };

          try {
               const response = await fetch(`${URL}/api/user/auth/signup`, options);
               const data = await response.json();
               setLoading(false);
               if (data.sucess) {
                 
                    navigate("/");
                    localStorage.setItem("token", data.authToken);

                    toast.success(" Your account has been created sucessfuly !", {
                         position: 'top-center',
                         autoClose: 800
                    });
                    setTimeout(() => {
                         window.location.reload();
                    }, 1000);


               } else{
                    toast.error("User already exists !", {
                         position: 'top-center',
                         autoClose: 3000
                    })
               }

          } catch (error) {
               toast.error("Some error occurs while Signup !", {
                    position: 'top-center',
                    autoClose: 3000
               })

               console.error("Error happens while sign up:", error);
          }
     };





     return (
          <section className="bg-gray-50 dark:bg-gray-900 my-5">
               <div className="flex flex-col items-center justify-center px-6 py-5 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                         <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                   Create and account to continue
                              </h1>
                              <form onSubmit={handleSubmit} className="md:space-y-3" action="#">
                                   <div>
                                        <label htmlFor="name" className="tracking-wider block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                        <input value={name} onChange={handleChange} minLength={7} maxLength={20} type="name" name="name" id="name" className="bg-gray-50 border h-[40px] border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required={true} />
                                   </div>
                                   <div>
                                        <label htmlFor="email" className="tracking-wider block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input value={email} onChange={handleChange} type="email" name="email" id="email" className="bg-gray-50 border h-[40px] border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required={true} />
                                   </div>
                                   <div>
                                        <label htmlFor="password" className="tracking-wider block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                        <input value={password} onChange={handleChange} minLength={8} maxLength={20} type="password" name="password" id="password" className="bg-gray-50 border h-[40px] border-gray-300 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full  focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" required={true} />
                                   </div>

                                   <div className="flex items-start mt-1">
                                        <div className="flex items-center h-5">
                                             <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div className="ml-3 text-sm">
                                             <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to="#">Terms and Conditions</Link></label>
                                        </div>
                                   </div>
                                   <button className="w-full text-white bg-blue-500 hover:bg-blue-600 my-3 tracking-wider  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800">{!loading &&"Submit"} {loading && "Creating account..."}</button>
                                   <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                   </p>
                              </form>
                         </div>
                    </div>
               </div>
          </section>
     )
}

export default Signup
