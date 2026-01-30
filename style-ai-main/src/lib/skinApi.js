import API from "./api";

export const analyzeSkinApi = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await API.post("/skin/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};
