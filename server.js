import express from "express";
import { chat } from "./chatbot.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing 'message' field" });
  }

  const reply = await chat(message);
  res.json({ message: reply });
});

app.listen(3000, () => console.log("✅ Server running on port 3000"));
