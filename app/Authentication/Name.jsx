import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import UserAPI from '../API/UserAPI';
import LoginLink from './LoginLink';
import mainLayoutFacade from '../utils/mainLayoutFacade';
import { FaUserAlt } from "react-icons/fa"

function Name(props) {
  const layoutFacade = mainLayoutFacade.useFacade();
  const idUser = layoutFacade.idUser;
  const [name, setName] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getDetailData(idUser);
      setName(response.data.fullname);
    };
    fetchData();
  }, []);
  const handleUserNone = () => {
    // hàm này check người dùng đăng nhập chưa
    if (!idUser) {
      return redirect('/signin');
    }
  };

  return (
    <li className="nav-item dropdown show " >
      <button
        className="nav-link dropdown-toggle"
        style={{ cursor: 'pointer' }}
        id="pagesDropdown"
        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
      // id="menu-button" aria-expanded="true" aria-haspopup="true"
      >
        <FaUserAlt className="mr-2 text-gray" />
        {name}
        {/* <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
        </svg> */}
      </button>



      <div className="dropdown-menu mt-3 name-item" aria-labelledby="pagesDropdown">
        <a className="dropdown-item border-0 transition-link" href="/detail-user" onClick={handleUserNone}>
          Thông tin người dùng
        </a>
        <LoginLink />
      </div>
    </li>
  );
}

export default Name;
