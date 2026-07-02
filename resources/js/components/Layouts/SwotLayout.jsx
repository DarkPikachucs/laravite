import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const SwotLayout = ({ children = null }) => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['email_first']);

  useEffect(() => {
    document.title = 'SWOT Application';

    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <>
      <div class="flex justify-between items-center px-4 w-auto h-14 bg-purple-900 text-white font-semibold">
        <div class="w-9 h-9 cursor-pointer" onClick={() => window.location.href = "/swot"}>
          <img src="https://web.pcru.ac.th/swot/public/images/swot-logo-2.png" alt="" />
        </div>
        <ul class="list-none flex justify-between items-center">
          {user && <a href="#" class="mr-5 hover:text-gray-300" onClick={() => window.location.href = "/swot"}>
            <li class="list-none" >Dashboard</li>
          </a>
          }
          {user ?
            <a href="#" class="mr-5 hover:text-gray-300" onClick={() => { localStorage.removeItem("user"), setUser(null), removeCookie("email_first"), window.location.href = "/login" }}>
              <li class="list-none" >{user?.name}</li>
            </a>
            :
            <a href="#" class="mr-5 hover:text-gray-300" onClick={() => window.location.href = "/login"}>
              <li class="list-none" >Login</li>
            </a>
          }
          {/*<a href="#" class="mr-5 hover:text-gray-300">
            <li class="list-none">Services</li>
          </a>
          <a href="#" class="mr-5 hover:text-gray-300">
            <li class="list-none">About Us</li>
          </a>
          <a href="#" class="bg-indigo-500 hover:text-indigo-500 hover:bg-white py-1 px-3">
            <li class="list-none">Sign In</li>
          </a>*/}
        </ul>
      </div>

      {children ?? <Outlet />}
    </>
  );
};

export default SwotLayout;
