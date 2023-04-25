import { useState } from "react";
import "./App.css";
import { AWS_LAMBDA_API } from "./config";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isFileUploadedSuccessfully, setIsFileUploadedSuccessfully] = useState(false);

  const handleFileChange = (event) => {
    console.log("handle file change triggered");
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    console.log("handle file upload triggered");
    console.log("selectedFile", selectedFile);
    const formData = new FormData();
    formData.append("demo file", selectedFile, selectedFile.name);

    fetch(AWS_LAMBDA_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: formData,
    })
      .then(() => {
        setSelectedFile(null);
        setIsFileUploadedSuccessfully(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const FileData = () => {
    if (selectedFile) {
      return (
        <>
          <h2>File Details</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>Last Modified: {selectedFile.lastModifiedDate?.toDateString()}</p>
        </>
      );
    } else if (isFileUploadedSuccessfully) {
      return <h4>Your file has been successfully uploaded</h4>;
    } else {
      return <h4>Choose a file and press the Upload button</h4>;
    }
  };

  return (
    <div>
      <h2>File Upload System</h2>
      <h3>Built with React, Serverless and S3</h3>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      <FileData />
    </div>
  );
};

export default App;
