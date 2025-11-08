const input = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const chatContainer = document.getElementById("chat-container");
const splash = document.getElementById("splash");

let hasChatted = false;

// Listen for Enter key
input.addEventListener("keyup", handleInputChat);
sendButton.addEventListener("click", handleSend);

// Reusable loading bubble
const loading = document.createElement("div");
loading.className = "my-4 flex justify-start";
loading.innerHTML = `
  <div class="p-4 text-gray-100  w-fit">
    <p>Thinking...</p>
  </div>`;

// Hide splash after first *sent* message
function hideSplashOnce() {
  if (!hasChatted && splash) {
    splash.classList.add("hidden");
    hasChatted = true;
  }
}

async function handleInputChat(e) {
  if (e.key === "Enter") {
    await handleSend();
  }
}

async function handleSend() {
  const message = input.value.trim();
  if (!message) return;

  // Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "bg-gray-700 text-white ml-auto w-fit px-4 py-2 rounded-2xl rounded-br-none max-w-xs shadow-lg";
  userMsg.innerHTML = `<p>${escapeHtml(message)}</p>`;
  chatContainer.appendChild(userMsg);

  // Show loading
  chatContainer.appendChild(loading);

  // Clear input & scroll
  input.value = "";
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // Hide splash right after the first actual send
  hideSplashOnce();

  try {
    // Call backend server
    const assistantMessage = await callserver(message);

    // Add assistant message
    const assistantMsg = document.createElement("div");
    assistantMsg.className = "my-4 flex justify-start";
    assistantMsg.innerHTML = `
      <div class="text-gray-200 bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-2xl rounded-bl-none w-fit shadow-lg max-w-[80%]">
        <p>${escapeHtml(assistantMessage)}</p>
      </div>`;
    chatContainer.appendChild(assistantMsg);

  } catch (err) {
    console.error("Error:", err);
    const errorMsg = document.createElement("div");
    errorMsg.className = "my-4 flex justify-start";
    errorMsg.innerHTML = `
      <div class="text-red-200 bg-red-900/40 border border-red-700 px-4 py-2 rounded-2xl w-fit shadow-lg">
        <p>Something went wrong. Please try again.</p>
      </div>`;
    chatContainer.appendChild(errorMsg);
  } finally {
    // Clear loading indicator
    loading.remove();
    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
}

async function callserver(inputText) {
  const response = await fetch("http://localhost:3000/chat", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ message: inputText })
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result.message;
}

// Basic HTML escape to avoid breaking bubbles with user text
function escapeHtml(str) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
