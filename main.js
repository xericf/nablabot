const config = require("./config.json");
const token = config.token;
const openAIKey = config.openAIKey;
const {Client, GatewayIntentBits, Events} = require("discord.js");
const {askAI} = require("./openai.js");
const client = new Client({

    intents: [ 
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        ]
});
client.on("ready", () =>{
    console.log("Nabla bot is running."); //message when bot is online
});

// the callback must be marked as asynchronous for await to work
client.on(Events.MessageCreate, async (message) => {

    if (message.content.substring(0, 5) !== "nabla") return;

    const chunks = message.content.split(" "); // split message by space
    const command = chunks[1]; // after nabla
    // send command:
    // message.channel.send(""); //reply if message has "!" as first character 

    switch(command) {
        case "ask":
            const question = chunks.slice(2).join(" ");
            console.log(question);
            const aiResponse = await askAI(question);
            message.channel.send(aiResponse);

            break;
    }
});
client.login(token);