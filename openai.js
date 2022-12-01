const { Configuration, OpenAIApi } = require("openai");
const config = require("./config.json");
const configuration = new Configuration({
    apiKey: config.openAIKey
});
const openai = new OpenAIApi(configuration);

// Gives the ai a given prompt
// examples usage:
// askAI("What are the names of the planets in the solar system?");
async function askAI(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.75,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });
    const answer = response.data.choices[0].text;
    // console.log(answer);
    return answer;
}

// askAI("What are the names of the planets in the solar system?");

module.exports = {
    askAI,
};