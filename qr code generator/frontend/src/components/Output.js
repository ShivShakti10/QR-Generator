// import sample from "../sample1.png";
// import "./Output.css";

// export default function Output() {
//   const downloadHandler = async () => {
//     const response = await fetch("http://localhost:5001/download", {
//       method: "POST",
//     });

//     return response;
//   };
//   return (
//     <>
//       <div className="container2">
//         <div className="element">
//           <div>
//             <h1 id="heading">QR Code</h1>
//           </div>
//           <div>
//             <img className="sample" src={sample} alt="" />
//           </div>
//           <div>
//             <form action="/download" method="post" >
//               <button className="download" type="submit" onClick={downloadHandler}>
//                 Download
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// import sample from "../../../backend/sample1.png";
import "./Output.css";
import { useState, useEffect } from "react";

export default function Output() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch("http://localhost:5001/images");
        const data = await response.json();
        setImageUrl(data.imageUrl);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }

    fetchImage();
  }, []);

  const downloadHandler = async () => {
    try {
      const response = await fetch("http://localhost:5001/download", {
        method: "POST",
      });
      console.log("res", response);
      if (response.ok) {
        // Create a Blob from the response
        const blob = await response.blob();
        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);
        // Create a link element
        const link = document.createElement("a");
        // Set the href attribute to the temporary URL
        link.href = url;
        // Set the download attribute to the desired file name
        link.download = "sample1.png";
        // Append the link to the document body
        document.body.appendChild(link);
        // Trigger a click event on the link
        link.click();
        // Remove the link from the document body
        document.body.removeChild(link);
      } else {
        console.error("Failed to download file");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <>
      <div className="container2">
        <div className="element">
          <div>
            <h1 id="heading">QR Code</h1>
          </div>
          <div>{imageUrl && <img src={imageUrl} alt="Generated Img" />}</div>
          {/* <div>
            <img className="sample" src={sample} alt="" />
          </div> */}
          <div>
            <button
              className="download"
              type="button"
              onClick={downloadHandler}
            >
              Download
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
