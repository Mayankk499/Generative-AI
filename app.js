import readline from 'node:readline/promises'
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";

const tvly = tavily({ apiKey: process.env.AVILY_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const rl = readline.createInterface({input: process.stdin, output: process.stdout})

  const messages = [
    {
      role: "system",
      content: `A smart personal assistant who answers the asked questions.
      1. searchWeb({query}: {query: string}) //Search the latest information and realtime data on the internet. 
      current datetime: ${new Date().toUTCString()}`,
    },
  ];

  while (true) {
    const question = await rl.question('You: ')

    if(question === 'bye'){
      break;
    }
    messages.push({
      role: 'user',
      content: question,
    })

    while (true) {
      const completion = await groq.chat.completions.create({
        // top_p: 0.2,
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
        console.log(`AI Assistant: ${completion.choices[0].message.content}`);
        break;
      }

      for (const tool of toolsCalls) {
        // console.log("tool: ", tool);

        const functionName = tool.function.name;
        const functionParams = tool.function.arguments;

        if (functionName === "webSearch") {
          const toolResult = await webSearch(JSON.parse(functionParams));
          // console.log("Tool result: ", toolResult);

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
  rl.close();
}

main();

async function webSearch({ query }) {
  const response = await tvly.search(query);
  // console.log("Response:", response);

  const finalResult = response.results
    .map((result) => result.content)
    .join("\n");

  return finalResult;
}
