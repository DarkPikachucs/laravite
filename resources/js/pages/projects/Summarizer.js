import { pipeline } from "@xenova/transformers";

export async function summarizeText(text) {
  // โหลดโมเดล summarization
  const summarizer = await pipeline("summarization", "Xenova/bart-large-cnn");

  // เรียกใช้ AI เพื่อสรุป
  const result = await summarizer(text, {
    max_length: 200,  // กำหนดความยาวสูงสุดของผลลัพธ์
    min_length: 50,   // กำหนดความยาวขั้นต่ำ
    do_sample: false, // ปิดการสุ่มเพื่อความแม่นยำ
  });

  return result[0].summary_text;
}
