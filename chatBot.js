import Groq from "groq-sdk";
import { tavily } from "@tavily/core";
import NodeCache from "node-cache";

const tvly = tavily({ apiKey: process.env.AVILY_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const cache = new NodeCache({stdTTL: 60 * 60 * 24});


export async function generate(userMessage, threadId) {
  const baseMessages = [
    {
      role: "system",
      content: `you are a smart personal assistant.
      current datetime: ${new Date().toUTCString()}`,
    },
  ];

  const messages = cache.get(threadId) ?? baseMessages;

  messages.push({
    role: "user",
    content: userMessage,
  });

  while (true) {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      messages: messages,
      tools: [
        {
          type: "function",
          function: {
            name: "webSearch",
            description:
              "Search the latest information and real time data on the internet.",
            parameters: {
              type: "object",
              properties: {
                location: {
                  type: "string",
                  description: "The search query to perform search on.",
                },
              },
              required: ["query"],
            },
          },
        },
      ],
      tool_choice: "auto",
    });

    messages.push(completion.choices[0].message);

    const toolsCalls = completion.choices[0].message.tool_calls;

    if (!toolsCalls) {
      cache.set(threadId, messages);
      
      return completion.choices[0].message.content;
    }

    for (const tool of toolsCalls) {

      const functionName = tool.function.name;
      const functionParams = tool.function.arguments;

      if (functionName === "webSearch") {
        const toolResult = await webSearch(JSON.parse(functionParams));

        messages.push({
          tool_call_id: tool.id,
          role: "tool",
          name: functionName,
          content: toolResult,
        });
      }
    }
  }
}

async function webSearch({ query }) {
  const response = await tvly.search(query);

  const finalResult = response.results
    .map((result) => result.content)
    .join("\n");

  return finalResult;
}
