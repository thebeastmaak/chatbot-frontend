const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

async function sendQuestion() {
  const question = userInput.value;
  if (!question) return;

  appendMessage('You', question);
  userInput.value = '';

  try {
    const res = await fetch('https://fisu-chatbot.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question })
    });

    const data = await res.json();
    appendMessage('Bot', data.answer);
  } catch (error) {
    appendMessage('Bot', 'Sorry, I couldn’t fetch the answer.');
  }
}

function appendMessage(sender, message) {
  const msg = document.createElement('div');
  msg.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
