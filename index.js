const { KaTeXtual } = require('katextual')
const { Client, Intents } = require('discord.js');
const { token } = require('./config.json');

let katextual;
(async () => {katextual = await KaTeXtual.getInstance();katextual.initMhChem();})();


// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('/render', { type: 'WATCHING' });
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'render') {
        try {
            let commands = interaction.options.getString('commands');

            commands = commands.replace(/^```/g, '')
            commands = commands.replace(/```$/g, '')
            commands = commands.replace(/^`/g, '')
            commands = commands.replace(/`$/g, '')
            commands = commands.replaceAll('\\n', '\n')

            console.log(commands)

            await interaction.reply({
                files: [await katextual.renderPng(commands)],
            });
        } catch (e) {
            await interaction.reply(`\`\`\`${e.toString()}\`\`\``);
        }
    }
});

// Login to Discord with your client's token
client.login(token);
