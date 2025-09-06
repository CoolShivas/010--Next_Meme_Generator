"use client";

import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [meming, setMeming] = useState([]);
  const [selectedMemes, setSelectedMemes] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const result = await response.json();
      // console.log(result); // // Getting the response in the Browser Console;
      // // // {success: true, data: {…}}
      // // // data: {memes: Array(100)}
      // // // success: true
      // // // [[Prototype]]: Object
      setMeming(result.data.memes);
      setSelectedMemes(result.data.memes[0]);
    };
    fetchApi();
  }, []);

  const handlerOnDropDownMemesImageChanger = (event) => {
    const memesID = event.target.value;
    const memeImage = meming.find((curr) => {
      return curr.id === memesID;
    });
    setSelectedMemes(memeImage);
  };

  return (
    <>
      <div className="container text-center mt-5">
        <h1 className="mb-4 text-primary">Meme Generator</h1>
        {/* Stating of Meme Generator Selection Dropdown */}
        <div className="mb-3">
          <select
            className="form-select"
            onChange={handlerOnDropDownMemesImageChanger}
          >
            {/* <option value="meme">Meme Name 1</option>
            <option value="meme">Meme Name 2</option>
            <option value="meme">Meme Name 3</option> */}

            {meming.map((curElem) => {
              return (
                <option value={curElem.id} key={curElem.id}>
                  {curElem.name}
                </option>
              );
            })}
          </select>
        </div>
        {/* Ending of Meme Generator Selection Dropdown */}

        {/* Stating of Meme Preview */}
        {selectedMemes && (
          <div className="position-relative d-inline-block">
            <img
              src={selectedMemes.url}
              alt="meme image not found"
              className="img-fluid rounded"
              width={400}
              height={400}
            />
          </div>
        )}
        {/* Ending of Meme Preview */}
      </div>
    </>
  );
};

export default HomePage;
