import { useState } from "react";
import "./App.css";
import { AWS_LAMBDA_API } from "./config";

const App = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFileUploadedSuccessfully, setIsFileUploadedSuccessfully] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFiles([...selectedFiles, ...event.target.files]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`demo file ${index}`, file, file.name);
    });

    fetch(AWS_LAMBDA_API, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    })
      .then(() => {
        setSelectedFiles([]);
        setIsFileUploadedSuccessfully(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeFile = (fileIndex) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(fileIndex, 1);
    setSelectedFiles(updatedFiles);
  };

  const FileData = () => {
    if (selectedFiles.length > 0) {
      return (
        <>
          <h2>Files</h2>
          {selectedFiles.map((file, index) => (
            <div key={index}>
              <p>File Name: {file.name}</p>
              <p>File Type: {file.type}</p>
              <p>Last Modified: {file.lastModifiedDate?.toDateString()}</p>
              <button onClick={() => removeFile(index)}>Remove</button>
            </div>
          ))}
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
      <FileData />
      <div>
        <input type="file" onChange={handleFileChange} multiple />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
    </div>
  );
};

export default App;
