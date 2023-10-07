import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/lock.css";
import "../Style/add.css";

import Navbar from "../Navbar";

export default function AddNote() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [name, setName] = useState("");

  const [history, setHistory] = useState(false);

  //insert data
  const handleSubmit = () => {
    const existingNoteData = sessionStorage.getItem("note");
    const noteData = existingNoteData ? JSON.parse(existingNoteData) : [];

    const newData = {
      id: title
        .toLowerCase() // แปลงเป็นตัวอักษรเล็กทั้งหมด
        .replace(/[^a-z0-9]+/g, "-") // แทนที่อักขระที่ไม่ใช่ a-z หรือ 0-9 ด้วย "-"
        // ลบ - หน้าหลัง
        .replace(/^-+|-+$/g, "")
        //ลบช่องว่าง
        .trim(),
      title: title,
      body: body,
      history: history,
      name: name,
      createdAt: new Date(),
    };
    noteData.push(newData);

    try {
      sessionStorage.setItem("note", JSON.stringify(noteData));
      alert("Add Success !");
      navigate("/");
    } catch {
      alert("Error");
    }
  };

  return (
    <>
      <div className="flex">
        <Navbar />
        <main className="container mx-auto mt-10">
          <div className="abdolute inset-x-7 mb-5">
            <div className="flex justify-center items-center mb-4">
              <h1 className="font-semibold text-3xl">Add Note</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title" className="block text-gray-800">
                  Title
                </label>
                <input
                  type="text"
                  className="border outline-none w-full px-3 py-2 mt-2"
                  value={title}
                  onChange={(e) => {
                    if (title.length < 50) {
                      setTitle(e.target.value);
                    }
                  }}
                />
                <label htmlFor="title" className="block text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="border outline-none w-full px-3 py-2 mt-2"
                  value={name}
                  onChange={(e) => {
                    if (name.length < 50) {
                      setName(e.target.value);
                    }
                  }}
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="body" className="block text-gray-800">
                  Details
                </label>
                <textarea
                  rows="8"
                  className="border outline-none w-full px-3 py-2 mt-2"
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
              <label htmlFor="title" className="block text-gray-800">
                Categories
              </label>
              <select
                type="text"
                className="border outline-none w-full px-3 py-2 mt-2"
              >
                <option>Marketing/Branding/PR</option>

                <option>Government Agency</option>

                <option>Investment Bank</option>

                <option>Publisher</option>

                <option>School/University</option>
              </select>
              <div className="form-group gap-3 flex mt-3 checkbox-wrapper">
                <label htmlFor="history" className="text-gray-800 mt-2">
                  History
                </label>
                <input
                  type="checkbox"
                  id="check1-61"
                  value={history}
                  className="check"
                  onChange={(e) => {
                    setHistory(e.target.checked);
                    console.log(history);
                  }}
                />
                <label className="label" htmlFor="check1-61">
                  <svg width="45" height="45" viewBox="0 0 95 95">
                    <rect
                      x="30"
                      y="20"
                      width="50"
                      height="50"
                      stroke="black"
                      fill="none"
                    ></rect>
                    <g transform="translate(0,-952.36222)">
                      <path
                        d="m 56,963 c -102,122 6,9 7,9 17,-5 -66,69 -38,52 122,-77 -7,14 18,4 29,-11 45,-43 23,-4"
                        stroke="black"
                        strokeWidth="3"
                        fill="none"
                        className="path1"
                      ></path>
                    </g>
                  </svg>
                </label>
              </div>
              <button
                className="bg-[#2563eb] px-4 py-2 rounded-lg mt-3 button1"
                type="submit"
              >
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span>Add</span>
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
