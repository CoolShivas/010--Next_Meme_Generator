"use client";

import React, { useEffect } from "react";

const HomePage = () => {
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const result = await response.json();
      console.log(result); // // Getting the response in the Browser Console;
      // // // {success: true, data: {…}}
      // // // data: {memes: Array(100)}
      // // // success: true
      // // // [[Prototype]]: Object
    };
    fetchApi();
  }, []);

  return (
    <>
      <div className="container text-center mt-5">
        <h1 className="mb-4 text-primary">Meme Generator</h1>
        {/* Stating of Meme Generator Selection Dropdown */}
        <div className="mb-3">
          <select className="form-select">
            <option value="meme">Meme Name 1</option>
            <option value="meme">Meme Name 2</option>
            <option value="meme">Meme Name 3</option>
          </select>
        </div>
        {/* Ending of Meme Generator Selection Dropdown */}
      </div>
    </>
  );
};

export default HomePage;
