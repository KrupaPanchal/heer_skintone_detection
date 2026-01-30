import axios from "axios";

export const analyzeSkinApi = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await axios.post(
    "http://localhost:5000/api/skin/analyze",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return res.data;
};
