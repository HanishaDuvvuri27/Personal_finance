import { useState } from "react";
import axios from "axios";

interface UploadedFile {
  file: File;
  preview: string;
}

export default function Receipts() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const token = localStorage.getItem("token");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const uploaded = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFiles(uploaded);
  };

  const uploadFiles = async () => {
    if (files.length === 0) return alert("No files selected");

    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach(({ file }) => {
        formData.append("receipt", file); // ✅ corrected
      });

      const res = await axios.post("http://localhost:5000/api/receipts/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Receipts uploaded successfully");
      console.log("Extracted data:", res.data);
      setFiles([]);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "2rem auto",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "1.5rem" }}>
        Receipt Upload & Processing
      </h2>

      {/* Upload Panel */}
      <div
        style={{
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            flex: 1,
            border: "2px dashed #ccc",
            borderRadius: "10px",
            padding: "2rem",
            textAlign: "center",
            minWidth: "300px",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>📤 Upload Receipts</h3>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "1rem" }}>
            Drop your receipts here or click to browse
            <br />
            Supports images (PNG, JPG) and PDF files up to 10MB
          </p>
          <input
            type="file"
            accept="image/*,application/pdf"
            multiple
            onChange={handleFileChange}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "6px",
              width: "100%",
            }}
          />
          {files.length > 0 && (
            <ul
              style={{
                marginTop: "1rem",
                listStyle: "none",
                padding: 0,
              }}
            >
              {files.map((f, i) => (
                <li key={i} style={{ marginBottom: "10px" }}>
                  {f.file.type.startsWith("image") ? (
                    <img
                      src={f.preview}
                      alt="preview"
                      width={100}
                      style={{ borderRadius: "8px" }}
                    />
                  ) : (
                    <p>{f.file.name}</p>
                  )}
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={uploadFiles}
            disabled={isUploading}
            style={{
              backgroundColor: "#10b981",
              color: "#fff",
              padding: "10px 20px",
              marginTop: "1rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              width: "100%",
              fontWeight: 600,
            }}
          >
            {isUploading ? "Uploading..." : `Upload ${files.length} File(s)`}
          </button>
        </div>

        {/* Results Panel */}
        <div
          style={{
            flex: 1,
            minWidth: "300px",
            backgroundColor: "#f9fafb",
            padding: "2rem",
            borderRadius: "10px",
            border: "1px solid #e5e7eb",
          }}
        >
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>📄 Extraction Results</h3>
          <p style={{ fontSize: "14px", color: "#555" }}>
            Upload receipts to see extracted data here.
            <br />
            OCR processing will automatically extract transaction details.
          </p>

          {/* This is placeholder, you can inject real data when available */}
        </div>
      </div>

      {/* Steps Illustration */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          textAlign: "center",
          padding: "2rem",
          border: "1px solid #eee",
          borderRadius: "10px",
          backgroundColor: "#f3f4f6",
        }}
      >
        <div>
          <div style={{ fontSize: "2rem", color: "#10b981" }}>⬆️</div>
          <h4>1. Upload</h4>
          <p style={{ fontSize: "13px", color: "#555" }}>
            Upload your receipt images or PDF files
          </p>
        </div>
        <div>
          <div style={{ fontSize: "2rem", color: "#10b981" }}>🧠</div>
          <h4>2. Extract</h4>
          <p style={{ fontSize: "13px", color: "#555" }}>
            AI automatically extracts transaction details
          </p>
        </div>
        <div>
          <div style={{ fontSize: "2rem", color: "#10b981" }}>✅</div>
          <h4>3. Review</h4>
          <p style={{ fontSize: "13px", color: "#555" }}>
            Review and confirm extracted transaction data
          </p>
        </div>
      </div>
    </div>
  );
}
