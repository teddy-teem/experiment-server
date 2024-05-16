const fs = require("fs");
const { Octokit } = require("@octokit/rest");
const { githubUsername, githubPat } = require("../variables");

const username = githubUsername;
const token = githubPat;

exports.addFileToRepo = async (campaignId) => {
  try {
    const octokit = new Octokit({ auth: token });
    const fileContent = await fs.promises.readFile(
      __dirname + "/../assets/script.js",
      "utf-8"
    );
    const encodedContent =
      `const campaignId = "${campaignId}";\nlet element = document.getElementById("${campaignId}");\n` +
      fileContent;

    // Create a new tree object containing the file
    const createTreeResponse = await octokit.git.createTree({
      owner: username,
      repo: "exp-cdn", // Replace with your repository name
      base_tree: "master", // Replace with the desired branch (usually "master")
      tree: [
        {
          path: `${campaignId}.js`.replace(/\"/g, ""),
          mode: "100644", // File mode (blob)
          type: "blob",
          content: encodedContent,
        },
      ],
    });
    const {
      data: { sha: treeSha },
    } = createTreeResponse; // Extract the tree SHA

    const createCommitResponse = await octokit.git.createCommit({
      owner: username,
      repo: "exp-cdn",
      message: `Added new file: ${campaignId}`, // Specify filename in message
      tree: treeSha,
      author: { name: "Jahid", email: "jahidrsn@gmail.com" },
    });
    console.log(createCommitResponse);
    const {
      data: { sha: commitSha },
    } = createCommitResponse; // Extract the commit SHA

    // Update the branch head to point to the new commit
    await octokit.git.updateRef({
      owner: username,
      repo: "exp-cdn",
      ref: "heads/master", // Replace with the desired branch (usually "master")
      sha: commitSha,
      force: true,
    });
  } catch (error) {
    console.error(`Error adding file: ${error}`);
  }
};
