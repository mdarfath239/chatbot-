const input = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const chatContainer = document.getElementById("chat-container");

// Listen for Enter key
input.addEventListener("keyup", handleInputChat);
sendButton.addEventListener("click", handleSend);


const loading = document.createElement("div");
loading.className = "my-4 flex justify-start";
loading.innerHTML = `
  <div class="p-4 bg-gray-800 rounded-xl w-fit">
    <p>Loading...</p>
  </div>`;


async function handleInputChat(e) {
  if (e.key === "Enter") {
    handleSend();
  }
}

async function handleSend() {
  const message = input.value.trim();
  if (!message) return;

  // Add user message
  const userMsg = document.createElement("div");
  userMsg.className = "bg-gray-700 text-white ml-auto w-fit px-4 py-2 rounded-2xl rounded-br-none max-w-xs shadow-lg";
  userMsg.innerHTML = `<p>${message}</p>`;
  chatContainer.appendChild(userMsg);
chatContainer.appendChild(loading);
  // Clear input
  input.value = "";

  // Scroll to bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    // Call backend server
    const assistantMessage = await callserver(message);

    // Add assistant message
    const assistantMsg = document.createElement("div");
    assistantMsg.className = "my-4 flex justify-start";
    assistantMsg.innerHTML = `
      <div class="text-gray-200 px-4 py-2 rounded-2xl rounded-bl-none w-fit shadow-lg">
        <p>${assistantMessage}</p>
      </div>`;
    chatContainer.appendChild(assistantMsg);

    // Clear loading indicator
    loading.remove();

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

  } catch (err) {
    console.error("Error:", err);
  }
}

async function callserver(inputText) {
  const response = await fetch("http://localhost:3000/chat", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ message: inputText }) // <-- fixed
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result = await response.json();
  return result.message;
}
