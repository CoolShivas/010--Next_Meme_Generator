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
      <center>
        <h1>Meme Generator</h1>
      </center>
    </>
  );
};

export default HomePage;
