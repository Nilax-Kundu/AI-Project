document.addEventListener("DOMContentLoaded", () => {
  const chatArea = document.getElementById("chat-area");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const clearChat = document.getElementById("clear-chat");

  const backendBaseURL =
  window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "http://localhost:10000"  // or your local port
    : "https://your-backend-name.onrender.com";  // replace with actual Render backend URL

const backendURL = `${backendBaseURL}/chat`;
 // Change to deployed backend if needed

  sendBtn.addEventListener("click", sendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  clearChat.addEventListener("click", () => {
    chatArea.innerHTML = `
      <div class="message bot">
        <div class="message-content">
          Hello! I'm your fitness assistant. Try asking me about:
          <ul>
            <li>Workout routines</li>
            <li>Diet and nutrition</li>
            <li>Sleep and recovery</li>
            <li>Stress management</li>
          </ul>
        </div>
      </div>
    `;
  });

  async function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage(message, "user");
    userInput.value = "";

    const loadingMsg = addMessage("...", "bot");

    try {
      const res = await fetch(backendURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_input: message })
      });

      const data = await res.json();
      chatArea.removeChild(loadingMsg);
      const formattedResponse = formatResponse(data.response);
      addMessage(formattedResponse, "bot", true);
    } catch (error) {
      chatArea.removeChild(loadingMsg);
      console.error("❌ Backend error:", error);
      addMessage("Oops! Something went wrong. Please try again later.", "bot");
    }
  }

  function addMessage(message, sender, isHTML = false) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);

    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");

    if (isHTML) {
      messageContent.innerHTML = message;
    } else {
      messageContent.textContent = message;
    }

    messageElement.appendChild(messageContent);
    chatArea.appendChild(messageElement);
    chatArea.scrollTop = chatArea.scrollHeight;

    return messageElement;
  }

  function formatResponse(response) {
    // Convert markdown bold **text** or *text* to <strong>
    response = response.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    response = response.replace(/\*(?!\s)(.*?)\*/g, "<strong>$1</strong>");
  
    // Convert newlines to <br> temporarily
    response = response.replace(/\n/g, "<br>");
  
    // Convert bullet points to list items
    const lines = response.split("<br>");
    let inList = false;
    const formattedLines = [];
  
    for (let line of lines) {
      if (/^(\s*[-*])\s+/.test(line)) {
        if (!inList) {
          formattedLines.push("<ul>");
          inList = true;
        }
        formattedLines.push(`<li>${line.replace(/^(\s*[-*])\s+/, "")}</li>`);
      } else {
        if (inList) {
          formattedLines.push("</ul>");
          inList = false;
        }
        formattedLines.push(line);
      }
    }
    if (inList) formattedLines.push("</ul>");
  
    return formattedLines.join("<br>");
  }
  
});
