import { OpenAI, ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts"


const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model:'gpt-4o'
  });


export const aiAdvisor = async (text:string) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", "You are a world-class business consultant with extensive expertise in identifying and articulating business challenges. Based on the following text give the result properly, "],
    ["user", "{input}"],
  ]);

  const chain = prompt.pipe(chatModel)

  const value = await chain.invoke({
    input: JSON.stringify(text)
  })

 

 return value.content 
}