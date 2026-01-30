import axios from "axios";
import FormData from "form-data";

export const analyzeSkin = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No image received" });
    }

    const formData = new FormData();
    formData.append("image", req.file.buffer, {
      filename: "image.jpg",
      contentType: req.file.mimetype,
    });

    console.log("Analyzing skin via Python service...");
    const response = await axios.post(
      "http://127.0.0.1:5001/analyze",
      formData,
      { headers: formData.getHeaders() }
    );
    console.log("Python response:", response.data);

    res.json(response.data);
  } catch (error) {
    console.error("NODE → PYTHON ERROR:", error.message);
    res.status(500).json({ message: "Skin analysis failed" });
  }
};
