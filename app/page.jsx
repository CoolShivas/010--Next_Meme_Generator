"use client";

import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [meming, setMeming] = useState([]);
  const [selectedMemes, setSelectedMemes] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

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

  const downloadMemes = () => {
    if (!selectedMemes) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    (img.crossOrigin = "anonymous"), (img.src = selectedMemes.url);

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Text Styling
      ctx.font = "bold 70px black";
      ctx.fillStyle = "black";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.textAlign = "center";

      // Top Text
      ctx.strokeText(topText.toUpperCase(), canvas.width - 350, 300);
      ctx.fillText(topText.toUpperCase(), canvas.width - 350, 300);

      // Bottom Text
      ctx.strokeText(
        bottomText.toUpperCase(),
        canvas.width - 350,
        canvas.height - 200
      );
      ctx.fillText(
        bottomText.toUpperCase(),
        canvas.width - 350,
        canvas.height - 200
      );

      // convert to image and trigger download
      const link = document.createElement("a");
      link.download = "meme.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
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
            <p className="position-absolute top-0 start-50 translate-middle-x text-white fw-bold fs-4">
              {topText}
            </p>
            <p className="position-absolute bottom-0 start-50 translate-middle-x text-white fw-bold fs-4">
              {bottomText}
            </p>
          </div>
        )}
        {/* Ending of Meme Preview */}

        {/* Starting of Input Fields for text on meme image */}
        <div className="row mt-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="top text"
              value={topText}
              onChange={(event) => setTopText(event.target.value)}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="bottom text"
              value={bottomText}
              onChange={(event) => setBottomText(event.target.value)}
            />
          </div>
        </div>
        {/* Ending of Input Fields for text on meme image */}

        {/* Starting of Download Button to dowmload the meme image */}
        <button className="btn btn-success mt-3" onClick={downloadMemes}>
          Download Meme
        </button>
        {/* Ending of Download Button to dowmload the meme image */}
      </div>
    </>
  );
};

export default HomePage;
