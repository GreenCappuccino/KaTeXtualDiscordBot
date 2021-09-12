const { KaTeXtual } = require('katextual')
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

let katextual;
(async () => {katextual = await KaTeXtual.getInstance();})();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'render') {
        await interaction.reply({
            files: [ await katextual.renderPng(interaction.options.getString('commands')) ],
        });
    }
});

// Login to Discord with your client's token
client.login(token);
