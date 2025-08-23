import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  const completion = await groq.chat.completions.create({
    // top_p: 0.2,
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: "A smart personal assistant.",
      },
      {
        role: "user",
        content: "When was iphone 16 launched?",
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "webSearch",
          description: "Search the latest information and real time data on the internet.",
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
    tool_choice: "auto"
  });

  const toolsCalls = completion.choices[0].message.tool_calls

  if(!toolsCalls){
    console.log(`AI Assistant: ${completion.choices[0].message.content}`);
    return;
  };

  for(const tool of toolsCalls){
    console.log('tool: ', tool);

    const functionName = tool.function.name;
    const functionParams = tool.function.arguments;

    if(functionName === 'webSearch'){
      const toolResult = await webSearch(JSON.parse(functionParams));
      console.log('Tool result: ', toolResult);
      
    }
    
  }

  // console.log(JSON.stringify(completion.choices[0].message, null, 2));
}

main();

async function webSearch({ query }) {
  return "iPhone was launched on 20 sept 2024.";
}
