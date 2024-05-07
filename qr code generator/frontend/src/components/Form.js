import { useState } from "react";

export default function Form() {
  const [input, setInput] = useState("");

  async function qrTextHandler() {
    const response = await fetch("http://localhost:5001/scan", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body:JSON.stringify({text:input}),
    });

    const result = await response.json();
    
    if(result){
      //...
    }
  }

  return (
    <>
      <div className="container">
        <h2>Enter your Text, Website, URL, Images etc.</h2>
        <textarea
          className="textarea"
          placeholder="Enter your text here..."
          rows="14"
          cols="58"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={input}
        ></textarea>
        <div className="btn">
          <button>Upload</button>
          <button onClick={qrTextHandler}>Generate</button>
        </div>
      </div>
    </>
  );
}
