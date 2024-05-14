const ollama = require("ollama");
const axios = require("axios");

exports.askOllama = async (prompt = "hi") => {
  try {
    const image = await axios
      .get(
        "https://images.pexels.com/photos/3361739/pexels-photo-3361739.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
        { responseType: "arraybuffer" }
      )
      .then(function (response) {
        return response.data;
      });
    console.log(typeof image);
    const timeStart = new Date().getTime();
    const res = await ollama.default.generate({
      model: "llama3",
      prompt: "change background color of this image",
      images: [image],
    });
    const timeEnd = new Date().getTime();
    return {
      response: res,
      timeTaken: `${(timeEnd - timeStart) / 1000}s`,
    };
  } catch (error) {
    throw error;
  }
};
