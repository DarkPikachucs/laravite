import { useState } from "react";
import axios from "axios";

const API_KEY = "AIzaSyBhtqb1Jepw5GWbwP_m6BzhzcXW7HGpjCg"; // 🔥 ใส่ API Key ที่ได้จาก Google

const useGemini = () => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  const [loading2, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const summarizeText = async (text) => {
    setLoading(true);
    setError(null);
    try {
      const requestData = {
        contents: [{
          parts: [{
            text: `วิเคราะห์และสรุปข้อมูลโครงการนี้โดยให้แยกเป็น
              - จำนวนผลิตภัณฑ์ที่ได้
              - จำนวนหมู่บ้านที่ได้รับการพัฒนา
              - จำนวนคนที่เข้าร่วมโครงการ
              - จำนวนคนที่ได้รับการพัฒนา
              ข้อมูล: 
              ${text}`
          }]
        }]
      };

      const response = await axios.post(url, requestData, {
        headers: { "Content-Type": "application/json" }
      });
      return response.data.candidates[0]?.content?.parts[0]?.text || "สรุปไม่ได้";
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { summarizeText, loading2, error };

};

export default useGemini;
