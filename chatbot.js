import 'dotenv/config';
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
import NodeCache from "node-cache";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

// 🧠 cache for remembering conversations (24-hour TTL)
const myCache = new NodeCache({ stdTTL: 60 * 60 * 24 });

// --- Tool function ---
async function webSearch({ query }) {
  if (!query || typeof query !== "string") throw new Error("Invalid query");
  const response = await tvly.search(query);
  return response;
}

// --- Chat function ---
export async function chat(userMessage, sessionId = "default") {
  if (!userMessage) throw new Error("Missing user message");

  // 🧠 Load previous chat history (if available)
  let history = myCache.get(sessionId);
  if (!history) {
    history = [
      {
        role: "system",
        content: `
You are a smart, web-connected AI assistant.
- Be conversational, concise, and natural.
- Use the "webSearch" tool for current or factual questions.
- When you answer, summarize clearly and mention the source if possible.
        `,
      },
      // --- FEW-SHOT EXAMPLES ---
      { role: "user", content: "Who is the current Prime Minister of India?" },
      { role: "assistant", content: "The current Prime Minister of India is Narendra Modi." },
      { role: "user", content: "Tell me about iPhone 15 Pro features." },
      { role: "assistant", content: "The iPhone 15 Pro features the A17 Pro chip, titanium frame, improved cameras, and USB-C charging." },
      { role: "user", content: "What’s the weather like in Delhi right now?" },
      { role: "assistant", content: "Let me quickly check the latest information for you using the webSearch tool." },
    ];
  }

  // 🧩 Add the new user message
  history.push({ role: "user", content: userMessage });

  // Step 1: Ask Groq model
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: history,
    tools: [
      {
        type: "function",
        function: {
          name: "webSearch",
          description: "Search the web for the latest information",
          parameters: {
            type: "object",
            properties: { query: { type: "string" } },
            required: ["query"],
          },
        },
      },
    ],
    tool_choice: "auto",
  });

  const message = completion.choices[0].message;
  history.push(message);

  // Step 2: Handle tool calls
  if (message.tool_calls?.length > 0) {
    const toolCall = message.tool_calls[0];
    const args = JSON.parse(toolCall.function.arguments || "{}");

    let result = [];
    if (toolCall.function.name === "webSearch") {
      result = await webSearch(args);
    }

    const followUp = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        ...history,
        {
          role: "tool",
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        },
      ],
    });

    const finalMessage = followUp.choices[0].message;
    history.push(finalMessage);

    // 💾 Store updated history in cache
    myCache.set(sessionId, history);

    return finalMessage.content;
  }

  // 💾 Save updated chat history
  myCache.set(sessionId, history);

  return message.content;
}
