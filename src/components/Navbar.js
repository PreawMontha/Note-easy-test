import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BsFillArrowLeftSquareFill, BsChevronDown } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { IoFilterCircleSharp } from "react-icons/io5";

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const Menus = [
    { title: "Dashboard", navigate: "/" },
    { title: "Filter", icon: <IoFilterCircleSharp />, navigate: "/filter" },
    {
      title: "Categories",
      icon: <MdCategory />,
      //submenu: ค่าบอกว่ามีเมนูย่อยหรือไม่ (ในกรณีนี้มี)
      submenu: true,
      submenuItems: [
        { title: "Marketing/Branding/PR" },
        { title: "Government Agency" },
        { title: "Investment Bank" },
        { title: "Publisher" },
        { title: "School/University" },
      ],
    },
    {
      title: "History",
      icon: <AiOutlineHistory />,
      navigate: "/history",
    },
  ];

  return (
    <div className="flex">
      <div
        className={`bg-[#e0f2fe] h-screen p-5 pt-8 relative ${
          open ? "w-72" : "w-20"
        } duration-300`}
      >
        <BsFillArrowLeftSquareFill
          className={`text-[#1d4ed8] text-3xl rounded-full absolute -right-3 
          top-9 cursor-pointer  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <img
            src="/images/icon/notebook.png"
            width={50}
            height={50}
            className={`rounded cursor-pointer block float-left mr-3 ${
              !open && "w-10 h-10"
            }`}
          />
          <h1
            className={`font-bold origin-left text-2xl duration-300 pt-2 ${
              !open && "scale-0"
            }`}
          >
            Note Easy
          </h1>
        </div>
        <br />
        <br />
        <hr />
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`font-semibold items-center cursor-pointer p-2 hover:bg-light-white rounded-md mt-5 ml-7 mr-9 ${
                !open && "relative left-[-2rem] m-10 "
              }`}
              onClick={() => navigate(menu.navigate)}
            >
              <span
                className={`text-2xl block float-left mr-5 hover:text-red-700 `}
              >
                {menu.icon ? menu.icon : <RiDashboardFill />}
              </span>
              <span
                className={`text-base font-semibold flex-1 duration-300 ${
                  !open && "hidden"
                }`}
              >
                {menu.title}
              </span>
              {menu.submenu && open && (
                <BsChevronDown
                  className={` ${
                    submenuOpen && "rotate-180"
                  } ml-[9rem] mt-[-1rem] ${!open && "hidden"}`}
                  onClick={() => setSubmenuOpen(!submenuOpen)}
                />
              )}

              {menu.submenu && submenuOpen && open && (
                <ul>
                  {menu.submenuItems.map((submenuItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="text-sm flex items-center gap-x-4 cursor-pointer p-3 px-2 hover:bg-light-nor rounded-md mt-6"
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
