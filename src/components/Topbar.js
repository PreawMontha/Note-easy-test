// อาจจะต้อง import useState และ useEffect ถ้ายังไม่ได้ import
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import "../App.css";

const Topbar = () => {
  const [isFilterActive, setIsFilterActive] = useState(false);

  const [content, setContent] = useState([]);

  const navigate = useNavigate();

  return (
    <div className="container-fluid mx-auto">
      <div className="p-7 mt-6 px-7 py-2 grid grid-cols-5">
        <div>
          <h1 className="text-3xl font-semibold ">My Notes</h1>
        </div>
        <div className="search absolute inset-x-[10rem]">
          <input placeholder="Search" type="text" />
        </div>

        <div>
          <button
            className="button relative  right-5 left-96"
            onClick={() => navigate("/add-note")}
          >
            <IoIosAddCircle className="text-3xl text-[#ffffff] " />
            <span className="lable">NewNote</span>
          </button>
        </div>
        <div className="relative right-6 left-80">
          <div className="text-[#020617] font-semibold absolute right-5 left-19 mr-9 ">
            <CgProfile className="text-3xl absolute right-20 mr-3" />
            Hi Montha !
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-10"></div>
    </div>
  );
};
export default Topbar;
