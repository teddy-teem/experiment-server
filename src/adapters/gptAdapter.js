const OpenAI = require("openai");
const { gptApiKey } = require("../variables");

const openai = new OpenAI({
  apiKey: gptApiKey, // This is the default and can be omitted
});

exports.askGPT = async (content) => {
  try {
    console.time("myOperation");
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content }],
      model: "gpt-3.5-turbo",
    });
    console.timeEnd("myOperation");
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    throw error;
  }
};
