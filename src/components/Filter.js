import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import { MdDateRange } from "react-icons/md";
import "../components/Style/card.css";
import "../App.css";
import "../components/Style/filter.css";

export default function Filter() {
  const navigate = useNavigate();
  const [content, setContent] = useState([]);

  const [isFilterActive, setIsFilterActive] = useState(false);

  const filterContent = (id) => {
    const storedNote = JSON.parse(sessionStorage.getItem("note"))?.map(
      (data) => {
        if (data.id === id) {
          return { ...data, title: true };
        }
        return data;
      }
    );

    setContent(
      storedNote?.filter((data) => {
        if (data.title) {
        } else {
          return data;
        }
      })
    );

    sessionStorage.setItem("note", JSON.stringify(storedNote));
  };

  useEffect(() => {
    const storedNote = JSON.parse(sessionStorage.getItem("note"));

    let filteredAndSortedContent = storedNote;

    // localeCompare เพื่อให้การเรียงลำดับเป็นตามลำดับอักษร
    if (isFilterActive) {
      filteredAndSortedContent = storedNote
        .filter((data) => data.title)
        .sort((a, b) => a.title.localeCompare(b.title));
    }

    setContent(filteredAndSortedContent);
  }, [isFilterActive]);

  return (
    <div className="flex bg-[#f9fafb]">
      <Navbar />
      <Topbar />
      <div className="container-fluid mx-auto  absolute inset-x-80 inset-y-28 ">
        <button
          className={`button4 border-1 border-[#94a3b8] bg-orange-600 relative ${
            isFilterActive ? "active" : ""
          }`}
          //ทำให้สถานะของปุ่มเปลี่ยนไปตามค่า isFilterActive ใหม่
          onClick={() => setIsFilterActive(!isFilterActive)}
        >
          <span className=" w-24 font-bold text-center text-xl">Filter</span>
        </button>
        <main className="grid grid-cols-6 gap-8 mr-[-19rem] mt-5">
          {content ? (
            content?.map((data, i) => (
              <div className="mt-3 mr-5" key={i}>
                {/* key เพื่อระบุคีย์ของแต่ละ element ในการวนลูป */}
                <div className="card2">
                  <div className="tools2">
                    <div className="circle2">
                      <span className="red2 box2"></span>
                    </div>
                    <div className="circle2">
                      <span className="yellow2 box2"></span>
                    </div>
                    <div className="circle2">
                      <span className="green2 box2"></span>
                    </div>
                  </div>
                  <h1 className="text-[#f8fafc]  ml-5 font-bold text-xl">
                    {data?.title}
                  </h1>
                  <h1 className="font-medium  text-[#f8fafc] mt-2 ml-5">
                    {data?.name}
                  </h1>
                  <p className="font-light text-md mt-3 ml-5 mr-4 text-[#f8fafc]">
                    {data?.body}
                  </p>
                  <div className="w-full flex mt-16 ml-12">
                    <MdDateRange className=" text-xl text-slate-100 mr-2" />
                    <small className="font-extralight  text-[#f8fafc]">
                      {new Date(data?.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </small>
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
