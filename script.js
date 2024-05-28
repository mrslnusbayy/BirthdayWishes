document.addEventListener("DOMContentLoaded", () => {
  const messages = [
    { type: "received", text: "Happy Birthday, Chelsi!" },
    { type: "received", text: "Wishing you a day filled with love and joy!" },
    {
      type: "received",
      text: "May all your dreams come true on this special day!",
    },
    { type: "received", text: "Enjoy your day to the fullest!" },
    { type: "received", text: "Here's a little gift for you!" },
    {
      type: "received",
      text: '<img src="images/birthday.gif" alt="Gift" class="received-gift-image">',
    },
  ];

  let messageIndex = 0;

  function displayNextMessage() {
    if (messageIndex < messages.length) {
      const message = messages[messageIndex];
      const messageElement = document.createElement("div");
      messageElement.classList.add("message", message.type);

      const messageText = document.createElement("div");
      messageText.classList.add("message-text");

      const messageContent = document.createElement("div");
      messageContent.classList.add("message-content");
      messageContent.innerHTML = message.text;

      const messageTime = document.createElement("div");
      messageTime.classList.add("message-time");
      messageTime.textContent = "00.00";

      messageText.appendChild(messageContent);
      messageText.appendChild(messageTime);
      messageElement.appendChild(messageText);

      if (
        messageIndex === 0 ||
        (messageIndex > 0 && messages[messageIndex - 1].type !== message.type)
      ) {
        messageElement.classList.add("first");
      }

      if (message.text.length < 32) {
        if (message.type === "received") {
          messageText.classList.add("received-short");
        } else {
          messageText.classList.add("sent-short");
        }
      }

      document.getElementById("chat-body").appendChild(messageElement);

      // Cek apakah pesan terakhir adalah gambar hadiah
      if (messageIndex === messages.length - 1) {
        const statusText = document.getElementById("status-text");
        statusText.classList.add("fade-out");

        setTimeout(() => {
          statusText.textContent = "Love u";
          statusText.classList.remove("fade-out");
          statusText.classList.add("fade-in");
        }, 3000);

        setTimeout(() => {
          statusText.classList.remove("fade-in");
        }, 5000);
      }

      messageIndex++;
      setTimeout(displayNextMessage, 2000);
    } else {
      const dateDisplay = document.getElementById("date-display");
      dateDisplay.style.display = "none";
    }
  }

  displayNextMessage();

  const emojiButton = document.getElementById("emoji-button");
  const emojiPicker = document.getElementById("emoji-picker");
  const chatInput = document.getElementById("chat-input");

  emojiButton.addEventListener("click", () => {
    emojiPicker.style.display =
      emojiPicker.style.display === "none" ? "block" : "none";
    emojiButton.classList.toggle("active");
  });

  document.addEventListener("click", (event) => {
    if (
      !emojiPicker.contains(event.target) &&
      !emojiButton.contains(event.target)
    ) {
      emojiPicker.style.display = "none";
      emojiButton.classList.remove("active");
    }
  });

  emojiPicker.addEventListener("click", (event) => {
    if (event.target.tagName === "SPAN") {
      const emoji = event.target.textContent;
      chatInput.value += emoji;
    }
  });

  document.getElementById("chat-input").disabled = false;

  document
    .getElementById("chat-input")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter" && this.value.trim() !== "") {
        const message = this.value;
        this.value = "";

        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "sent");

        const messageText = document.createElement("div");
        messageText.classList.add("message-text");

        const messageContent = document.createElement("div");
        messageContent.classList.add("message-content");
        messageContent.textContent = message;

        const messageTime = document.createElement("div");
        messageTime.classList.add("message-time");
        messageTime.textContent = "00.00";

        messageText.appendChild(messageContent);
        messageText.appendChild(messageTime);
        messageElement.appendChild(messageText);

        const chatBody = document.getElementById("chat-body");
        const lastMessage = chatBody.querySelector(
          ".message.sent:last-of-type"
        );
        if (!lastMessage) {
          messageElement.classList.add("first");
        }

        if (message.length < 32) {
          messageText.classList.add("sent-short");
        }

        chatBody.appendChild(messageElement);

        chatBody.scrollTop = chatBody.scrollHeight;
      }
    });

  document.getElementById("send-button").addEventListener("click", function () {
    const input = document.getElementById("chat-input");
    if (input.value.trim() !== "") {
      const message = input.value;
      input.value = "";

      // Tambahkan animasi pop up
      this.classList.add("pop-up-animation");
      setTimeout(() => this.classList.remove("pop-up-animation"), 350);

      const messageElement = document.createElement("div");
      messageElement.classList.add("message", "sent");

      const messageText = document.createElement("div");
      messageText.classList.add("message-text");

      const messageContent = document.createElement("div");
      messageContent.classList.add("message-content");
      messageContent.textContent = message;

      const messageTime = document.createElement("div");
      messageTime.classList.add("message-time");
      messageTime.textContent = "00.00";

      messageText.appendChild(messageContent);
      messageText.appendChild(messageTime);
      messageElement.appendChild(messageText);

      const chatBody = document.getElementById("chat-body");
      const lastMessage = chatBody.querySelector(".message.sent:last-of-type");
      if (!lastMessage) {
        messageElement.classList.add("first");
      }

      if (message.length < 32) {
        messageText.classList.add("sent-short");
      }

      chatBody.appendChild(messageElement);

      chatBody.scrollTop = chatBody.scrollHeight;
    }
  });

  function updateDate() {
    const dateElement = document.getElementById("date-display");
    const now = new Date();
    const dateString = now.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    dateElement.textContent = dateString;
  }

  setInterval(updateDate, 1000);

  updateDate();
});
