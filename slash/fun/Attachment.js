module.exports = {
    name: "file",
    description: "File",
    options: [
        {
            name: "file",
            description: "the file",
            type: 11,
            required: true
        }
    ],
    run: async(interaction) => {
        const attacment = interaction.options.getAttachment('file');
        if (attacment.contentType !== 'image/png') {
            return interaction.reply({
                content: "File uploaded not an image.",
                ephemeral: true
            })
        }
        interaction.reply({
            content: `You uploaded **${attacment.contentType}** with name \`${attacment.name}\` and description **(${attacment.description || 'none'})**, image height: **${attacment.height}** and width: **${attacment.width}**\n${attacment.url}`
        })
    }
}