import React, { useState } from 'react';
import './Upload.css';
const UploadExcelPage = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [file, setFile] = useState(null);
  const handleFileSelection = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadSuccess(false);
      setError(false);
      console.log("File is selected", selectedFile);
    }
  };
  const handleFileUpload = () => {
    console.log("File uploaded sucessful"); 
    if (!file) {
      setError(true);
      setUploadSuccess(false);
      console.log("file not uploaded")
      return;
    }
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      console.log("Invalid file type:", file.type);
      setError(true);
      setUploadSuccess(false);
      return;
    }
    setUploading(true);
    setError(false);
    const formData = new FormData();
    console.log("form Data",formData)
    formData.append('file', file);
    fetch('https://recruitment-tracker-backend.vercel.app/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log("Upload success:", data);
          setUploadSuccess(true);
        } else {
          console.log("Upload failed:", data);
          setError(true);
        }
      })
      .catch((err) => {
        console.log("Error occurred:", err);
        setError(true);
      })
      .finally(() => {
        setUploading(false);
      });
  };
  return (
    <div className="upload-excel-page">
      <h3>Upload your Document</h3>
      <input
        type="file"
        id="file-upload"
        name="file"
        accept=".xlsx"
        onChange={handleFileSelection}
        disabled={uploading}
      />
      <button
        onClick={handleFileUpload}
        disabled={uploading || !file}
        className="upload-button"
      >
        Upload
      </button>
      {uploading && <p>Uploading...</p>}
      {uploadSuccess && <p className="success">Upload Successful</p>}
      {error && <p className="error">Please select a valid file</p>}
    </div>
  );
};
export default UploadExcelPage;
