const ollama = require("ollama");
const axios = require("axios");

exports.askOllama = async (prompt = "hi") => {
  try {
    const timeStart = new Date().getTime();
    const res = await ollama.default.generate({
      model: "llama3",
      prompt: prompt,
    });
    const timeEnd = new Date().getTime();
    console.log(res);
    return {
      response: res.response,
      timeTaken: `${(timeEnd - timeStart) / 1000}s`,
    };
  } catch (error) {
    throw error;
  }
};
