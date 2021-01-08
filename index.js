const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.TOKEN;
const http = require("http");

client.once('ready', () => {
    console.log('READY');
});

client.login(token);

client.on('voiceStateUpdate', (oldState, newState) => {
    if (newState.channelID === '790343982877900820') {
        const channel = client.channels.cache.get("790343982877900820");
        channel.join().then(connection => {
            console.log("Successfully connected.");
            const dispatcher = connection.play('./bark.mp3');
            dispatcher.on("end", end => {
                voiceChannel.leave();
            });
        });
    } else {
        const channel = client.channels.cache.get("790343982877900820");
        channel.leave();
    }
});

http
  .createServer((request, response) => {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.write("Gang Słoni Dev Team");
    response.end();
  })
  .listen(process.env.PORT);
console.log("Server listening on port" + process.env.PORT);