const responses = [
    { keywords: ["hi", "hello", "hey"], answer: "Hello there! 👋 I'm your web assistant. Ask me about HTML, CSS, or JavaScript." },
    { keywords: ["html"], answer: "HTML is used to structure content on the web using tags like <p>, <h1>, <div>, etc." },
    { keywords: ["css"], answer: "CSS is used to style HTML content — like colors, layout, fonts, and animations." },
    { keywords: ["javascript", "js"], answer: "JavaScript is a programming language that makes websites interactive. 🧠" },
    { keywords: ["flexbox"], answer: "Flexbox is a CSS layout tool that helps align and distribute space between items." },
    { keywords: ["grid"], answer: "CSS Grid helps build complex layouts using rows and columns." },
    { keywords: ["if statement"], answer: "An if statement checks a condition in JavaScript and runs code if true." },
    { keywords: ["array"], answer: "An array is a list of items in JS. Example: ['apple', 'banana']" },
    { keywords: ["your name", "who made you"], answer: "I'm Abdul Ghaffar's chatbot project for Internee.pk!" },
    { keywords: ["help"], answer: "Ask me questions related to HTML, CSS, or JavaScript. I'm happy to help!" }
  ];

  const fallback = "I'm a simple AI bot made by Abdul Ghaffar for Internee.pk' Assignmet, I can answer basic questions about HTML, CSS, and JavaScript only.";

  const chatBox = document.getElementById("chat-box");
  const input = document.getElementById("user-input");
  const btn = document.getElementById("send-btn");

  function sendMessage() {
    const msg = input.value.trim();
    if (!msg) return;
    displayMessage("user", msg);
    input.value = "";

    showTyping(() => {
      const reply = getReply(msg.toLowerCase());
      displayMessage("bot", reply);
      speak(reply);
    });
  }

  function getReply(text) {
    for (let item of responses) {
      if (item.keywords.some(k => text.includes(k))) {
        return item.answer;
      }
    }
    return fallback;
  }

  function displayMessage(sender, text) {
    const div = document.createElement("div");
    div.className = `message ${sender}`;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function showTyping(callback) {
    const typing = document.createElement("div");
    typing.className = "message bot typing";
    typing.innerText = "Typing...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      chatBox.removeChild(typing);
      callback();
    }, 1000);
  }

  function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1;
    utter.pitch = 1.2;
    window.speechSynthesis.speak(utter);
  }

  btn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });