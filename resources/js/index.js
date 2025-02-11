await expect(logoutLink).toBeVisible({ timeout: 10000 });
const nameInput = document.getElementById("my-name-input");
const myMessage = document.getElementById("my-message");
const sendButton = document.getElementById("send-button");
const chatBox = document.getElementById("chat");
function formatMessage(message, myNameInput) {
  const time = new Date(message.timestamp);
  const formattedTime = `${time.getHours()}:${time.getMinutes()}`;

  if (myNameInput === message.sender) {
    return `
      <div class="mine messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${formattedTime}
        </div>
      </div>
    `;
  } else {
    return `
      <div class="yours messages">
        <div class="message">
          ${message.text}
        </div>
        <div class="sender-info">
          ${message.sender} ${formattedTime}
        </div>
      </div>
    `;
  }
}
async function fetchMessages() {
  return [
    {
      id: 1,
      text: "uh papyrus...",
      sender: "sans",
      timestamp: "3:00 PM"
    },
    {
      id: 2,
      text: "i burnt the water",
      sender: "sans",
      timestamp: "3:00 PM"
    },
    {
      id: 3,
      text: "HOW THE... DID YOU BURN THE WATER",
      sender: "CoolSkeleton95",
      timestamp: "3:00 PM"
    }
  ];
}
function updateMessages() {
  const messages = fetchMessages();
  let formattedMessages = "";
  messages.forEach(message => {
    formattedMessages += formatMessage(message, nameInput.value);
  });
  chatBox.innerHTML = formattedMessages;
  updateMessages();
}
sendButton.addEventListener("click", function(event) {
  event.preventDefault();
  const sender = nameInput.value;
  const message = myMessage.value;
  const serverURL = `https://it3049c-chat.fly.dev/messages`;
  sendMessages(sender, message);
  myMessage.value = "";
});

function fetchMessages() {
  return fetch(serverURL)
    .then(response => response.json());
}
async function updateMessages() {
  const messages = await fetchMessages();
}
updateMessages();
const MILLISECONDS_IN_TEN_SECONDS = 10000;
setInterval(updateMessages, MILLISECONDS_IN_TEN_SECONDS);
function sendMessages(username, text) {
  const newMessage = {
    sender: username,
    text: text,
    timestamp: new Date()
  };

  fetch(serverURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json/`https://it3049c-chat.fly.dev/messages`'
    },
    body: JSON.stringify(newMessage)
  });
}