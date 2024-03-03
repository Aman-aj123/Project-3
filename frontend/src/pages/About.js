import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const About = () => {
     const navigate = useNavigate();
     const token = localStorage.getItem("token");
     useEffect(() => {
          if (!token) {
               navigate("/signup");
          }
     }, []);

     return (
          <div className="my-5 w-[85%] mx-auto">
               <h1 className='text-3xl font-semibold'>About Our iNotebook</h1>
               <div className='info-wrapper w-full mt-3'>
                    <div className='w-full mt-3 info-items'>
                         <h2 className='font-semibold'>1. Privacy Policy</h2>
                         <p>
                              Certainly! Here are some text suggestions for your policy page:
                              Privacy Policy:
                              We value your privacy and are committed to protecting your personal information. Our privacy policy outlines how we collect, use, and safeguard your data. By using our service, you agree to our privacy practices.</p>
                    </div>
                    <div className='w-full mt-3 info-items'>
                         <h2 className='font-semibold'>2. Terms of Service:</h2>
                         <p>
                              These terms govern your use of our Todo application. By accessing or using the service, you agree to abide by these terms. Please read them carefully before proceeding.</p>
                    </div>
                    <div className='w-full mt-3 info-items'>
                         <h2 className='font-semibold'>3. Data Collection</h2>
                         <p>
                              We collect certain information when you use our Todo application, including user-generated content and usage data. This information helps us improve our service and provide a better experience for our users.                         </p>
                    </div>
                    <div className='w-full mt-3 info-items'>
                         <h2 className='font-semibold'>4. User Accounts</h2>
                         <p>
                              Each user account is password-protected and only accessible to the account holder. We recommend choosing a strong password and not sharing your account credentials with others.
                         </p>
                    </div>
                    <div className='w-full mt-3 info-items'>
                         <h2 className='font-semibold'>5. Security Measures</h2>
                         <p>
                              We implement industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.                         </p>
                    </div>
               </div>

          </div>
     )
}

export default About
