const input = document.getElementById("input");
const sendBtn = document.getElementById("send");
const messages = document.getElementById("messages");

sendBtn.onclick = sendMessage;

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  messages.innerHTML += `<div><b>You:</b> ${text}</div>`;
  input.value = "";

  messages.innerHTML += `<div id="thinking">Gemini is thinking...</div>`;

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  document.getElementById("thinking").remove();

  messages.innerHTML += `<div><b>Gemini:</b> ${data.reply || data.error}</div>`;
}
