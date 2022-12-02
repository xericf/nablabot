const config = require("./config.json");
const token = config.token;
const openAIKey = config.openAIKey;
const {Client, GatewayIntentBits, Events, codeBlock} = require("discord.js");
const {askAI, rudeAI, correctText} = require("./openai.js");
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

const helpStr = `
Run with: nabla [command] [text]

[command]:
ask: Talk to nabla
rude: Be berated by nabla
correct: correct your grammar
`;
const helpMenu = codeBlock(helpStr);

client.on("ready", () =>{
    console.log("Nabla bot is running."); //message when bot is online
});

// the callback must be marked as asynchronous for await to work
client.on(Events.MessageCreate, async (message) => {

    if (message.content.substring(0, 5) !== "nabla") return;

    const chunks = message.content.split(" "); // split message by space
    const command = chunks[1]; // after nabla
    // send command:
    // message.channel.send(""); 
    const body = chunks.slice(2).join(" ");
    var aiResponse = " ";
    
    if (command == "ask") {
        let q = body;
        aiResponse = await askAI(q);
        message.react('👍');
        console.log(q);
    } else if (command == "rude") {

        aiResponse = await rudeAI(body);
        message.react('🖕');

    } else if (command == "correct") {
        aiResponse = await correctText(body);
        message.react('👍');
    } else if (command == "summarize") {

    } else {
        // Help menu
        aiResponse = helpMenu;
    }
    message.channel.send(aiResponse);
    
});
client.login(token);