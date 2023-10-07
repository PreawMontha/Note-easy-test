import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Navbar from "../components/Navbar";

import { BiSolidArchiveOut } from "react-icons/bi";
import { MdDateRange } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();

  const [content, setContent] = useState([]);

  const deleteContent = (id) => {
    const newContent = JSON.parse(sessionStorage?.getItem("note"))?.filter(
      (data) => {
        if (data?.id !== id) {
          return data;
        }
      }
    );
    setContent(
      newContent?.filter((data) => {
        if (data.history) {
          return data;
        }
      })
    );
    sessionStorage.setItem("note", JSON.stringify(newContent));
    alert("Successfully deleted");
  };

  const unhistoryContent = (id) => {
    const updatedContent = JSON.parse(sessionStorage?.getItem("note"))?.map(
      (data) => {
        if (data.id === id) {
          return { ...data, history: false };
        }
        return data;
      }
    );
    setContent(
      updatedContent?.filter((data) => {
        if (data.history) {
          return data;
        }
      })
    );
    sessionStorage.setItem("note", JSON.stringify(updatedContent));

    alert("Success");
  };

  useEffect(() => {
    setContent(
      JSON.parse(sessionStorage.getItem("note"))?.filter((data) => {
        if (data.history) {
          return data;
        }
      })
    );
  }, []);

  return (
    <div className="flex bg-[#f9fafb]">
      <Navbar />
      <Topbar />
      <div className="container absolute  inset-x-72 inset-y-32">
        <h1 className=" text-3xl font-semibold ml-8">History</h1>
        <main className="grid grid-cols-6 gap-8 mr-[-19rem]">
          {content ? (
            content?.map((data, i) => (
              <div className="mt-3 mr-5" key={i}>
                <div className="card">
                  <div className="tools">
                    <div className="circle">
                      <span className="red box"></span>
                    </div>
                    <div className="circle">
                      <span className="yellow box"></span>
                    </div>
                    <div className="circle">
                      <span className="green box"></span>
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
                      <BiSolidArchiveOut
                        className="  text-slate-100 hover:text-yellow-300 hover:cursor-pointer"
                        onClick={() => unhistoryContent(data?.id)}
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
