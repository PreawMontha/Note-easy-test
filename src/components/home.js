import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { BiSolidArchiveIn } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import "../components/Style/card.css";
import "../components/Style/fav.css";
import "../App.css";
import "../components/Style/filter.css";

export default function Home() {
  const navigate = useNavigate();

  const [content, setContent] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);

  //รับพารามิเตอร์ id ระบุข้อมูลที่ต้องการลบ
  const deleteContent = (id) => {
    const newContent = content.filter((data) => {
      if (data.id !== id) {
        return data;
      }
    });
    setContent(newContent);

    sessionStorage.setItem("note", JSON.stringify(newContent));
    alert("Delete Successful");
  };

  const historyContent = (id) => {
    const updatedContent = JSON.parse(sessionStorage?.getItem("note"))?.map(
      (data) => {
        if (data.id === id) {
          return { ...data, history: true };
        }
        return data;
      }
    );
    setContent(
      updatedContent?.filter((data) => {
        if (data.history) {
        } else {
          return data;
        }
      })
    );
    sessionStorage.setItem("note", JSON.stringify(updatedContent));
    alert("Success!");
  };

  useEffect(() => {
    setContent(
      JSON.parse(sessionStorage.getItem("note"))?.filter((data) => {
        if (data.history) {
        } else {
          return data;
        }
      })
    );
  }, []);

  return (
    <div className="flex bg-[#f9fafb]">
      <Navbar />
      <Topbar />
      <div className="container-fluid mx-auto  absolute inset-x-80 inset-y-28 ">
        <h1 className=" text-3xl font-semibold ml-2 mt-2">Note</h1>
        <main className="grid grid-cols-6 gap-8 mr-[-19rem]">
          {content ? (
            content?.map((data, i) => (
              <div className="mt-3 mr-5 " key={i}>
                <div className="card">
                  <div className="tools">
                    <div className="circle mt-[-1rem]">
                      <span className="red box"></span>
                    </div>
                    <div className="circle mt-[-1rem]">
                      <span className="yellow box"></span>
                    </div>
                    <div className="circle mt-[-1rem]">
                      <span className="green box"></span>
                    </div>
                    {/* STAR */}
                    <label
                      className={` ml-24 containerfav ${
                        //เป็น true หรือ false
                        isFilterActive ? "active" : ""
                      }`}
                      onClick={() => setIsFilterActive(!isFilterActive)}
                    >
                      <input type="checkbox" />
                      <svg height="24px" width="24px">
                        <g>
                          <g>
                            <path d="M9.362,9.158c0,0-3.16,0.35-5.268,0.584c-0.19,0.023-0.358,0.15-0.421,0.343s0,0.394,0.14,0.521    c1.566,1.429,3.919,3.569,3.919,3.569c-0.002,0-0.646,3.113-1.074,5.19c-0.036,0.188,0.032,0.387,0.196,0.506    c0.163,0.119,0.373,0.121,0.538,0.028c1.844-1.048,4.606-2.624,4.606-2.624s2.763,1.576,4.604,2.625    c0.168,0.092,0.378,0.09,0.541-0.029c0.164-0.119,0.232-0.318,0.195-0.505c-0.428-2.078-1.071-5.191-1.071-5.191    s2.353-2.14,3.919-3.566c0.14-0.131,0.202-0.332,0.14-0.524s-0.23-0.319-0.42-0.341c-2.108-0.236-5.269-0.586-5.269-0.586    s-1.31-2.898-2.183-4.83c-0.082-0.173-0.254-0.294-0.456-0.294s-0.375,0.122-0.453,0.294C10.671,6.26,9.362,9.158,9.362,9.158z"></path>
                          </g>
                        </g>
                      </svg>
                    </label>
                  </div>
                  <h1 className="text-[#f8fafc] mt-[-1rem] ml-5 font-bold text-xl">
                    {data?.title}
                  </h1>
                  <h1 className="font-medium  text-[#f8fafc] mt-2 ml-5">
                    {data?.name}
                  </h1>
                  <p className="font-light text-md mt-3 ml-5 mr-4 text-[#f8fafc]">
                    {data?.body}
                  </p>

                  <div className="w-full flex  mt-12 ml-5">
                    <MdDateRange className=" text-xl text-slate-100 mr-2 " />
                    <small className=" font-semibold text-[#f8fafc]">
                      {new Date(data?.createdAt).toLocaleString("th-TH", {})}
                    </small>
                    <div className="icons flex gap-3 mr-8 mt-5">
                      <RiDeleteBin5Fill
                        className=" text-slate-100 hover:text-red-600 hover:cursor-pointer"
                        onClick={() => deleteContent(data?.id)}
                      />
                      <BiSolidArchiveIn
                        className="  text-slate-100 hover:text-lime-500 hover:cursor-pointer"
                        onClick={() => historyContent(data?.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1></h1>
          )}
        </main>
      </div>
    </div>
  );
}
