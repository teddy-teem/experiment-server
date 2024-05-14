const ollamaAdapter = require("../adapters/ollamaAdapter");

exports.askOllama = async (ctx, prompt) => {
  try {
    const res = await ollamaAdapter.askOllama(prompt);
    return res;
  } catch (error) {
    throw error;
  }
};
