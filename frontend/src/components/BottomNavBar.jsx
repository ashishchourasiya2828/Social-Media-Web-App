import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const BottomNavBar = () => {

      const [isActiveforBgChange, setisActiveforBgChange] = useState("home");
    

    const onClickOnIcon = (background) => {
        setisActiveforBgChange(background);
      };

  return (
    <div>
          <div className="w-full bg-zinc-200 rounded-lg border-2 flex items-center justify-between  px-12 h-fit py-2 fixed bottom-0 left-0 z-9">
        <div>
          {" "}
          <Link to="/home" className="text-gray-900 hover:text-gray-800">
            <i
              onClick={() => {
                onClickOnIcon("home");
              }}
              className={` text-xl p-2  ${
                isActiveforBgChange === "home"
                  ? "bg-zinc-700 text-zinc-200 rounded-full "
                  : "bg-transparent"
              } font-bold ri-home-line`}
            ></i>
          </Link>
        </div>
        <div>
          <Link className="text-gray-900 hover:text-gray-800" to="/create-post">
            <i
              onClick={() => {
                onClickOnIcon("addPost");
              }}
              className={`text-2xl   ${
                isActiveforBgChange === "addPost"
                  ? "bg-zinc-700 text-zinc-200 rounded-full "
                  : "bg-transparent"
              } font-bold ri-add-line`}
            ></i>
          </Link>
        </div>
        <div>
          {" "}
          <Link to="/profile" className="text-gray-900 hover:text-gray-800">
            <i
              onClick={() => {
                onClickOnIcon("userProfile");
              }}
              className={` text-xl p-2  ${
                isActiveforBgChange === "userProfile"
                  ? "bg-zinc-700 text-zinc-200 rounded-full "
                  : "bg-transparent"
              } font-bold ri-user-line`}
            ></i>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BottomNavBar