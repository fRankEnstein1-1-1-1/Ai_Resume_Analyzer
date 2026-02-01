import { createContext, useContext, useState } from "react";
import API from "../api/axios.js";

const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");

  const uploadResume = async () => {
    const formData = new FormData();

    formData.append("resume", file);
    formData.append("description", description);

    const res = await API.post("/uploadresume/upload", formData);

    return res.data;
  };

  return (
    <UploadContext.Provider
      value={{ file, setFile, description, setDescription, uploadResume }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = () => useContext(UploadContext);
