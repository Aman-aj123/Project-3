import React, { useState, useEffect } from "react";

const Userdetails = () => {
  document.title = "iNotebook - User details";

  const authToken = localStorage.getItem("token");

  const [userDetails, setUserDetails] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [mainClass, setMainClass] = useState("none");
  const { name, email, password } = userInfo;

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const fetchUserDetails = async () => {
    try {
      const URL = process.env.REACT_APP_API_BASE_URL;
      const options = {
        method: "POST",
        headers: {
          "auth-token": authToken,
          "Content-Type": "application/json",
        },
      };
      const data = await fetch(`${URL}/api/user/auth/getuser`, options);
      const response = await data.json();
      setUserDetails(response.findedUser);
    } catch (error) {
      console.log(`Error happens while fetching user with: ${error}`);
    }
  };

  const handleSaveClick = () => {
    setMainClass("none");
  };

  const handleCancel = async() => {

     // Hiding the edit menu
    setMainClass("none");
  };

  const handleEditClick = () => {
    setMainClass("flex");
    console.log(mainClass)
  };

  useEffect(() => {
    fetchUserDetails();
  }, [authToken]);

  return (
    <>
      {/* Edit form  */}
      <div
        style={{ background: "rgba(0,0,0,0.4)", display: mainClass }}
        className="form-main-wrapper fixed top-0 h-screen  w-full left-0 flex justify-center items-center"
      >
        <div className="form-container bg-white p-3 rounded z-10 md:w-[35%] w-[75%]">
          <div className="form-wrapper my-3 w-full mx-auto flex flex-col gap-1">
            <div className="form-input">
              <input
                placeholder="Username..."
                value={userDetails?.name}
                name="name"
                type="text"
                onChange={handleChange}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="form-input">
              <input
                placeholder="Email..."
                value={userDetails?.email}
                name="email"
                type="email"
                onChange={handleChange}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="form-input">
              <input
                placeholder="Password..."
                value={userDetails?.password}
                name="password"
                type="email"
                onChange={handleChange}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-transparent focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="btn-wrapper flex w-full gap-1">
            <button
              onClick={handleSaveClick}
              disabled={!(password?.length >= 7 && name?.length >= 7)}
              className={` ${
                name?.length < 7 || password?.length < 7
                  ? "opacity-40 cursor-not-allowed"
                  : ""
              } bg-green-500 hover:bg-green-600 text-white -tracking-tighter border-0 py-2 px-4 flex items-center focus:outline-none  rounded text-base  md:mt-0`}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className=" bg-red-500 hover:bg-red-600 text-white -tracking-tighter border-0 py-2 px-4 flex items-center focus:outline-none  rounded text-base  md:mt-0"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* User details  */}
      <div className="userdetails-wrapper w-[90%] mx-auto">
        <div
          style={{ background: userDetails && `${userDetails.profile.color}` }}
          className="rounded-full flex justify-center items-center w-[140px] h-[140px] hover:opacity-75 transition my-4"
        >
          <span className="text-6xl cursor-pointer text-white tracking-wider">
            {userDetails && userDetails.length !== 0
              ? userDetails?.name[0].toUpperCase()
              : ""}
          </span>
        </div>
        <button
          onClick={handleEditClick}
          className="my-2 py-2 px-7 bg-green-200 rounded cursor-pointer tracking-wide font-bold hover:bg-green-400 transition"
        >
          Edit
        </button>
        <div className="user-info">
          <h1 className="mb-1 font-semibold">
            Username -{" "}
            <span className="ml-3 font-normal">
              {userDetails &&
                `${userDetails?.name[0].toUpperCase()}${userDetails?.name.slice(
                  1,
                  userDetails?.name.length
                )}`}
            </span>
          </h1>
          <h1 className="mb-1 font-semibold">
            Email -{" "}
            <span className="ml-3 font-normal">
              {userDetails && userDetails?.email}
            </span>
          </h1>
          <h1 className="mb-1 font-semibold">
            User Id -{" "}
            <span className="ml-3 font-normal">
              {userDetails && userDetails?._id}
            </span>
          </h1>
          <h1 className="font-semibold">
            Account created -{" "}
            <span className="ml-3 font-normal">
              {userDetails && new Date(userDetails?.date).toLocaleString()}
            </span>
          </h1>
        </div>
      </div>
    </>
  );
};

export default Userdetails;
