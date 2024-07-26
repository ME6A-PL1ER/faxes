const { SlashCommandBuilder } = require('@discordjs/builders');
const { authorizedUsers } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Send a message anonymously.')
        .addStringOption(option => 
            option.setName('message')
                .setDescription('The message to send')
                .setRequired(true)),
    async execute(interaction) {
        if (!authorizedUsers.includes(interaction.user.id)) {
            return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
        }

        const message = interaction.options.getString('message');
        await interaction.channel.send(message);
        await interaction.reply({ content: 'Message sent!', ephemeral: true });
    },
};
