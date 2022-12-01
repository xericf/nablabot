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
        temperature: 0.70,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0.1,
        presence_penalty: 0.1,
    });
    const answer = response.data.choices[0].text;
    // console.log(answer);
    return answer;
}

async function rudeAI(prompt) {
    let q = "Answer the following in a vulgar tone: \n" + prompt;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: q,
        temperature: 0.7,
        max_tokens: 128,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    const answer = response.data.choices[0].text;
    // console.log(answer);
    return answer;
}

async function correctText(prompt) {
    let q = "Correct this to standard English: \n" + prompt;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: q,
        temperature: 0.00,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });
    const answer = response.data.choices[0].text;
    return answer;
}

// askAI("What are the names of the planets in the solar system?");

module.exports = {
    askAI, rudeAI, correctText
};

// The summary text goes here
// Below is the same passage rephrased by [personality name], as [personality traits], [describing It's style, tone and personality].