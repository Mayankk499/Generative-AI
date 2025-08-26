// const { json } = require("express");
// const { log } = require("node:console");

const input = document.querySelector("#input");
const chatContainer = document.querySelector("#chat-container");
const askBtn = document.querySelector("#ask");

input.addEventListener("keyup", handleEnter);
askBtn.addEventListener("click", handleAsk);

async function generate(text) {
  const msg = document.createElement("div");
  msg.className = `my-6 bg-neutral-800 p-3 rounded-xl ml-auto max-w-fit`;
  msg.textContent = text;
  chatContainer?.appendChild(msg);
  input.value = "";

  const assistantMessage = await callServer(text);

  const assistantMsgElem = document.createElement("div");
  assistantMsgElem.className = `max-w-fit`;
  assistantMsgElem.textContent = assistantMessage;
  chatContainer?.appendChild(assistantMsgElem);
  
}

async function callServer(inputText) {
  const response = await fetch('http://localhost:3000/chat', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({message: inputText}),
  });
  if(!response.ok){
    throw new Error("Error generating the response");
  }

  const result = await response.json(); 
  return result.message;
}

async function handleAsk(e) {
  const text = input.value.trim();
  if (!text) {
    return;
  }

  await generate(text);
}

async function handleEnter(e) {
  if (e.key === "Enter") {
    const text = input.value.trim();
    if (!text) {
      return;
    }

    await generate(text);
  }
}
